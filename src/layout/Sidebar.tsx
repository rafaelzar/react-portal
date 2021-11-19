import React from 'react';
import { logOutCognitoUserAuthAction } from '../store/actions/authActions';
import { useAppDispatch } from '../store/store';
import { NavLink, useHistory } from 'react-router-dom';
import { Nav, NavbarBrand, Navbar } from 'react-bootstrap';
import cross from '../lib/assets/img/cross.png';
import dashboardIcon from '../lib/assets/icons/layout-outline.svg';
import logoutIcon from '../lib/assets/icons/log-out-outline.svg';
import reviewsIcon from '../lib/assets/icons/reviews-outline.svg';
import feedbackIcon from '../lib/assets/icons/feedback-outline.svg';
import settingsIcon from '../lib/assets/icons/settings-outline.svg';
import revenueIcon from '../lib/assets/icons/credit-card.svg';
import { swalSuccess } from '../lib/utils/toasts';

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
                className='navbar-brand-img w-75 mx-4'
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
                <img
                  className='mr-1'
                  width='20'
                  src={dashboardIcon}
                  alt='dashboard'
                />
                Dashboard
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink
                className='nav-link'
                activeClassName='active-nav-link'
                to='/reviews'
              >
                <img
                  className='mr-1'
                  width='20'
                  src={reviewsIcon}
                  alt='reviews'
                />
                Reviews
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink
                className='nav-link'
                activeClassName='active-nav-link'
                to='/feedback'
              >
                <img
                  className='mr-1'
                  width='20'
                  src={feedbackIcon}
                  alt='feedback'
                />
                Feedback
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink
                className='nav-link'
                to='/revenue'
                activeClassName='active-nav-link'
              >
                <img
                  className='mr-1'
                  width='20'
                  src={revenueIcon}
                  alt='revenue'
                />
                Revenue
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
                <img
                  className='mr-1'
                  width='20'
                  src={settingsIcon}
                  alt='settings'
                />
                Settings
              </NavLink>
            </Nav.Item>
            <Nav.Item onClick={logout}>
              <div className='nav-link pointer'>
                <img
                  className='mr-1'
                  width='20'
                  src={logoutIcon}
                  alt='logout'
                />
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
