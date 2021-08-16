import React from 'react';

interface IProps {
  toggleSidebar: () => void;
}

const Nav: React.FC<IProps> = ({ toggleSidebar }) => {
  return (
    <nav className='nav-custom d-flex justify-content-end mb-2'>
      <div className='d-flex align-items-center'>
        <div id='menu-trigger' onClick={toggleSidebar}>
          <span className='menu-stripe stripe-top mr-3' />
        </div>
      </div>
    </nav>
  );
};

export default Nav;
