import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {SiYoutubegaming} from 'react-icons/si'
import Header from '../Header'
import SideBar from '../SideBar'
import GamingCard from '../GamingCard'
import ThemeContext from '../../context/ThemeContext'
import {
  GameContainer,
  WrapContainer,
  GameContent,
  GameHeader,
  VideoSection,
  VideosContainer,
  NoVideos,
  NoVideosImg,
  NoVideosPara,
  NoVideosHeading,
  RetryBtn,
  FireSymbol,
  LoadingView,
  TrendFireHeading,
} from './styledComponents'

const apiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN PROGRESS',
  initial: 'INITIAL',
}

class Gaming extends Component {
  state = {
    gamesData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getVideos()
    const {changeTab} = this.context
    changeTab('GAMING')
  }

  getVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/gaming`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      this.setState({
        gamesData: data.videos,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderNoVideos = () => (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        return (
          <NoVideos>
            <NoVideosImg
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
              alt="no videos"
            />
            <NoVideosHeading darkTheme={isDarkTheme}>
              No Search results found
            </NoVideosHeading>
            <NoVideosPara>
              Try different key words or remove search filter
            </NoVideosPara>
            <RetryBtn onClick={this.getVideos}>Retry</RetryBtn>
          </NoVideos>
        )
      }}
    </ThemeContext.Consumer>
  )

  renderVideosData = () => {
    const {gamesData} = this.state
    if (gamesData.length === 0) {
      return this.renderNoVideos()
    }
    return (
      <VideosContainer>
        {gamesData.map(eachItem => (
          <GamingCard data={eachItem} key={eachItem.id} />
        ))}
      </VideosContainer>
    )
  }

  renderLoadingView = () => (
    <LoadingView data-testid="loader" className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </LoadingView>
  )

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
    const {apiStatus} = this.state
    let renderValue

    switch (apiStatus) {
      case apiStatusConstants.success:
        renderValue = this.renderVideosData()
        break
      case apiStatusConstants.inProgress:
        renderValue = this.renderLoadingView()
        break
      case apiStatusConstants.failure:
        renderValue = this.renderFailureView()
        break
      default:
        renderValue = null
    }

    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme} = value

          return (
            <GameContainer data-testid="gaming" darkTheme={isDarkTheme}>
              <Header />
              <WrapContainer>
                <SideBar />
                <GameContent>
                  <GameHeader>
                    <FireSymbol darkTheme={isDarkTheme}>
                      <SiYoutubegaming />
                    </FireSymbol>
                    <TrendFireHeading darkTheme={isDarkTheme}>
                      Gaming
                    </TrendFireHeading>
                  </GameHeader>
                  <VideoSection>{renderValue}</VideoSection>
                </GameContent>
              </WrapContainer>
            </GameContainer>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

Gaming.contextType = ThemeContext

export default Gaming
