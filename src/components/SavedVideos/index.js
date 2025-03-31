import {Component} from 'react'
import {HiFire} from 'react-icons/hi'
import Header from '../Header'
import SideBar from '../SideBar'
import SavedCard from '../SavedCard'
import ThemeContext from '../../context/ThemeContext'
import {
  TrendContainer,
  WrapContainer,
  TrendContent,
  TrendHeader,
  VideoSection,
  VideosContainer,
  NoVideos,
  NoVideosImg,
  NoVideosPara,
  NoVideosHeading,
  RetryBtn,
  FireSymbol,
  TrendFireHeading,
} from './styledComponents'

class SavedVideos extends Component {
  componentDidMount() {
    const {changeTab} = this.context
    changeTab('SAVED VIDEOS')
  }

  renderNoVideos = () => (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        return (
          <NoVideos>
            <NoVideosImg
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
              alt="no saved videos"
            />
            <NoVideosHeading darkTheme={isDarkTheme}>
              No saved videos found
            </NoVideosHeading>
            <NoVideosPara>Save your videos by clicking a button</NoVideosPara>
            <RetryBtn onClick={this.getVideos}>Retry</RetryBtn>
          </NoVideos>
        )
      }}
    </ThemeContext.Consumer>
  )

  renderVideosData = savedList => {
    if (savedList.length === 0) {
      return this.renderNoVideos()
    }
    return (
      <VideosContainer>
        {savedList.map(eachItem => (
          <SavedCard data={eachItem} key={eachItem.id} />
        ))}
      </VideosContainer>
    )
  }

  renderFailureView = () => (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const imgValue = isDarkTheme
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'

        return (
          <NoVideos>
            <NoVideosImg src={imgValue} alt="no videos" />
            <NoVideosHeading darkTheme={isDarkTheme}>
              Oops! Something Went Wrong
            </NoVideosHeading>
            <NoVideosPara>
              We are having some trouble to complete your request. Please try
              again.
            </NoVideosPara>
            <RetryBtn onClick={this.getVideos}>Retry</RetryBtn>
          </NoVideos>
        )
      }}
    </ThemeContext.Consumer>
  )

  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme, savedList} = value

          return (
            <TrendContainer data-testid="home" darkTheme={isDarkTheme}>
              <Header />
              <WrapContainer>
                <SideBar />
                <TrendContent>
                  <TrendHeader>
                    <FireSymbol darkTheme={isDarkTheme}>
                      <HiFire />
                    </FireSymbol>
                    <TrendFireHeading darkTheme={isDarkTheme}>
                      Saved Videos
                    </TrendFireHeading>
                  </TrendHeader>
                  <VideoSection>
                    {this.renderVideosData(savedList)}
                  </VideoSection>
                </TrendContent>
              </WrapContainer>
            </TrendContainer>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

SavedVideos.contextType = ThemeContext

export default SavedVideos
