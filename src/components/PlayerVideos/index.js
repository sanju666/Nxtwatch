import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import {Component} from 'react'
import {AiOutlineLike, AiOutlineDislike} from 'react-icons/ai'
import {MdPlaylistAdd} from 'react-icons/md'

import Header from '../Header/index'
import Menu from '../Menu/index'
import SavedVideoContext from '../../Context/SavedVideoContext'
import './index.css'
import VideoPlayer from '../VideoPlayer/index'

import {
  HomeContainer,
  PlayerTitle,
  PlayerDescription,
} from '../../styledComponents/LightHeader/index'

class PlayerVideos extends Component {
  state = {
    videoDetail: {},
    p: '',
  }

  componentDidMount() {
    this.getSpecificVideo()
  }

  getSpecificVideo = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const {p} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/${id}`
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
      const updatedData = {
        id: videos.id,
        title: videos.title,
        videoUrl: videos.video_url,
        thumbNailUrl: videos.thumbnail_url,
        channel: videos.channel,
        viewCount: videos.view_count,
        publishedAt: videos.published_at,
        description: videos.description,
        liked: false,
        disliked: false,
      }
      this.setState({
        videoDetail: updatedData,
        p: updatedData.id,
      })
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    const {videoDetail, p} = this.state

    const {
      title,
      videoUrl,
      thumbNailUrl,
      channel,
      viewCount,
      description,
      liked,
      disliked,
    } = videoDetail
    const r = channel !== undefined
    return (
      <SavedVideoContext.Consumer>
        {value => {
          const {
            getsavedVideo,
            getLikeStatus,
            lightTheme,
            changeTheme,
            g,
            likeAndDislike,
          } = value
          let isLiked = false
          let isDisliked = false
          const text = g.includes(p)

          const result = likeAndDislike.find(each => each.id === p)
          if (result !== undefined) {
            isLiked = result.isLiked
            isDisliked = result.isDisliked
          }
          const getSave = () => {
            getsavedVideo(p)
          }

          const getLike = () => {
            const temp = {id: p, isLiked: !isLiked, isDisliked: false}
            getLikeStatus(temp)
          }

          const getDislike = () => {
            const temp = {id: p, isLiked: false, isDisliked: !isDisliked}
            getLikeStatus(temp)
          }

          return (
            <HomeContainer item={lightTheme} className="Home-container">
              <Header lightTheme={lightTheme} changeTheme={changeTheme} />
              <div className="home-first-section">
                <Menu lightTheme={lightTheme} />
                <div className="player-trending-right-section">
                  <div className="player-video-container">
                    <VideoPlayer videoUrl={videoUrl} />
                    <PlayerTitle item={lightTheme} className="video-title">
                      {title}
                    </PlayerTitle>
                    <div className="comment-section">
                      <p>{viewCount} views . 2years ago</p>
                      <ul className="likeAndDislike">
                        <li>
                          {isLiked === true ? (
                            <>
                              <AiOutlineLike className="common-like-dislike saved-para" />
                              <p
                                className="common-para saved-para"
                                onClick={getLike}
                              >
                                Like
                              </p>
                            </>
                          ) : (
                            <>
                              <AiOutlineLike className="common-like-dislike" />
                              <p className="common-para" onClick={getLike}>
                                Like
                              </p>
                            </>
                          )}
                        </li>
                        <li>
                          {isDisliked === true ? (
                            <>
                              <AiOutlineDislike className="common-like-dislike saved-para" />
                              <p
                                className="common-para saved-para"
                                onClick={getDislike}
                              >
                                Dislike
                              </p>
                            </>
                          ) : (
                            <>
                              <AiOutlineDislike className="common-like-dislike" />
                              <p className="common-para" onClick={getDislike}>
                                Dislike
                              </p>
                            </>
                          )}
                        </li>
                        <li>
                          {text === false ? (
                            <>
                              <MdPlaylistAdd
                                className="common-like-dislike"
                                onClick={getSave}
                              />
                              <p className="common-para" onClick={getSave}>
                                Save
                              </p>
                            </>
                          ) : (
                            <>
                              <MdPlaylistAdd
                                className="common-like-dislike saved-para"
                                onClick={getSave}
                              />
                              <p
                                className="common-para saved-para"
                                onClick={getSave}
                              >
                                Saved
                              </p>
                            </>
                          )}
                        </li>
                      </ul>
                    </div>
                    <hr className="line" />

                    {r === true && (
                      <div className="profile-container">
                        <img
                          src={channel.profile_image_url}
                          className="profile-image"
                        />
                        <div className="video-description">
                          <PlayerDescription
                            item={lightTheme}
                            className="video-desc-title"
                          >
                            {channel.name}
                          </PlayerDescription>
                          <p>{channel.subscriber_count} subscribers</p>

                          <PlayerDescription
                            item={lightTheme}
                            className="about-video"
                          >
                            {description}
                          </PlayerDescription>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </HomeContainer>
          )
        }}
      </SavedVideoContext.Consumer>
    )
  }
}

export default PlayerVideos
