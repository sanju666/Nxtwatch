import './index.css'

import {IconHeader} from '../../styledComponents/LightHeader/index'

const GameVideo = props => {
  const {video, lightTheme} = props
  const {thumbNailUrl, title, viewCount, id} = video
  return (
    <li className="game-item">
      <div className="game-video-container">
        <img src={thumbNailUrl} className="game-video-image" />
        <div className="game-container">
          <IconHeader item={lightTheme} className="game-title">
            {title}
          </IconHeader>
          <p>{viewCount} worldwide watching</p>
        </div>
      </div>
    </li>
  )
}

export default GameVideo
