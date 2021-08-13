import React from 'react';
import Nav from './Nav';
import Sidebar from './Sidebar';
import logoImg from '../lib/assets/img/eyerate-logo.png';

interface IProps {
  children: React.ReactNode;
}

const DefaultLayout: React.FC<IProps> = ({ children }) => {
  // const [sidenavOpen, setSidenavOpen] = React.useState(true);
  // const toggleSidenav = () => {
  //   if (document.body.classList.contains('g-sidenav-pinned')) {
  //     document.body.classList.remove('g-sidenav-pinned');
  //     document.body.classList.add('g-sidenav-hidden');
  //   } else {
  //     document.body.classList.add('g-sidenav-pinned');
  //     document.body.classList.remove('g-sidenav-hidden');
  //   }
  //   setSidenavOpen(!sidenavOpen);
  // };
  return (
    <>
      <div id='side' className='side-menu-container'>
        <Sidebar
          // toggleSidenav={toggleSidenav}
          logo={{
            innerLink: '/',
            imgSrc: logoImg,
            imgAlt: '...',
          }}
        />
      </div>
      <div id='main' className='page-content'>
        <Nav />
        {children}
      </div>
    </>
  );
};

export default DefaultLayout;
