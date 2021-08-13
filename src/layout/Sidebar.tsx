import React from 'react';
// import { NavLink as NavLinkRRD } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { Nav, NavbarBrand, Navbar } from 'react-bootstrap';
import cross from '../lib/assets/img/cross.png';

interface IProps {
  toggleSidebar: () => void;
  logo: {
    innerLink: string;
    imgSrc: string;
    imgAlt: string;
  };
}

const Sidebar: React.FC<IProps> = ({ toggleSidebar, logo }) => {
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
          <i
            className='close-menu-btn'
            onClick={toggleSidebar}
          >
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
      </div>
    </Navbar>
  );
};

export default Sidebar;
