import React from 'react';
import Nav from './Nav';
import Sidebar from './Sidebar';
import logoImg from '../lib/assets/img/eyerate-logo.png';

interface IProps {
  children: React.ReactNode;
}

const DefaultLayout: React.FC<IProps> = ({ children }) => {
  const toggleSidebar = () => {
    document.querySelector('#menu-trigger')?.classList.toggle('menu-clicked');
    document.querySelector('#side')?.classList.toggle('side-menu-close');
    document.querySelector('#main')?.classList.toggle('page-content-move');
  };
  return (
    <>
      <div id='side' className='side-menu-container'>
        <Sidebar
          logo={{
            innerLink: '/',
            imgSrc: logoImg,
            imgAlt: '...',
          }}
        />
      </div>
      <div id='main' className='page-content'>
        <Nav toggleSidebar={toggleSidebar} />
        {children}
      </div>
    </>
  );
};

export default DefaultLayout;
