import {Link} from 'react-router-dom'

import {Component} from 'react'
import Cookies from 'js-cookie'

import './index.css'

import {IconHeader} from '../../styledComponents/LightHeader/index'

class SavedVideoItem extends Component {
  state = {
    savedVideos: {},
  }

  componentDidMount() {
    const {item} = this.props
    this.allSavedVideos(item)
  }

  allSavedVideos = async k => {
    console.log(k)

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/${k}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const videos = fetchedData.video_details
      console.log(videos)
      const updatedData = {
        id: videos.id,
        title: videos.title,
        videoUrl: videos.video_url,
        thumbNailUrl: videos.thumbnail_url,
        channel: videos.channel,
        viewCount: videos.view_count,
        publishedAt: videos.published_at,
        description: videos.description,
      }
      this.setState({
        savedVideos: updatedData,
      })
    }
  }

  render() {
    const {savedVideos} = this.state
    const {lightTheme} = this.props
    const {thumbNailUrl, viewCount, channel, title, id} = savedVideos
    return (
      <Link to={`video/${id}`} className="linked">
        <div className="saved-item">
          <img src={thumbNailUrl} className="saved-item-image" />
          <div className="saved-item-first-section">
            <IconHeader className="saved-item-title" item={lightTheme}>
              {title}
            </IconHeader>
            {channel !== undefined && (
              <p className="saved-item-name">{channel.name}</p>
            )}
            <p className="saved-item-name">{viewCount} . 2 years ago</p>
          </div>
        </div>
      </Link>
    )
  }
}

export default SavedVideoItem
