import {Component} from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import SavedVideos from './components/SavedVideos'
import VideoItemDetails from './components/VideoItemDetails'
import ProtectedRoute from './components/ProtectedRoute'

import ThemeContext from './context/ThemeContext'

import './App.css'

const tabs = {
  home: 'HOME',
  trending: 'TRENDING',
  gaming: 'GAMING',
  savedVideos: 'SAVED VIDEOS',
  none: 'NONE',
}

class App extends Component {
  state = {isDarkTheme: false, activeTab: tabs.home, savedList: []}

  changeTheme = () => {
    this.setState(prevState => ({isDarkTheme: !prevState.isDarkTheme}))
  }

  changeTab = value => {
    this.setState({activeTab: value})
  }

  addToSavedList = obj => {
    this.setState(prevState => ({savedList: [...prevState.savedList, obj]}))
  }

  removeFromSavedList = id => {
    this.setState(prevState => ({
      savedList: prevState.savedList.filter(eachItem => eachItem.id !== id),
    }))
  }

  render() {
    const {isDarkTheme, activeTab, savedList} = this.state

    return (
      <BrowserRouter>
        <ThemeContext.Provider
          value={{
            isDarkTheme,
            activeTab,
            savedList,
            addToSavedList: this.addToSavedList,
            removeFromSavedList: this.removeFromSavedList,
            changeTab: this.changeTab,
            changeTheme: this.changeTheme,
          }}
        >
          <Switch>
            <Route exact path='/login' component={LoginForm} />
            <ProtectedRoute exact path='/' component={Home} />
            <ProtectedRoute exact path='/trending' component={Trending} />
            <ProtectedRoute exact path='/gaming' component={Gaming} />
            <ProtectedRoute
              exact
              path='/saved-videos'
              component={SavedVideos}
            />
            <ProtectedRoute
              exact
              path='/videos/:id'
              component={VideoItemDetails}
            />
          </Switch>
        </ThemeContext.Provider>
      </BrowserRouter>
    )
  }
}

export default App
