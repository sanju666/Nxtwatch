import Popup from 'reactjs-popup'
import {Logoutbutton} from '../../styledComponents/LightHeader/index'

import 'reactjs-popup/dist/index.css'
import './index.css'

const ReactPopUp = props => {
  const {onClickLogout, lightTheme} = props
  const bglogout = lightTheme === true ? '#ffffff' : '#313131'
  const stylepopup = {
    width: 300,
    height: 150,
    backgroundColor: bglogout,
    borderColor: bglogout,
    borderRadius: '9px',
  }
  return (
    <div>
      <Popup
        width={20}
        modal
        contentStyle={stylepopup}
        trigger={
          lightTheme === false ? (
            <Logoutbutton type="button" lightTheme={lightTheme}>
              Logout
            </Logoutbutton>
          ) : (
            <button type="button" className="logout">
              Logout
            </button>
          )
        }
        position="bottom left"
      >
        {close => (
          <div className="popup-container">
            {lightTheme === true ? (
              <p className="logout-light-description">
                Are you sure you want to logout ?
              </p>
            ) : (
              <p className="logout-description">
                Are you sure you want to logout ?
              </p>
            )}
            <button
              type="button"
              className="trigger-button"
              onClick={() => close()}
            >
              Cancel
            </button>
            <button
              type="button"
              className="trigger-button poplogout"
              onClick={onClickLogout}
            >
              Logout
            </button>
          </div>
        )}
      </Popup>
    </div>
  )
}

export default ReactPopUp
