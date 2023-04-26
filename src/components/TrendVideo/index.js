import './index.css'
import {IconHeader} from '../../styledComponents/LightHeader/index'

const TrendVideo = props => {
  const {video, lightTheme} = props
  const {thumbNailUrl, title, channel, viewCount, publishedAt} = video
  return (
    <li className="trend-item">
      <div className="trendVideo-container">
        <img src={thumbNailUrl} className="video-image" />
        <div className="trend-profile-details">
          <IconHeader className="trend-profile-title" item={lightTheme}>
            {title}
          </IconHeader>
          <p>{channel.name}</p>
          <p>{viewCount} Views . 5 years ago</p>
        </div>
      </div>
    </li>
  )
}

export default TrendVideo
