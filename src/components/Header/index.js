import {Link} from 'react-router-dom'
import {FaMoon} from 'react-icons/fa'
import {FiSun} from 'react-icons/fi'
import {GiHamburgerMenu} from 'react-icons/gi'
import {IoMdLogOut} from 'react-icons/io'
import Popup from 'reactjs-popup'
import Cookies from 'js-cookie'

import ThemeContext from '../../context/ThemeContext'
import {
  HeaderContainer,
  LogoImage,
  DesktopNav,
  ThemeButton,
  ProfileImg,
  LogoutBtn,
  LogoutSection,
  LogoutDescription,
  CancelButton,
  ConfirmBtn,
  MobileNav,
  MenuBtn,
  MobileLogout,
  MobileMenuBar,
  MenuItem,
} from './styledComponents'

const Header = props => {
  const onLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme, changeTheme} = value
        const logoUrl = isDarkTheme
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
        return (
          <HeaderContainer>
            <Link className="nav-link" to="/">
              <LogoImage src={logoUrl} alt="website logo" />
            </Link>
            <DesktopNav>
              <ThemeButton
                data-testid="theme"
                type="button"
                onClick={() => changeTheme()}
                darkTheme={isDarkTheme}
              >
                {isDarkTheme ? <FiSun /> : <FaMoon />}
              </ThemeButton>
              <ProfileImg
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                alt="profile"
              />
              <Popup
                modal
                trigger={
                  <LogoutBtn darkTheme={isDarkTheme} type="button">
                    Logout
                  </LogoutBtn>
                }
              >
                {close => (
                  <LogoutSection>
                    <div>
                      <LogoutDescription>
                        Are you sure, you want to logout?
                      </LogoutDescription>
                    </div>
                    <div>
                      <CancelButton type="button" onClick={() => close()}>
                        Cancel
                      </CancelButton>
                      <ConfirmBtn onClick={onLogout}>Confirm</ConfirmBtn>
                    </div>
                  </LogoutSection>
                )}
              </Popup>
            </DesktopNav>
            <MobileNav>
              <ThemeButton
                data-testid="theme"
                type="button"
                onClick={() => changeTheme()}
                darkTheme={isDarkTheme}
              >
                {isDarkTheme ? <FiSun /> : <FaMoon />}
              </ThemeButton>
              <Popup
                trigger={
                  <MenuBtn darkTheme={isDarkTheme} type="button">
                    <GiHamburgerMenu />
                  </MenuBtn>
                }
                position="bottom right"
              >
                <MobileMenuBar darkTheme={isDarkTheme}>
                  <Link className="nav-link" to="/">
                    <MenuItem darkTheme={isDarkTheme} type="button">
                      Home
                    </MenuItem>
                  </Link>
                  <Link className="nav-link" to="/trending">
                    <MenuItem darkTheme={isDarkTheme} type="button">
                      Trending
                    </MenuItem>
                  </Link>
                  <Link className="nav-link" to="/gaming">
                    <MenuItem darkTheme={isDarkTheme} type="button">
                      Gaming
                    </MenuItem>
                  </Link>
                  <Link className="nav-link" to="/saved-videos">
                    <MenuItem darkTheme={isDarkTheme} type="button">
                      Saved Videos
                    </MenuItem>
                  </Link>
                </MobileMenuBar>
              </Popup>
              <Popup
                modal
                trigger={
                  <MobileLogout darkTheme={isDarkTheme} type="button">
                    <IoMdLogOut />
                  </MobileLogout>
                }
              >
                {close => (
                  <LogoutSection>
                    <div>
                      <LogoutDescription>
                        Are you sure, you want to logout?
                      </LogoutDescription>
                    </div>
                    <div>
                      <CancelButton type="button" onClick={() => close()}>
                        Cancel
                      </CancelButton>
                      <ConfirmBtn onClick={onLogout}>Confirm</ConfirmBtn>
                    </div>
                  </LogoutSection>
                )}
              </Popup>
            </MobileNav>
          </HeaderContainer>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default Header
