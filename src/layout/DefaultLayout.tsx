import React from 'react';
import { useWindowSize } from '../lib/hooks/useWindowSize';
import Nav from './Nav';
import Sidebar from './Sidebar';
import logoImg from '../lib/assets/img/eyerate-logo.png';
import { ISize } from '../lib/interfaces';

interface IProps {
  children: React.ReactNode;
}

const DefaultLayout: React.FC<IProps> = ({ children }) => {
  const [toggleSideNav, setToggleSideNav] = React.useState(false);
  const size: ISize = useWindowSize();

  React.useEffect(() => {
    if (size.width && size.width < 876) {
      setToggleSideNav(true);
    } else {
      setToggleSideNav(false);
    }
  }, [size]);

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
