import {
  DELETE_FILE,
  UPLOAD_NEW_FILE,
  ADD_LISTING,
  UPDATE_LISTING,
  DELETE_LISTING,
  EDIT_LISTING,
  GET_LISTINGS,
  FACEBOOK_LOGIN,
} from './requests'

export const fieldDisplayMappings = {
  title: 'Title',
  filename: 'Filename',
  price: 'Price ($)',
  listingPageUrl: 'Your Link',
  amountToSell: 'Total',
  sold: 'Sold',
  live: 'Live',
}

export const fieldEditableMappings = {
  title: true,
  filename: false,
  price: true,
  listingPageUrl: false,
  amountToSell: true,
  sold: false,
  live: true,
}

export const errorTypeToMessage = {
  [DELETE_FILE]: {
    header: 'There was a problem deleting your file.',
    text: 'Sorry about that, please try again!',
  },
  [UPLOAD_NEW_FILE]: {
    header: 'There was a problem uploading your file.',
    text: 'Sorry about that! please try again soon.',
  },
  [ADD_LISTING]: {
    header: 'There was a problem adding your listing, sorry about that!',
    text: 'Please try again soon.',
  },
  [UPDATE_LISTING]: {
    header: 'There was a problem while updating your listing.',
    text: 'Sorry about that! Please try again soon.',
  },
  [DELETE_LISTING]: {
    header: 'There was a problem deleting your listing, sorry about that!',
    text: 'Please try again soon.',
  },
  [EDIT_LISTING]: {
    header: 'There was a problem while modifying your listing!',
    text: 'Please try again soon.',
  },
  [GET_LISTINGS]: {
    header: 'There was a problem fetching your listings! Sorry about that.',
    text: 'Please try again soon.',
  },
  [FACEBOOK_LOGIN]: {
    header: 'There was a problem logging in! Sorry about that.',
    text: 'Please try again soon.'
  },
}
