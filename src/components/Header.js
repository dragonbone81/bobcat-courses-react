import React, {Component} from 'react'
import {NavLink as RNavLink, Link as RLink} from 'react-router-dom'
import logo from '../favicon.png'
import faCog from '@fortawesome/fontawesome-free-solid/faCog'
import faSingOutAlt from '@fortawesome/fontawesome-free-solid/faSignOutAlt'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import {
    Navbar,
    Nav,
    NavItem,
    NavLink,
    NavbarBrand,
    NavbarToggler,
    Collapse,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Button
} from 'reactstrap'

class Header extends Component {
    state = {
        isOpen: false
    };

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };

    render() {
        const profileImage = this.props.user.profile_image_url ?
            <img alt="Profile" className='profile-image' src={this.props.user.profile_image_url}/> :
            "";
        return (
            <div>
                <Navbar color="dark" dark expand="md">
                    <NavbarBrand href="/"><img alt="logo" width={45} style={{paddingRight: '15px'}}
                                               src={logo}/>BobcatCourses</NavbarBrand>
                    <NavbarToggler onClick={this.toggle}/>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem>
                                <NavLink activeClassName='active' tag={RNavLink} to="/plan-schedules">Plan
                                    Schedules</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink activeClassName='active' tag={RNavLink} to="/saved-schedules">Saved
                                    Schedules</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink activeClassName='active' tag={RNavLink} to="/waitlist">Waitlist</NavLink>
                            </NavItem>
                        </Nav>
                        {
                            Object.keys(this.props.user).length > 0 ?
                                <Nav className="ml-auto" navbar>
                                    <NavItem>
                                        <NavLink activeClassName='active' tag={RNavLink}
                                                 to="/profile">
                                            Welcome {this.props.user.first_name} {profileImage}
                                        </NavLink>
                                    </NavItem>
                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle nav>
                                            <FontAwesomeIcon icon={faCog} className='cog'/>
                                        </DropdownToggle>
                                        <DropdownMenu right>
                                            <DropdownItem tag={RLink}
                                                          to="/profile">
                                                Profile
                                            </DropdownItem>
                                            <DropdownItem tag={RLink}
                                                          to="/about">
                                                About Us
                                            </DropdownItem>
                                            <DropdownItem onClick={this.props.logOut}>
                                                <div className="logout-div-text">Logout <FontAwesomeIcon
                                                    icon={faSingOutAlt} className='sign-out'/>
                                                </div>
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </Nav>
                                :
                                <Button color="success" className="btn-outline-success" tag={RLink}
                                        to="/login">Login</Button>
                        }
                    </Collapse>
                </Navbar>
            </div>
        )
    }
}

export default Header