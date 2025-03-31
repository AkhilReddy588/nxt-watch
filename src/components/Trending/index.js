import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {HiFire} from 'react-icons/hi'
import Header from '../Header'
import SideBar from '../SideBar'
import TrendingCard from '../TrendingCard'
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
  LoadingView,
  TrendFireHeading,
} from './styledComponents'

const apiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN PROGRESS',
  initial: 'INITIAL',
}

class Trending extends Component {
  state = {
    videosData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getVideos()
    const {changeTab} = this.context
    changeTab('TRENDING')
  }

  getVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/trending`
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
        videosData: data.videos,
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
    const {videosData} = this.state
    if (videosData.length === 0) {
      return this.renderNoVideos()
    }
    return (
      <VideosContainer>
        {videosData.map(eachItem => (
          <TrendingCard data={eachItem} key={eachItem.id} />
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
                      Trending
                    </TrendFireHeading>
                  </TrendHeader>
                  <VideoSection>{renderValue}</VideoSection>
                </TrendContent>
              </WrapContainer>
            </TrendContainer>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

Trending.contextType = ThemeContext

export default Trending
