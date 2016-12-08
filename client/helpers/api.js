import firebase, { facebookAuthProvider, database, storage } from '../constants/firebase'
import * as loadingState from '../actions/loadingState'

export const wrapPromise = (promise, successActionCreator, req, dispatch) => {
  dispatch(loadingState.addPendingRequest(req))
  return promise.then((data) => {
    dispatch(loadingState.removePendingRequest(req))
    return data
  })
  .then(
    (data) => {
      if (successActionCreator) dispatch(successActionCreator(data))
      return data
    },
    () => dispatch(loadingState.addFailedRequest(req))
  )
}

export const updateListing = (listing) => {
  return new Promise((resolve, reject) => {
    const { id, owner } = listing
    const updates = {}
    updates[`listings/${id}`] = listing
    updates[`users/${owner}/listings/${id}`] = listing
    database.ref().update(updates, (error) => {
      return error ? reject(error) : resolve(listing)
    })
  })
}

export const addListing = (listing) => {
  // Add id, assume owner exists
  const id = database.ref('listings').push().key
  return updateListing(Object.assign(listing, { id }))
}

export const editListing = (listing, field, value) => {
  return new Promise((resolve, reject) => {
    const { id, owner } = listing
    const updates = {}
    updates[`listings/${id}/${field}`] = value
    updates[`users/${owner}/listings/${id}/${field}`] = value
    database.ref().update(updates, (error) => {
      const payload = { id, field, value }
      return error ? reject(error) : resolve(payload)
    })
  })
}

export const deleteListing = (listing) => {
  return new Promise((resolve, reject) => {
    const { id, owner } = listing
    const updates = {}
    updates[`listings/${id}`] = null
    updates[`users/${owner}/listings/${id}`] = null
    database.ref().update(updates, (error) => {
      return error ? reject(error) : resolve(listing)
    })
  })
}

export const signInWithFacebook = () => {
  return firebase.auth().signInWithPopup(facebookAuthProvider)
}

export const getFileUrls = (userId) => {
  return database.ref(`users/${userId}/files`).once('value')
    .then(snapshot => snapshot.val() || {})
    .then((mapping) => {
      const parsedMapping = {}
      Object.keys(mapping).forEach((key) => {
        parsedMapping[key] = mapping[key].url
      })
      return parsedMapping
    })
}

export const updateUser = (user) => {
  return new Promise((resolve, reject) => {
    database.ref(`users/${user.uid}`).update({
      // save only some user info
      displayName: user.displayName,
      email: user.email,
      uid: user.uid,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    }, (error) => {
      return error ? reject(error) : resolve(user)
    })
  })
}

export const logOut = () => {
  return firebase.auth().signOut()
}

export const getListings = (userId) => {
  return database.ref(`users/${userId}/listings`).once('value').then(snapshot => Object.values(snapshot.val() || {}))
}

export const deleteFile = (userId, fileId, filename) => {
  const userFileRef = database.ref(`users/${userId}/files/${fileId}`)
  const fileRef = storage.ref(`listingFiles/${userId}/${fileId}/${filename}`)
  return Promise.all([userFileRef.remove(), fileRef.delete()])
}

export const deleteFileOfListing = (listing) => {
  const { owner, fileId, filename } = listing
  return deleteFile(owner, fileId, filename)
}

export const deleteListingAndFile = (listing) => {
  return Promise.all([deleteListing(listing), deleteFileOfListing(listing)])
    .then(() => listing)
}

export const uploadNewFile = (userId, file) => {
  const userFileRef = database.ref(`users/${userId}/files`).push()
  const fileId = userFileRef.key
  // We want to allow duplicate files
  const ref = storage.ref(`listingFiles/${userId}/${fileId}/${file.name}`)
  return ref.put(file).then(snapshot => snapshot.downloadURL)
    .then((url) => {
      return Promise.all([Promise.resolve(url), userFileRef.update({ url })])
    }).then((values) => {
      return {
        fileId,
        fileUrl: values[0],
      }
    })
}
