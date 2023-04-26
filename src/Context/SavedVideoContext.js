import React from 'react'

const SavedVideoContext = React.createContext({
  g: [],
  likeAndDislike: [],
  getsavedVideo: () => {},
  lightTheme: '',
  changeTheme: () => {},
  getLikeStatus: () => {},
})

export default SavedVideoContext
