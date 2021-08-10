import React from 'react';
import { forgotPasswordFunction, forgotPasswordSubmitFunction } from '../../lib/aws/aws-cognito-functions';
import DefaultLayout from '../../layout/DefaultLayout';

const ForgotPasswordPage: React.FC = () => {
  const [newPassword, setNewPassword] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [sameUsername, setSameUsername] = React.useState('');
  const [code, setCode] = React.useState('');
  const [isUsernameSubmited, setIsUsernameSubmited] = React.useState(false);

  const ForgotPassword = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    forgotPasswordFunction(username);
    setIsUsernameSubmited(true);
  };

  const ForgotPasswordSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    forgotPasswordSubmitFunction(sameUsername, code, newPassword);
  };
  return (
    <>
      <DefaultLayout>
        <div className='text-center'>
          <h2>
            Forgot your password?
            <br />
            Enter Your Email and we&apos;ll send you a code
          </h2>
        </div>
        { !isUsernameSubmited ? (
          <div className='text-center'>
            <form onSubmit={ForgotPassword}>
              <input
                type='text'
                name='username'
                placeholder='username'
                id='email'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input type='submit' value='Submit' />
            </form>
          </div>
        ) : (
          <>
            <div className='text-center'>
              <button type='button' onClick={() => setIsUsernameSubmited(false)}>
                Go Back
              </button>
              <form onSubmit={ForgotPasswordSubmit}>
                <input
                  type='text'
                  name='username'
                  placeholder='username'
                  id='username'
                  value={sameUsername}
                  onChange={(e) => setSameUsername(e.target.value)}
                />
                <input
                  type='text'
                  name='newPassword'
                  placeholder='newPassword'
                  id='newPassword'
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <input
                  type='text'
                  name='code'
                  placeholder='code'
                  id='code'
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
                <input type='submit' value='Submit' />
              </form>
            </div>
          </>
        )}
      </DefaultLayout>
    </>
  );
};
export default ForgotPasswordPage;
