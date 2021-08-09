import React from 'react';
import Nav from './Nav';

interface IProps {
  children: React.ReactNode;
}

const DefaultLayout: React.FC<IProps> = ({ children }) => {
  return (
    <>
      <Nav />
      <div>
        {children}
      </div>
    </>
  );
};

export default DefaultLayout;
