import React from 'react';
import { Link } from 'react-router-dom';
import DefaultLayout from '../../layout/DefaultLayout';
import { logOutUserCognitoFunction } from '../../lib/aws/aws-cognito-functions';

const HomePage: React.FC = () => {
  const logout = async () => {
    logOutUserCognitoFunction();
  };

  return (
    <DefaultLayout>
      <div className='text-center'>
        <h1>Home Page</h1>
        <input type='button' value='Logout' onClick={logout} />
      </div>
      <Link className='nav-link' to='/forgot-password'>
        Forgot Password
      </Link>
    </DefaultLayout>
  );
};

export default HomePage;
