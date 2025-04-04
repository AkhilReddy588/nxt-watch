import {Component} from 'react'
import {IoMdClose} from 'react-icons/io'
import {IoSearch} from 'react-icons/io5'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import SideBar from '../SideBar'
import VideoCard from '../VideoCard'
import ThemeContext from '../../context/ThemeContext'
import {
  HomeContainer,
  WrapContainer,
  HomeContent,
  Banner,
  BannerTop,
  BannerLogo,
  BannerText,
  CloseBtn,
  SearchForm,
  GetBtn,
  VideoSection,
  SearchInput,
  SearchIcon,
  VideosContainer,
  NoVideos,
  NoVideosImg,
  NoVideosPara,
  NoVideosHeading,
  RetryBtn,
  LoadingView,
} from './styledComponents'

const apiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN PROGRESS',
  initial: 'INITIAL',
}

class Home extends Component {
  state = {
    showBanner: true,
    searchValue: '',
    finalSearchValue: '',
    videosData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getVideos()
    const {changeTab} = this.context
    changeTab('HOME')
  }

  closeBanner = () => this.setState({showBanner: false})

  changeSearchValue = event => this.setState({searchValue: event.target.value})

  onSearching = event => {
    event.preventDefault()
    const {searchValue} = this.state
    this.setState({finalSearchValue: searchValue}, this.getVideos)
  }

  getVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {finalSearchValue} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/all?search=${finalSearchValue}`
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
          <VideoCard data={eachItem} key={eachItem.id} />
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
    const {showBanner, searchValue, apiStatus} = this.state
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
            <HomeContainer data-testid="home" darkTheme={isDarkTheme}>
              <Header />
              <WrapContainer>
                <SideBar />
                <HomeContent>
                  {showBanner && (
                    <Banner data-testid="banner">
                      <BannerTop>
                        <BannerLogo
                          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                          alt="nxt watch logo"
                        />
                        <CloseBtn
                          data-testid="close"
                          type="button"
                          onClick={this.closeBanner}
                        >
                          <IoMdClose />
                        </CloseBtn>
                      </BannerTop>
                      <BannerText>
                        Buy Nxt Watch Premium prepaid plans with UPI
                      </BannerText>
                      <GetBtn>GET IT NOW</GetBtn>
                    </Banner>
                  )}
                  <VideoSection>
                    <SearchForm onSubmit={this.onSearching}>
                      <SearchInput
                        darkTheme={isDarkTheme}
                        value={searchValue}
                        onChange={this.changeSearchValue}
                        type="search"
                        placeholder="Search"
                      />
                      <SearchIcon data-testid="searchButton" type="submit">
                        <IoSearch />
                      </SearchIcon>
                    </SearchForm>
                    {renderValue}
                  </VideoSection>
                </HomeContent>
              </WrapContainer>
            </HomeContainer>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

Home.contextType = ThemeContext

export default Home
