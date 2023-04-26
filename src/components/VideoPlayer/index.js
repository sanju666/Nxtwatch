import ReactPlayer from 'react-player'

import './index.css'

const VideoPlayer = props => {
  const {videoUrl} = props

  return (
    <ReactPlayer
      url={videoUrl}
      controls
      className="player"
      width={1000}
      height={500}
    />
  )
}

export default VideoPlayer
