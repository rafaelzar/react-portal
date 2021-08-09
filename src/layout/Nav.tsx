import React from 'react';
import { Link } from 'react-router-dom';

const Nav:React.FC = () => {
  return (
    <nav className='d-flex justify-content-center p-1'>
      <Link className='nav-link' to='/'>Home</Link>
      <Link className='nav-link' to='/eyerate-reviews'>Eyerate Reviews</Link>
      <Link className='nav-link' to='/other-reviews'>Other Reviews</Link>
      <Link className='nav-link' to='/payment'>Payment</Link>
    </nav>
  );
};

export default Nav;
