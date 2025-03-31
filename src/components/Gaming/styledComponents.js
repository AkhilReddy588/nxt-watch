import styled from 'styled-components'

export const GameContainer = styled.div`
  background-color: ${props => (props.darkTheme ? '#181818' : '#f9f9f9')};
  min-height: 100vh;
`

export const WrapContainer = styled.div`
  display: flex;
`
export const GameContent = styled.div`
  background-color: '#f8fafc';
  height: 90vh;
  width: 100%;
  font-family: 'Roboto';
  overflow-y: auto;
`
export const GameHeader = styled.div`
  display: flex;
  align-items: center;
  padding-left: 25px;
`
export const TrendFireHeading = styled.h1`
  font-family: 'Roboto';
  font-size: 25px;
  color: ${props => (props.darkTheme ? '#ffffff' : '#1e293b')};
`

export const GetBtn = styled.button`
  background: transparent;
  border: 2px solid #231f20;
  padding: 5px;
  color: #231f20;
  font-weight: 500;
  margin-top: 30px;
  font-family: 'Roboto';
  font-size: 14px;
  cursor: pointer;
  @media screen and (max-width: 576px) {
    margin-top: 20px;
  }
`
export const VideoSection = styled.div`
  padding: 20px;
  @media screen and (max-width: 576px) {
    padding: 0px;
  }
`

export const VideosContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 20px;
  @media screen and (max-width: 576px) {
    justify-content: center;
  }
`
export const LoadingView = styled.div`
  height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
`
export const NoVideos = styled.div`
  height: 80vh;
  display: flex;
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
export const FireSymbol = styled.div`
  font-size: 30px;
  background-color: ${props => (props.darkTheme ? '#383838' : '#cbd5e1')};
  border-radius: 50px;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  color: #ff0b37;
  margin-right: 10px;
`
