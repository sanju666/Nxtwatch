import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import {Component} from 'react'
import {FaFire} from 'react-icons/fa'

import Header from '../Header/index'
import Menu from '../Menu/index'
import './index.css'
import TrendVideo from '../TrendVideo'
import SavedVideoContext from '../../Context/SavedVideoContext'
import {
  HomeContainer,
  TrendHeader,
  IconHeader,
} from '../../styledComponents/LightHeader/index'

class Trending extends Component {
  state = {
    trending: [],
    trend: true,
  }

  componentDidMount() {
    this.getTrendingData()
  }

  getTrendingData = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/trending`
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
        trending: updatedData,
      })
    }
  }

  getTrendingVideos = lightTheme => {
    const {trending} = this.state
    const result = trending.map(each => (
      <TrendVideo video={each} lightTheme={lightTheme} />
    ))
    return result
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    const {trend} = this.state
    return (
      <SavedVideoContext.Consumer>
        {value => {
          const {lightTheme, changeTheme} = value
          return (
            <HomeContainer className="Home-container" item={lightTheme}>
              <Header lightTheme={lightTheme} changeTheme={changeTheme} />
              <div className="home-first-section">
                <Menu trend={trend} lightTheme={lightTheme} />
                <div className="trending-right-section">
                  <TrendHeader className="trending-header" item={lightTheme}>
                    <div className="trending-section">
                      {lightTheme === true ? (
                        <FaFire className="trending-icon-header" />
                      ) : (
                        <FaFire className="trending-page-icon" />
                      )}
                      <IconHeader item={lightTheme}>Trending</IconHeader>
                    </div>
                  </TrendHeader>
                  <div>
                    <ul className="all-trend-videos">
                      {this.getTrendingVideos(lightTheme)}
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

export default Trending
