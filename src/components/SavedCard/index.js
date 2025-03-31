import {parse} from 'date-fns'
import {Link} from 'react-router-dom'
import {
  VideoCardContainer,
  Thumbnail,
  VideoContent,
  Title,
  ProfileImg,
  ChannelName,
  ViewsDetails,
  Views,
  Anology,
} from './styledComponents'

import ThemeContext from '../../context/ThemeContext'

function formatYearsAgo(date) {
  const diffInYears = new Date().getFullYear() - date.getFullYear()
  return `${diffInYears} ${diffInYears === 1 ? 'year' : 'years'} ago`
}

const SavedCard = props => {
  const {data} = props
  console.log(data)
  const {channel, publishedAt, thumbnailUrl, title, viewCount, id} = data
  const updatedChannel = {
    name: channel.name,
    profileImageUrl: channel.profile_image_url,
  }
  const {name, profileImageUrl} = updatedChannel

  const parsedPublishedAt = parse(publishedAt, 'MMM dd, yyyy', new Date())

  return (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme} = value

        return (
          <Link to={`/videos/${id}`} className="nav-link">
            <VideoCardContainer>
              <Thumbnail src={thumbnailUrl} alt="video thumbnail" />
              <VideoContent>
                <ProfileImg src={profileImageUrl} alt="channel profile" />
                <div>
                  <Title darkTheme={isDarkTheme}>{title}</Title>
                  <ViewsDetails>
                    <ChannelName darkTheme={isDarkTheme}>{name}</ChannelName>
                    <Anology>
                      <Views darkTheme={isDarkTheme}>{viewCount} views </Views>
                      <Views darkTheme={isDarkTheme}>
                        {formatYearsAgo(parsedPublishedAt)}
                      </Views>
                    </Anology>
                  </ViewsDetails>
                </div>
              </VideoContent>
            </VideoCardContainer>
          </Link>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default SavedCard
