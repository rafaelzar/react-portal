import React from 'react';
import { logInUserCognitoFunction } from '../../lib/aws/aws-cognito-functions';

const FirstTimeSigninPage: React.FC = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const Login = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    // console.log(email, password);
    logInUserCognitoFunction(email, password);
  };
  return (
    <div className='text-center p-1'>
      <h1>First Time Login</h1>
      <form onSubmit={Login}>
        <input
          type='text'
          name='email'
          id='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type='password'
          name='password'
          id='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type='submit' value='Sign In' />
      </form>
    </div>
  );
};

export default FirstTimeSigninPage;
