import React from 'react';
import { useAppDispatch } from '../../store/store';
import {
  logInCognitoUserAuthAction,
  logInCognitoUserWithNewPasswordAuthAction,
} from '../../store/actions/authActions';

interface IProps {
  history: Array<string>;
}

const LoginPage: React.FC<IProps> = ({ history }) => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [newUser, setNewUser] = React.useState(false);
  const [newPassword, setNewPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const Login = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(logInCognitoUserAuthAction(email, password)).then(
      (res: boolean | string | undefined) => {
        if (res === 'NEW_PASSWORD_REQUIRED') {
          setNewUser(true);
          setIsLoading(false);
          console.log(res);
        } else if (res === false) {
          console.log('wrong pass or username');
          setIsLoading(false);
        } else {
          setIsLoading(false);
          history.push('/');
          console.log(res);
        }
      },
    );
  };

  const LoginWitNewPassword = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(
      logInCognitoUserWithNewPasswordAuthAction(email, password, newPassword),
    ).then((res: boolean | string | undefined) => {
      if (res) {
        setIsLoading(false);
        history.push('/');
      } else {
        setIsLoading(false);
        console.log('something went wrong');
      }
    });
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
          <input type='submit' disabled={isLoading} value='Sign In' />
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
            <input type='submit' disabled={isLoading} value='Sign In' />
          </form>
        </>
      )}
    </div>
  );
};

export default LoginPage;
