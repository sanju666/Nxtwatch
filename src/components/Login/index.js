import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import {Component} from 'react'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
    showPassword: false,
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 1,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    console.log(errorMsg)
    this.setState({showSubmitError: true, errorMsg})
  }

  showPassword = () => {
    const {showPassword} = this.state
    this.setState({
      showPassword: !showPassword,
    })
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    const {
      username,
      password,
      showSubmitError,
      errorMsg,
      showPassword,
    } = this.state
    return (
      <div className="Login-page-container">
        <form className="login-section" onSubmit={this.submitForm}>
          <div className="logo-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png"
              className="website logo"
            />
          </div>
          <div className="username-container">
            <label htmlFor="username">USERNAME</label>
            <input
              type="text"
              id="username"
              placeholder="Username"
              className="common-input"
              value={username}
              onChange={this.onChangeUsername}
            />
          </div>
          <div className="password-container">
            <label htmlFor="password">PASSWORD</label>
            {showPassword ? (
              <input
                type="text"
                id="password"
                placeholder="Password"
                className="common-input"
                value={password}
                onChange={this.onChangePassword}
              />
            ) : (
              <input
                type="password"
                id="password"
                placeholder="Password"
                className="common-input"
                value={password}
                onChange={this.onChangePassword}
              />
            )}
          </div>
          <div className="checkbox-container">
            <input type="checkbox" id="checkbox" onClick={this.showPassword} />
            <label htmlFor="checkbox">Show Password</label>
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
          {showSubmitError && <p className="error-message">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default Login
