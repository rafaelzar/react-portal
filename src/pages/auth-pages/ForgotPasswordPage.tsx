import React from 'react';
import { useAppDispatch } from '../../store/store';
import {
  forgotPasswordAuthAction,
  forgotPasswordSubmitAuthAction,
} from '../../store/actions/authActions';
import { useHistory } from 'react-router-dom';
import styles from '../../styles/components/ForgotPasswordPage.module.scss';
import { swalError } from '../../lib/utils/toasts';

const ForgotPasswordPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [newPassword, setNewPassword] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [sameUsername, setSameUsername] = React.useState('');
  const [code, setCode] = React.useState('');
  const [isUsernameSubmited, setIsUsernameSubmited] = React.useState(false);

  const forgotPassword = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(forgotPasswordAuthAction(username)).then(
      (res: boolean | undefined) => {
        if (res) {
          setIsUsernameSubmited(true);
        } else {
          swalError('Something went wrong');
        }
      },
    );
  };

  const forgotPasswordSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(forgotPasswordSubmitAuthAction(username, code, newPassword)).then(
      (res: boolean | undefined) => {
        if (res) {
          history.push('/');
        } else {
          swalError('Something went wrong');
        }
      },
    );
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
        {!isUsernameSubmited ? (
          <div>
            <form onSubmit={forgotPassword}>
              <input
                type='text'
                name='username'
                placeholder='username'
                id='email'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type='submit'
                value='Submit'
                className={styles.submitButton}
              />
            </form>
          </div>
        ) : (
          <>
            <div>
              <button
                type='button'
                onClick={() => setIsUsernameSubmited(false)}
                className={styles.submitButton}
              >
                Go Back
              </button>
              <form
                onSubmit={forgotPasswordSubmit}
                className={styles.forgetPasswordForm}
              >
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
                <input
                  type='submit'
                  value='Submit'
                  className={styles.submitButton}
                />
              </form>
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default ForgotPasswordPage;
