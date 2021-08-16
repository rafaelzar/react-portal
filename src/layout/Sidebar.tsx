import React from 'react';
import { logOutCognitoUserAuthAction } from '../store/actions/authActions';
import { useAppDispatch } from '../store/store';
import { NavLink, useHistory } from 'react-router-dom';
import { Nav, NavbarBrand, Navbar } from 'react-bootstrap';
import cross from '../lib/assets/img/cross.png';
import { swalError, swalSuccess } from '../lib/utils/toasts';

interface IProps {
  toggleSidebar: () => void;
  logo: {
    innerLink: string;
    imgSrc: string;
    imgAlt: string;
  };
}

const Sidebar: React.FC<IProps> = ({ toggleSidebar, logo }) => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const logout = async () => {
    dispatch(logOutCognitoUserAuthAction()).then((res: boolean) => {
      if (res) {
        history.push('/login');
        swalSuccess('You are logged out');
      } else {
        swalError('Something went wrong');
      }
    });
  };
  return (
    <Navbar className='navbar-content'>
      <div className='scrollbar-inner'>
        <div className='sidenav-header'>
          {logo ? (
            <NavbarBrand>
              <img
                alt={logo.imgAlt}
                className='navbar-brand-img'
                src={logo.imgSrc}
              />
            </NavbarBrand>
          ) : null}
          <i className='close-menu-btn' onClick={toggleSidebar}>
            <img width='16' src={cross} alt='close' />
          </i>
        </div>
        <div className='navbar-inner'>
          <Nav className='flex-column'>
            <Nav.Item>
              <NavLink
                exact
                to='/'
                className='nav-link'
                activeClassName='active-nav-link'
              >
                Home
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink
                className='nav-link'
                activeClassName='active-nav-link'
                to='/eyerate-reviews'
                // onClick={closeSidenav}
              >
                Eyerate Reviews
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink
                className='nav-link'
                activeClassName='active-nav-link'
                to='/other-reviews'
                // onClick={closeSidenav}
              >
                Other Reviews
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink
                className='nav-link'
                to='/payment'
                activeClassName='active-nav-link'
              >
                Payment
              </NavLink>
            </Nav.Item>
          </Nav>
        </div>
        <div className='navbar-bottom'>
          <Nav className='flex-column'>
            <Nav.Item>
              <NavLink
                className='nav-link'
                to='/settings'
                activeClassName='active-nav-link'
              >
                Settings
              </NavLink>
            </Nav.Item>
            <Nav.Item onClick={logout}>
              <div
                className='nav-link pointer'
              >
                Logout
              </div>
            </Nav.Item>
          </Nav>
        </div>
      </div>
    </Navbar>
  );
};

export default Sidebar;
