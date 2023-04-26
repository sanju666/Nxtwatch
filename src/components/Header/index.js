import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FiSun} from 'react-icons/fi'
import {RiMoonFill} from 'react-icons/ri'

import {Component} from 'react'
import {Heading} from '../../styledComponents/LightHeader/index'
import ReactPopUp from '../ReactPopup/index'

import './index.css'

const Header = props => {
  const {lightTheme, changeTheme} = props
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  console.log(lightTheme)

  return (
    <Heading item={lightTheme}>
      <div className="header-logo-container">
        {lightTheme === true ? (
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            className="header-image-logo"
          />
        ) : (
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png"
            className="header-image-logo"
          />
        )}
      </div>
      <ul className="header-second-section">
        <li>
          {lightTheme === true ? (
            <RiMoonFill className="light-theme" onClick={changeTheme} />
          ) : (
            <FiSun className="theme" onClick={changeTheme} />
          )}
        </li>
        <li>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
            alt="profile"
            className="header-profile-image"
          />
        </li>
        <li>
          <ReactPopUp onClickLogout={onClickLogout} lightTheme={lightTheme} />
        </li>
      </ul>
    </Heading>
  )
}

export default withRouter(Header)
