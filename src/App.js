import {Switch, Route} from 'react-router-dom'
import {Component} from 'react'

import './App.css'

import Login from './components/Login'
import Home from './components/Home'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import PlayerVideos from './components/PlayerVideos'
import SavedVideos from './components/SavedVideos'
import NotFound from './components/NotFound'

import savedVideoContext from './Context/SavedVideoContext'

// Replace your code here
class App extends Component {
  state = {
    g: [],
    lightTheme: false,
    likeAndDislike: [],
  }

  changeTheme = () => {
    const {lightTheme} = this.state
    this.setState({
      lightTheme: !lightTheme,
    })
  }

  getsavedVideo = id => {
    const {g} = this.state
    if (g.includes(id) === true) {
      const elementIndex = g.indexOf(id)
      console.log(elementIndex)
      const first = g.slice(0, elementIndex)
      const second = g.slice(elementIndex + 1, g.length)
      this.setState({
        g: [...first, ...second],
      })
    } else {
      this.setState({
        g: [...g, id],
      })
    }
  }

  getLikeStatus = temp => {
    const {likeAndDislike} = this.state
    const result = likeAndDislike.findIndex(each => each.id === temp.id)
    console.log(result)
    if (result !== -1) {
      const first = likeAndDislike.slice(0, result)
      const second = likeAndDislike.slice(result + 1, result.length)
      this.setState({
        likeAndDislike: [...first, ...second, temp],
      })
    } else {
      this.setState({
        likeAndDislike: [...likeAndDislike, temp],
      })
    }
  }

  render() {
    const {g, lightTheme, likeAndDislike} = this.state

    return (
      <savedVideoContext.Provider
        value={{
          g,
          getsavedVideo: this.getsavedVideo,
          lightTheme,
          changeTheme: this.changeTheme,
          getLikeStatus: this.getLikeStatus,
          likeAndDislike,
        }}
      >
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/trending" component={Trending} />
            <Route exact path="/games" component={Gaming} />
            <Route exact path="/video/:id" component={PlayerVideos} />
            <Route exact path="/saved-videos" component={SavedVideos} />
            <Route component={NotFound} />
          </Switch>
        </div>
        )
      </savedVideoContext.Provider>
    )
  }
}

export default App
