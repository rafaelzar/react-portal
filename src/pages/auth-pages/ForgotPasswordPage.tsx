import React from 'react';
import { forgotPasswordFunction, forgotPasswordSubmitFunction } from '../../lib/aws/aws-cognito-functions';
import styles from '../../styles/components/ForgotPasswordPage.module.scss';

const ForgotPasswordPage: React.FC = () => {
  const [newPassword, setNewPassword] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [sameUsername, setSameUsername] = React.useState('');
  const [code, setCode] = React.useState('');
  const [isUsernameSubmited, setIsUsernameSubmited] = React.useState(false);

  const ForgotPassword = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const res = await forgotPasswordFunction(username);
    if (res) {
      setIsUsernameSubmited(true);
    } else {
      console.log('Error');
    }
  };

  const ForgotPasswordSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    forgotPasswordSubmitFunction(sameUsername, code, newPassword);
  };
  return (
    <>
      <div className={styles.forgotPasswordWrapper}>
        <div>
          <h2>
            Forgot your password?
            <br />
          </h2>
          <p>Enter your username and we&apos;ll send you a code</p>
        </div>
        { !isUsernameSubmited ? (
          <div>
            <form onSubmit={ForgotPassword}>
              <input
                type='text'
                name='username'
                placeholder='username'
                id='email'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input type='submit' value='Submit' className={styles.submitButton} />
            </form>
          </div>
        ) : (
          <>
            <div>
              <button type='button' onClick={() => setIsUsernameSubmited(false)} className={styles.submitButton}>
                Go Back
              </button>
              <form onSubmit={ForgotPasswordSubmit} className={styles.forgetPasswordForm}>
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
                  placeholder='new password'
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
                <input type='submit' value='Submit' className={styles.submitButton} />
              </form>
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default ForgotPasswordPage;
