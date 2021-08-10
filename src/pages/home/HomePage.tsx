import React from 'react';
import { Link } from 'react-router-dom';
import DefaultLayout from '../../layout/DefaultLayout';
import { logOutUserCognitoFunction } from '../../lib/aws/aws-cognito-functions';

const HomePage: React.FC = () => {
  const logout = async () => {
    const res = await logOutUserCognitoFunction();
    if (res) {
      console.log('logged out');
    } else {
      console.log('error');
    }
  };

  return (
    <DefaultLayout>
      <div className='text-center'>
        <h1>Home Page</h1>
        <input type='button' value='Logout' onClick={logout} />
        <Link className='nav-link' to='/forgot-password'>
          Forgot Password
        </Link>
      </div>
    </DefaultLayout>
  );
};

export default HomePage;
