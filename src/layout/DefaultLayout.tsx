import React from 'react';
import { useLocation } from 'react-router-dom';
import Nav from './Nav';
import Sidebar from './Sidebar';
import logoImg from '../lib/assets/img/eyerate-logo.png';

interface IProps {
  children: React.ReactNode;
}

const DefaultLayout: React.FC<IProps> = ({ children }) => {
  const [sidenavOpen, setSidenavOpen] = React.useState(true);
  const location = useLocation();
  const mainContentRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    if (document.scrollingElement !== null) {
      document.scrollingElement.scrollTop = 0;
    }
    if (mainContentRef.current !== null) {
      mainContentRef.current.scrollTop = 0;
    }
  }, [location]);
  const toggleSidenav = () => {
    if (document.body.classList.contains('g-sidenav-pinned')) {
      document.body.classList.remove('g-sidenav-pinned');
      document.body.classList.add('g-sidenav-hidden');
    } else {
      document.body.classList.add('g-sidenav-pinned');
      document.body.classList.remove('g-sidenav-hidden');
    }
    setSidenavOpen(!sidenavOpen);
  };
  return (
    <>
      <Sidebar
        toggleSidenav={toggleSidenav}
        logo={{
          innerLink: '/',
          imgSrc: logoImg,
          imgAlt: '...',
        }}
      />
      <div className='main-content' ref={mainContentRef}>
        <Nav />
        <div>{children}</div>
      </div>
    </>
  );
};

export default DefaultLayout;
