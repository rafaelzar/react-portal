import React, { useEffect } from 'react';
// import { NavLink as NavLinkRRD } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
  Nav, NavbarBrand, Navbar, Collapse,
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
      className='sidenav navbar-vertical navbar-expand-xs navbar-dark bg-dark fixed-left'
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
            </NavbarBrand>
          ) : null}
          <i
            className='ni ni-fat-remove close-menu-btn'
            onClick={toggleSidenav}
          />
        </div>
        <div className='navbar-inner'>
          <Nav>
            <Nav.Item>
              <Link to='/' className='nav-link' onClick={closeSidenav}>
                Home
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link
                className='nav-link'
                to='/eyerate-reviews'
                onClick={closeSidenav}
              >
                Eyerate Reviews
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link
                className='nav-link'
                to='/other-reviews'
                onClick={closeSidenav}
              >
                Other Reviews
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link className='nav-link' to='/payment' onClick={closeSidenav}>
                Payment
              </Link>
            </Nav.Item>
          </Nav>
        </div>
      </div>
    </Navbar>
  );
};

export default Sidebar;
