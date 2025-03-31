import styled from 'styled-components'

export const VideoCardContainer = styled.div`
  width: 270px;
  margin: 10px;
  cursor: pointer;
  display: flex;
  width: 100%;
  @media screen and (max-width: 576px) {
    flex-direction: column;
    margin: 0px;
    margin-top: 10px;
  }
`
export const Thumbnail = styled.img`
  width: 300px;
  @media screen and (max-width: 576px) {
    width: 100%;
  }
`
export const VideoContent = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 10px;
  margin-left: 10px;
  @media screen and (max-width: 576px) {
    padding-left: 10px;
    padding-right: 10px;
    margin-left: 0px;
  }
`

export const ProfileImg = styled.img`
  width: 30px;
  height: 30px;
  @media screen and (min-width: 576px) {
    display: none;
  }
`

export const Title = styled.p`
  font-weight: 500;
  font-size: 15px;
  margin-left: 10px;
  margin-top: 0px;
  color: ${props => (props.darkTheme ? '#ffffff' : '#000000')};
  @media screen and (max-width: 576px) {
    font-size: 15px;
    margin-bottom: 0px;
  }
`
export const ChannelName = styled.p`
  color: ${props => (props.darkTheme ? '#d7dfe9' : '#616e7c')};
  margin-left: 10px;
  font-size: 15px;
  font-weight: 400;
  @media screen and (min-width: 576px) {
    line-height: 10px;
    margin-top: 0px;
    margin-bottom: 0px;
  }
`
export const ViewsDetails = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 576px) {
    align-items: center;
    flex-direction: row;
  }
`

export const Views = styled.p`
  color: ${props => (props.darkTheme ? '#d7dfe9' : '#616e7c')};
  font-size: 14px;
  font-weight: 500;
  margin-right: 10px;
`
export const Anology = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
  @media screen and (min-width: 576px) {
    margin-top: 0px;
  }
`
