import styled from 'styled-components'

export const VideoItemDetailsContainer = styled.div`
  background-color: ${props => (props.darkTheme ? '#181818' : '#ebebeb')};
  min-height: 100vh;
`
export const WrapContainer = styled.div`
  display: flex;
`
export const VideoItemDetailsContent = styled.div`
  height: 90vh;
  width: 100%;
  font-family: 'Roboto';
  overflow-y: auto;
  padding: 20px;
`
export const VideoPlayer = styled.div`
  width: 100%;
  background-size: cover;
`
export const Title = styled.p`
  color: ${props => [props.darkTheme ? '#ffffff' : '#1e293b']};
  font-weight: 500;
  font-size: 15px;
  line-height: 20px;
  margin-bottom: 0px;
`
export const PromotingSection = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  @media screen and (max-width: 576px) {
    flex-direction: column;
    justify-content: flex-start;
  }
`
export const ViewsSection = styled.div`
  display: flex;
  align-items: center;
`
export const LikesSection = styled.div`
  display: flex;
  align-items: center;
`

export const Views = styled.p`
  color: ${props => (props.darkTheme ? '#d7dfe9' : '#616e7c')};
  font-size: 14px;
  font-weight: 500;
`
export const DotSymbol = styled.p`
  color: ${props => (props.darkTheme ? '#d7dfe9' : '#616e7c')};
  font-size: 24px;
  font-weight: bold;
  margin-top: 30px;
`

export const LikeBtn = styled.button`
  color: ${props => (props.blueTheme ? '#2563eb' : '#64748b')};
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  background: transparent;
  border: none;
  cursor: pointer;
  @media screen and (max-width: 576px) {
    font-size: 16px;
  }
`
export const LikeBtnTxt = styled.p`
  margin-left: 5px;
`
export const Line = styled.hr`
  color: ${props => (props.darkTheme ? '#d7dfe9' : '#616e7c')};
  border-width: 1px;
`
export const ProfileImg = styled.img`
  width: 30px;
  height: 30px;
`

export const ChannelDetails = styled.div`
  display: flex;
  margin-top: 20px;
`
export const ChannelDetailsTxt = styled.div`
  margin-left: 10px;
`
export const ChannelName = styled.p`
  color: ${props => [props.darkTheme ? '#ffffff' : '#1e293b']};
  font-size: 14px;
  font-weight: 400;
  margin-top: 0px;
  @media screen and (min-width: 576px) {
    line-height: 10px;
    margin-bottom: 0px;
  }
`
export const Subscribers = styled.p`
  color: ${props => (props.darkTheme ? '#d7dfe9' : '#616e7c')};
  font-size: 12px;
  font-weight: 500;
`
export const NoVideos = styled.div`
  height: 80vh;
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
export const NoVideosImg = styled.img`
  width: 300px;
`
export const NoVideosHeading = styled.h1`
  font-size: 24px;
  color: ${props => (props.darkTheme ? '#ffffff' : '#1e293b')};
`
export const NoVideosPara = styled.p`
  color: #94a3b8;
  font-weight: 500;
  font-size: 14px;
  margin-top: 10px;
`
export const RetryBtn = styled.button`
  background-color: #4f46e5;
  padding: 10px;
  border: none;
  color: #ffffff;
  font-family: 'Roboto';
  font-weight: 500;
  cursor: pointer;
`
export const LoadingView = styled.div`
  height: 60vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`
