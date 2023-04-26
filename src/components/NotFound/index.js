import Header from '../Header/index'
import Menu from '../Menu/index'

import './index.css'

import SavedVideoContext from '../../Context/SavedVideoContext'

import {
  HomeContainer,
  PlayerTitle,
  PlayerDescription,
} from '../../styledComponents/LightHeader/index'

const NotFound = () => (
  <SavedVideoContext.Consumer>
    {value => {
      const {lightTheme, changeTheme} = value

      return (
        <HomeContainer item={lightTheme} className="Home-container">
          <Header lightTheme={lightTheme} changeTheme={changeTheme} />
          <div className="home-first-section">
            <Menu lightTheme={lightTheme} />
            <div className="home-right-section">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png"
                className="not-found-image"
              />
              <PlayerTitle item={lightTheme} className="Not-Found-title">
                Page Not Found
              </PlayerTitle>
              <PlayerDescription item={lightTheme} className="Not-Found-para">
                The page you are requested could not be found
              </PlayerDescription>
            </div>
          </div>
        </HomeContainer>
      )
    }}
  </SavedVideoContext.Consumer>
)

export default NotFound
