import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import {Component} from 'react'
import {SiYoutubegaming} from 'react-icons/si'

import Header from '../Header/index'
import Menu from '../Menu/index'
import GameVideo from '../GameVideo/index'
import SavedVideoContext from '../../Context/SavedVideoContext'
import './index.css'

import {
  HomeContainer,
  TrendHeader,
  IconHeader,
} from '../../styledComponents/LightHeader/index'

class Gaming extends Component {
  state = {
    games: [],
    game: true,
  }

  componentDidMount() {
    this.getGamingData()
  }

  getGamingData = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/gaming`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const {videos} = fetchedData
      const updatedData = videos.map(each => ({
        id: each.id,
        title: each.title,
        thumbNailUrl: each.thumbnail_url,
        channel: each.channel,
        viewCount: each.view_count,
        publishedAt: each.published_at,
      }))
      this.setState({
        games: updatedData,
      })
    }
  }

  getGamingVideos = lightTheme => {
    const {games} = this.state
    const result = games.map(each => (
      <GameVideo video={each} lightTheme={lightTheme} />
    ))
    return result
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    const {game} = this.state
    return (
      <SavedVideoContext.Consumer>
        {value => {
          const {lightTheme, changeTheme} = value
          return (
            <HomeContainer className="Home-container" item={lightTheme}>
              <Header lightTheme={lightTheme} changeTheme={changeTheme} />
              <div className="home-first-section">
                <Menu game={game} lightTheme={lightTheme} />
                <div className="trending-right-section">
                  <TrendHeader className="trending-header" item={lightTheme}>
                    <div className="trending-section">
                      {lightTheme === true ? (
                        <SiYoutubegaming className="trending-icon-header" />
                      ) : (
                        <SiYoutubegaming className="trending-page-icon" />
                      )}
                      <IconHeader item={lightTheme}>Gaming</IconHeader>
                    </div>
                  </TrendHeader>
                  <div>
                    <ul className="all-games-videos">
                      {this.getGamingVideos(lightTheme)}
                    </ul>
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

export default Gaming
