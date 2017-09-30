import _ from 'lodash';
import React, { Component } from 'react';
import { Container, Dropdown, Image,  Menu, Visibility,} from 'semantic-ui-react';
import './navbar.css';

const menuStyle = {
  border: 'none',
  borderRadius: 0,
  boxShadow: 'none',
  paddingBottom: '1em',
  paddingTop: '2em',
  transition: 'box-shadow 0.5s ease, padding 0.5s ease',
}

const fixedMenuStyle = {
  backgroundColor: '#fff',
  border: '1px solid #ddd',
  boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
  paddingBottom: '1em',
  paddingTop: '1em',
}


export default class navBar extends Component {
  state = {
    menuFixed: false,
    overlayFixed: false,
    activeItem: this.props.currentPage
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  handleOverlayRef = (c) => {
    const { overlayRect } = this.state

    if (!overlayRect) this.setState({ overlayRect: _.pick(c.getBoundingClientRect(), 'height', 'width') })
  }

  stickOverlay = () => this.setState({ overlayFixed: true })

  stickTopMenu = () => this.setState({ menuFixed: true })

  unStickOverlay = () => this.setState({ overlayFixed: false })

  unStickTopMenu = () => this.setState({ menuFixed: false })

  handleLogout = () => window.location = '/auth/logout'

  render (props) {
    const { menuFixed } = this.state
    const { activeItem } = this.state

    return (
      <div>
        <Visibility
          onBottomPassed={this.stickTopMenu}
          onBottomVisible={this.unStickTopMenu}
          once={false}
        >
          <Menu
            pointing secondary
            fixed={menuFixed && 'top'}
            style={menuFixed ? fixedMenuStyle : menuStyle}
          >
            <Container>
              {/*<Menu.Item>
                <Image size='mini' src='/components/assets/images/dev.svg' />
              </Menu.Item>*/}
              <Menu.Item name='DEVCIRCLE' href='/' onClick={this.handleItemClick} className='navFont'/>
              <Menu.Menu position='right' className='navFont'>
                <Menu.Item name='CREATE A PROJECT' href={`/${this.props.cohort}/create`} active={activeItem === 'create'} onClick={this.handleItemClick} className='navCreate'/>
                <Menu.Item name='Explore' href={`/${this.props.cohort}/explore`} active={activeItem === 'explore'} onClick={this.handleItemClick} className='navFont' />
                <Menu.Item name='Dashboard' href={`/${this.props.cohort}/${this.props.username}/dashboard`} active={activeItem === 'dashboard'} onClick={this.handleItemClick} className='navFont'/>
                {/* <Menu.Item>
                  <Button color='teal' href='/create' >CREATE PROJECT</Button>
                </Menu.Item> */}
                <Image as='img' src={this.props.avatar} alt={`Logged in as ${this.props.username}`} className='navbarAvatar' inline shape='circular'/>
                <Dropdown simple className='navIcon'>
                  <Dropdown.Menu className='navItem'>
                    <Dropdown.Item className='navFont' onClick={this.handleLogout}>Log Out</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Menu.Menu>
            </Container>
          </Menu>
        </Visibility>
      </div>
    )
  }
}
