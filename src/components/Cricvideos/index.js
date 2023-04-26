import {Link} from 'react-router-dom'

import './index.css'

import {CricVideoProfile} from '../../styledComponents/LightHeader/index'

const Cricvideos = props => {
  const {video, lightTheme} = props
  const {thumbNailUrl, title, channel, viewCount, publishedAt, id} = video
  return (
    <li className="video-item">
      <Link to={`video/${id}`} className="linked">
        <div className="video-container">
          <img src={thumbNailUrl} className="video-image" />
          <div className="profile-container">
            <img src={channel.profile_image_url} className="profile-image" />
            <div className="profile-details">
              <CricVideoProfile className="profile-title" item={lightTheme}>
                {title}
              </CricVideoProfile>
              <p>{channel.name}</p>
              <p>{viewCount} . 2 years ago</p>
            </div>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default Cricvideos
