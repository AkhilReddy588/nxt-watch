import styled from 'styled-components'

export const GamingCardContainer = styled.div`
  width: 220px;
  margin: 10px;
  @media screen and (max-width: 576px) {
    width: 150px;
  }
`
export const GameImg = styled.img`
  width: 100%;
`
export const GameTitle = styled.p`
  color: ${props => (props.darkTheme ? '#ffffff' : '#000000')};
  font-size: 16px;
  font-weight: 500;
  line-height: 10px;
`
export const GameViews = styled.p`
  color: ${props => (props.darkTheme ? '#94a3b8' : '#616e7c')};
  font-weight: 500;
  font-size: 15px;
  @media screen and (max-width: 576px) {
    font-size: 14px;
  }
`
