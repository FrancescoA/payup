import firebase, { facebookAuthProvider, database } from '../constants/firebase'
import * as loadingState from '../actions/loadingState'

export const wrapPromise = (promise, successActionCreator, req, dispatch) => {
  dispatch(loadingState.addPendingRequest(req))
  return promise.then(
      data => dispatch(successActionCreator(data)),
      () => dispatch(loadingState.addFailedRequest(req))
    ).then(() => dispatch(loadingState.removePendingRequest(req)))
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

export const setUser = (user) => {
  return new Promise((resolve, reject) => {
    database.ref(`users/${user.uid}`).set({
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
