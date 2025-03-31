import React from 'react'

const ThemeContext = React.createContext({
  isDarkTheme: false,
  changeTheme: () => {},
  activeTab: 'HOME',
  changeTab: () => {},
  savedList: [],
  addToSavedList: () => {},
  removeFromSavedList: () => {},
})

export default ThemeContext
