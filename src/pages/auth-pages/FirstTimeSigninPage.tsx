import React from 'react';
import { logInUserCognitoFunction, logInUserWithNewPasswordCognitoFunction } from '../../lib/aws/aws-cognito-functions';

interface IProps {
  history: Array<string>
}

const FirstTimeSigninPage: React.FC<IProps> = ({ history }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [newUser, setNewUser] = React.useState(false);
  const [newPassword, setNewPassword] = React.useState('');

  const Login = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const res = await logInUserCognitoFunction(email, password);
    if (res === false) {
      setNewUser(true);
    } else {
      history.push('/');
    }
  };

  const LoginWitNewPassword = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const res = await logInUserWithNewPasswordCognitoFunction(email, password, newPassword);
    if (res) {
      history.push('/');
      console.log('loged in with the new password');
    }
  };

  return (
    <div className='text-center p-1'>
      <h1>First Time Login</h1>
      {!newUser ? (
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
      ) : (
        <>
          <p>Please change your password</p>
          <form onSubmit={LoginWitNewPassword}>
            <input
              type='password'
              name='newPassword'
              id='newPassword'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input type='submit' value='Sign In' />
          </form>
        </>
      )}
    </div>
  );
};

export default FirstTimeSigninPage;
