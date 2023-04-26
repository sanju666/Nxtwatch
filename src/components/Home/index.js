import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import {Component} from 'react'

import {GrFormClose} from 'react-icons/gr'
import {IoMdSearch} from 'react-icons/io'

import Header from '../Header/index'
import Menu from '../Menu/index'
import SavedVideoContext from '../../Context/SavedVideoContext'
import './index.css'
import Cricvideos from '../Cricvideos/index'

import {HomeContainer} from '../../styledComponents/LightHeader/index'

class Home extends Component {
  state = {
    videos: [],
    showBanner: true,
    home: true,
    searchInput: '',
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {searchInput} = this.state
    console.log(searchInput)
    const apiUrl = `https://apis.ccbp.in/videos/all?search=${searchInput}`
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
        videos: updatedData,
      })
    }
  }

  getAllVidoes = lightTheme => {
    const {videos} = this.state
    console.log(videos)
    const result = videos.map(each => (
      <Cricvideos video={each} lightTheme={lightTheme} />
    ))
    return result
  }

  closeBanner = () => {
    this.setState({
      showBanner: false,
    })
  }

  changeSearch = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    const {showBanner, home} = this.state
    return (
      <SavedVideoContext.Consumer>
        {value => {
          const {lightTheme, changeTheme} = value
          return (
            <HomeContainer className="Home-container" item={lightTheme}>
              <Header lightTheme={lightTheme} changeTheme={changeTheme} />
              <div className="home-first-section">
                <Menu home={home} lightTheme={lightTheme} />
                <div className="home-right-section">
                  {showBanner === true && (
                    <div className="home-right-banner">
                      <div className="home-banner-image-icon">
                        <img
                          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                          className="home-banner-nxtwatch"
                        />
                        <GrFormClose
                          className="home-banner-close"
                          onClick={this.closeBanner}
                        />
                      </div>
                      <p>Buy Nxt Watch Premium prepaid plans with UPI</p>
                      <button type="button">GET IT NOW</button>
                    </div>
                  )}
                  <div className="home-video-container">
                    <div>
                      <input
                        type="search"
                        className="search"
                        placeholder="Search"
                        onChange={this.changeSearch}
                      />
                      <IoMdSearch
                        className="search-icon"
                        onClick={this.getData}
                      />
                    </div>
                    <ul className="all-video-container">
                      {this.getAllVidoes(lightTheme)}
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

export default Home
