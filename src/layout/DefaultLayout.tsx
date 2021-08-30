import React from 'react';
import Nav from './Nav';
import Sidebar from './Sidebar';
import logoImg from '../lib/assets/img/eyerate-logo.png';

interface IProps {
  children: React.ReactNode;
}

const DefaultLayout: React.FC<IProps> = ({ children }) => {
  const [toggleSideNav, setToggleSideNav] = React.useState(false);
  const [windowWidth, setWindowWidth] = React.useState(0);
  React.useEffect(() => {
    resizeWindow();
    window.addEventListener('resize', resizeWindow);
    if (windowWidth < 876) {
      setToggleSideNav(true);
    } else {
      setToggleSideNav(false);
    }
    return () => window.removeEventListener('resize', resizeWindow);
  }, [windowWidth]);

  let resizeWindow = () => {
    setWindowWidth(window.innerWidth);
  };

  const toggleSidebar = () => {
    // TODO - fix adding class to hamburger menu
    // document.querySelector('#menu-trigger')?.classList.toggle('menu-clicked');
    setToggleSideNav(!toggleSideNav);
  };
  return (
    <>
      <div
        id='side'
        className={`side-menu-container ${
          toggleSideNav ? 'side-menu-close' : ''
        }`}
      >
        <Sidebar
          toggleSidebar={toggleSidebar}
          logo={{
            innerLink: '/',
            imgSrc: logoImg,
            imgAlt: '...',
          }}
        />
      </div>
      <div
        id='main'
        className={`page-content ${toggleSideNav ? 'page-content-move' : ''}`}
      >
        <Nav toggleSidebar={toggleSidebar} />
        {children}
      </div>
    </>
  );
};

export default DefaultLayout;
