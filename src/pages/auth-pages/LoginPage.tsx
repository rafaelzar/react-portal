import React from 'react';
import { useAppDispatch } from '../../store/store';
import { logInCognitoUserAuthAction, logInCognitoUserWithNewPasswordAuthAction } from '../../store/actions/authActions';

interface IProps {
  history: Array<string>;
}

const LoginPage: React.FC<IProps> = ({ history }) => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [newUser, setNewUser] = React.useState(false);
  const [newPassword, setNewPassword] = React.useState('');

  const Login = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(logInCognitoUserAuthAction(email, password)).then(
      (res: boolean | string | undefined) => {
        if (res === 'NEW_PASSWORD_REQUIRED') {
          setNewUser(true);
        } else if (res === false) {
          console.log('wrong pass or username');
        } else {
          history.push('/');
          console.log(res);
        }
      },
    );
  };

  const LoginWitNewPassword = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(logInCognitoUserWithNewPasswordAuthAction(email, password, newPassword)).then(
      (res: boolean | string | undefined) => {
        if (res) {
          history.push('/');
          console.log('logged in with the new password');
        } else {
          console.log('something went wrong');
        }
      },
    );

  };

  return (
    <div className='text-center p-1'>
      <h1>Login</h1>
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

export default LoginPage;
