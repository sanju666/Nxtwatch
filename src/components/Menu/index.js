import {AiFillHome} from 'react-icons/ai'
import {FaFire} from 'react-icons/fa'
import {MdPlaylistAdd} from 'react-icons/md'
import {SiYoutubegaming} from 'react-icons/si'
import {Link} from 'react-router-dom'
import {
  Menupara,
  MenuLeftSection,
  ContactHeading,
  ContactPara,
} from '../../styledComponents/LightHeader/index'

import './index.css'

const Menu = props => {
  const {trend, home, game, save, lightTheme} = props

  return (
    <MenuLeftSection item={lightTheme} className="home-left-section">
      <ul className="home-menu-section">
        <Link to="/" className="menu-item">
          {home === true ? (
            <li>
              <AiFillHome className="home-icon" />
              <Menupara item={lightTheme}>Home</Menupara>
            </li>
          ) : (
            <li>
              <AiFillHome className="common-icon" />
              <Menupara item={lightTheme}>Home</Menupara>
            </li>
          )}
        </Link>
        <Link to="/trending" className="menu-item">
          {trend === true ? (
            <li>
              <FaFire className=" home-icon" />
              <Menupara item={lightTheme}>Trending</Menupara>
            </li>
          ) : (
            <li>
              <FaFire className="common-icon trending-icon" />
              <Menupara item={lightTheme}>Trending</Menupara>
            </li>
          )}
        </Link>
        <Link to="/games" className="menu-item">
          {game === true ? (
            <li>
              <SiYoutubegaming className="home-icon " />
              <Menupara item={lightTheme}>Gaming</Menupara>
            </li>
          ) : (
            <li>
              <SiYoutubegaming className=" common-icon " />
              <Menupara item={lightTheme}>Gaming</Menupara>
            </li>
          )}
        </Link>
        <Link to="/saved-videos" className="menu-item">
          {save === true ? (
            <li>
              <MdPlaylistAdd className=" home-icon " />
              <Menupara item={lightTheme}>Saved</Menupara>
            </li>
          ) : (
            <li>
              <MdPlaylistAdd className=" common-icon " />
              <Menupara item={lightTheme}>Saved</Menupara>
            </li>
          )}
        </Link>
      </ul>
      <div className="home-contact-section">
        <ContactHeading item={lightTheme} className="home-contact-us">
          Contact us
        </ContactHeading>
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
            className="social-media-icons"
            alt="facebook logo"
          />
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
            alt="twitter logo"
            className="social-media-icons"
          />
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
            alt="linked in logo"
            className="social-media-icons"
          />
        </div>
        <ContactPara item={lightTheme}>
          Enjoy! Now to see your channels and recommendations
        </ContactPara>
      </div>
    </MenuLeftSection>
  )
}

export default Menu
