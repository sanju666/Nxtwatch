import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import {Component} from 'react'
import {MdPlaylistAdd} from 'react-icons/md'

import SavedVideoContext from '../../Context/SavedVideoContext'
import './index.css'

import Header from '../Header/index'
import Menu from '../Menu/index'
import SavedVideoItem from '../SavedVideoItem/index'
import {
  HomeContainer,
  TrendHeader,
  IconHeader,
} from '../../styledComponents/LightHeader/index'

class SavedVideos extends Component {
  state = {
    save: true,
    savedVideos: {},
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    const {save, savedVideos} = this.state
    return (
      <SavedVideoContext.Consumer>
        {value => {
          const {g, getsavedVideo, lightTheme, changeTheme} = value
          return (
            <HomeContainer className="saved-home-container" item={lightTheme}>
              <Header lightTheme={lightTheme} changeTheme={changeTheme} />
              <div className="home-first-section">
                <Menu save={save} lightTheme={lightTheme} />
                <div className="trending-right-section">
                  <TrendHeader className="trending-header" item={lightTheme}>
                    <div className="trending-section">
                      {lightTheme === true ? (
                        <MdPlaylistAdd className="trending-icon-header" />
                      ) : (
                        <MdPlaylistAdd className="trending-page-icon" />
                      )}
                      <IconHeader item={lightTheme}>Saved Videos</IconHeader>
                    </div>
                  </TrendHeader>
                  <>
                    {g !== undefined &&
                      g.map(videoId => (
                        <SavedVideoItem
                          item={videoId}
                          lightTheme={lightTheme}
                        />
                      ))}
                  </>
                </div>
              </div>
            </HomeContainer>
          )
        }}
      </SavedVideoContext.Consumer>
    )
  }
}

export default SavedVideos
