import {Component} from 'react'
import {parse} from 'date-fns'
import {BsDot} from 'react-icons/bs'
import {BiLike, BiDislike} from 'react-icons/bi'
import {CgPlayListAdd} from 'react-icons/cg'
import Loader from 'react-loader-spinner'
import ReactPlayer from 'react-player'
import Cookies from 'js-cookie'
import Header from '../Header'
import SideBar from '../SideBar'
import ThemeContext from '../../context/ThemeContext'

import {
  VideoItemDetailsContainer,
  WrapContainer,
  VideoItemDetailsContent,
  VideoPlayer,
  Title,
  PromotingSection,
  ViewsSection,
  Views,
  DotSymbol,
  LikeBtn,
  LikeBtnTxt,
  Line,
  ChannelDetails,
  ProfileImg,
  ChannelDetailsTxt,
  ChannelName,
  Subscribers,
  LikesSection,
  NoVideos,
  NoVideosImg,
  NoVideosHeading,
  NoVideosPara,
  RetryBtn,
  LoadingView,
} from './styledComponents'

function formatYearsAgo(date) {
  const diffInYears = new Date().getFullYear() - date.getFullYear()
  return `${diffInYears} ${diffInYears === 1 ? 'year' : 'years'} ago`
}

const apiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN PROGRESS',
  initial: 'INITIAL',
}

class VideoItemDetails extends Component {
  state = {
    videoItemDetails: {},
    like: false,
    disLike: false,
    isSaved: false,
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getVideoItemDetails()
    const {changeTab} = this.context
    changeTab('NONE')
  }

  getVideoItemDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const url = `https://apis.ccbp.in/videos/${id}`
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = {videoDetails: data.video_details}
      const {videoDetails} = updatedData
      const updatedVideoDetails = {
        channel: videoDetails.channel,
        id: videoDetails.id,
        description: videoDetails.description,
        publishedAt: videoDetails.published_at,
        thumbnailUrl: videoDetails.thumbnail_url,
        title: videoDetails.title,
        videoUrl: videoDetails.video_url,
        viewCount: videoDetails.view_count,
      }
      this.setState({
        videoItemDetails: updatedVideoDetails,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickLike = () => {
    this.setState({like: true, disLike: false})
  }

  onClickDisLike = () => {
    this.setState({like: false, disLike: true})
  }

  onSave = () => {
    this.setState(
      prevState => ({isSaved: !prevState.isSaved}),
      () => {
        const {isSaved, videoItemDetails} = this.state
        const {addToSavedList, removeFromSavedList} = this.context
        if (isSaved) {
          addToSavedList(videoItemDetails)
        } else {
          removeFromSavedList(videoItemDetails.id)
        }
      },
    )
  }

  renderFailureView = () => (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const imgValue = isDarkTheme
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'

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
            <RetryBtn onClick={this.getVideoItemDetails}>Retry</RetryBtn>
          </NoVideos>
        )
      }}
    </ThemeContext.Consumer>
  )

  renderLoadingView = () => (
    <LoadingView data-testid="loader" className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </LoadingView>
  )

  renderData = () => {
    const {videoItemDetails, like, disLike, isSaved} = this.state
    const {
      videoUrl,
      title,
      viewCount,
      publishedAt,
      description,
      channel = {},
    } = videoItemDetails
    const parsedPublishedAt = parse(publishedAt, 'MMM dd, yyyy', new Date())
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme} = value

          return (
            <VideoItemDetailsContent>
              <VideoPlayer>
                <ReactPlayer width="100%" url={videoUrl} />
              </VideoPlayer>
              <Title darkTheme={isDarkTheme}>{title}</Title>
              <PromotingSection>
                <ViewsSection>
                  <Views darkTheme={isDarkTheme}>{viewCount} views</Views>
                  <DotSymbol darkTheme={isDarkTheme}>
                    <BsDot />
                  </DotSymbol>
                  <Views darkTheme={isDarkTheme}>
                    {formatYearsAgo(parsedPublishedAt)}
                  </Views>
                </ViewsSection>
                <LikesSection>
                  <LikeBtn
                    blueTheme={like}
                    onClick={this.onClickLike}
                    darkTheme={isDarkTheme}
                    type="button"
                  >
                    <BiLike />
                    <LikeBtnTxt>Like</LikeBtnTxt>
                  </LikeBtn>
                  <LikeBtn
                    blueTheme={disLike}
                    onClick={this.onClickDisLike}
                    darkTheme={isDarkTheme}
                    type="button"
                  >
                    <BiDislike />
                    <LikeBtnTxt>Dislike</LikeBtnTxt>
                  </LikeBtn>
                  <LikeBtn
                    onClick={this.onSave}
                    darkTheme={isDarkTheme}
                    type="button"
                    blueTheme={isSaved}
                  >
                    <CgPlayListAdd />
                    <LikeBtnTxt>{isSaved ? 'Saved' : 'Save'}</LikeBtnTxt>
                  </LikeBtn>
                </LikesSection>
              </PromotingSection>
              <Line darkTheme={isDarkTheme} />
              <ChannelDetails>
                <ProfileImg
                  alt="channel logo"
                  src={channel.profile_image_url}
                />
                <ChannelDetailsTxt>
                  <ChannelName darkTheme={isDarkTheme}>
                    {channel.name}
                  </ChannelName>
                  <Subscribers darkTheme={isDarkTheme}>
                    {channel.subscriber_count} Subscribers
                  </Subscribers>
                  <Title darkTheme={isDarkTheme}>{description}</Title>
                </ChannelDetailsTxt>
              </ChannelDetails>
            </VideoItemDetailsContent>
          )
        }}
      </ThemeContext.Consumer>
    )
  }

  render() {
    const {apiStatus} = this.state
    let renderValue

    switch (apiStatus) {
      case apiStatusConstants.success:
        renderValue = this.renderData()
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
            <VideoItemDetailsContainer darkTheme={isDarkTheme}>
              <Header />
              <WrapContainer>
                <SideBar />
                {renderValue}
              </WrapContainer>
            </VideoItemDetailsContainer>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

VideoItemDetails.contextType = ThemeContext

export default VideoItemDetails
