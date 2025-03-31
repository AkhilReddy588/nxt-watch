import {Link} from 'react-router-dom'
import {
  GamingCardContainer,
  GameImg,
  GameTitle,
  GameViews,
} from './styledComponents'

import ThemeContext from '../../context/ThemeContext'

const GamingCard = props => {
  const {data} = props
  const updatedData = {
    id: data.id,
    title: data.title,
    thumbnailUrl: data.thumbnail_url,
    viewCount: data.view_count,
  }

  const {id, title, thumbnailUrl, viewCount} = updatedData

  return (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        return (
          <Link to={`/videos/${id}`} className="nav-link">
            <GamingCardContainer>
              <GameImg src={thumbnailUrl} alt="video thumbnail" />
              <GameTitle darkTheme={isDarkTheme}>{title}</GameTitle>
              <GameViews darkTheme={isDarkTheme}>
                {viewCount} Watching Worldwide
              </GameViews>
            </GamingCardContainer>
          </Link>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default GamingCard
