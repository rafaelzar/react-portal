/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import { NavLink as NavLinkRRD } from 'react-router-dom';
// import {
//   Collapse, NavbarBrand, Navbar, NavItem, NavLink, Nav,
// } from 'react-bootstrap';
import {
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
} from 'react-bootstrap';

interface IProps {
  toggleSidenav: () => void;
  logo: {
    innerLink: string;
    imgSrc: string;
    imgAlt: string;
  };
}

const Sidebar: React.FC<IProps> = ({ toggleSidenav, logo }) => {
  useEffect(() => {
    if (window.innerWidth > 1200) {
      document.body.classList.add('g-sidenav-pinned');
    }
  }, []);

  const onMouseEnterSidenav = () => {
    if (!document.body.classList.contains('g-sidenav-pinned')) {
      document.body.classList.add('g-sidenav-show');
    }
  };
  const onMouseLeaveSidenav = () => {
    if (!document.body.classList.contains('g-sidenav-pinned')) {
      document.body.classList.remove('g-sidenav-show');
    }
  };
  const closeSidenav = () => {
    if (window.innerWidth < 1200) {
      () => toggleSidenav;
    }
  };
  return (
    <Navbar
      className='sidenav navbar-vertical navbar-expand-xs navbar-light bg-white fixed-left'
      onMouseEnter={onMouseEnterSidenav}
      onMouseLeave={onMouseLeaveSidenav}
    >
      <div className='scrollbar-inner'>
        <div className='sidenav-header d-flex align-items-center'>
          {logo ? (
            <NavbarBrand href='/' className='mr-auto '>
              <img
                alt={logo.imgAlt}
                className='navbar-brand-img'
                src={logo.imgSrc}
              />
              <span className='ml-2'>Eyerate</span>
            </NavbarBrand>
          ) : null}
          <i
            className='ni ni-fat-remove close-menu-btn'
            onClick={toggleSidenav}
          />
        </div>
        <div className='navbar-inner'>
          {/* <Collapse navbar isOpen>
            <Nav navbar>
              <NavItem>
                <NavLink
                  to='/'
                  activeClassName='text-primary'
                  onClick={closeSidenav}
                  tag={NavLinkRRD}
                >
                  <i className='ni ni-shop text-primary' />
                  <span className='sidenav-normal'>Home</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  to='/posts'
                  activeClassName='text-primary'
                  onClick={closeSidenav}
                  tag={NavLinkRRD}
                >
                  <i className='ni ni-album-2 text-primary' />
                  <span className='sidenav-normal'>TEST</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  to='/users'
                  activeClassName='text-primary'
                  onClick={closeSidenav}
                  tag={NavLinkRRD}
                >
                  <i className='ni ni-single-02 text-primary' />
                  <span className='sidenav-normal'>TEST 2</span>
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse> */}
        </div>
      </div>
    </Navbar>
  );
};

export default Sidebar;
