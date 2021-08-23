import React from 'react';
import { useAppDispatch } from '../../store/store';
import {
  fetchUserFromDatabaseAuthAction,
  logInCognitoUserAuthAction,
  logInCognitoUserWithNewPasswordAuthAction,
} from '../../store/actions/authActions';
import { sendJWTToken } from '../../store/apiCalls';
import { Link } from 'react-router-dom';
import { swalError, swalSuccess } from '../../lib/utils/toasts';
import {
  Card, Col, Container, Row,
} from 'react-bootstrap';
import logo from '../../lib/assets/img/logo-eyerate.png';
import { validateLogin } from '../../lib/utils/validator';
import { fetchIdTokenCognitoFunction } from '../../lib/aws/aws-cognito-functions';

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

  React.useEffect(() => {
    async function fetchIdToken() {
      const idToken = await fetchIdTokenCognitoFunction();
      if (idToken !== false) {
        history.push('/');
      }
    }
    fetchIdToken();
  }, [history]);

  const Login = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (validateLogin(email, password)) {
      setIsLoading(true);
      dispatch(logInCognitoUserAuthAction(email, password)).then(
        async (res: boolean | string | undefined) => {
          if (res === 'NEW_PASSWORD_REQUIRED') {
            setNewUser(true);
            setIsLoading(false);
          } else if (res === false) {
            setIsLoading(false);
          } else {
            fetchUserFromDatabase();
          }
        },
      );
    }
  };

  const fetchUserFromDatabase = async () => {
    dispatch(fetchUserFromDatabaseAuthAction()).then(
      async (res: boolean | undefined) => {
        if (res) {
          setIsLoading(false);
          const isUserFetched = await sendJWTToken();
          if (isUserFetched) {
            history.push('/');
            setIsLoading(false);
            swalSuccess('Welcome!');
          }
        }
      },
    );
  };

  const LoginWitNewPassword = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (validateLogin(email, newPassword)) {
      setIsLoading(true);
      dispatch(
        logInCognitoUserWithNewPasswordAuthAction(email, password, newPassword),
      ).then((res: boolean | string | undefined) => {
        if (res) {
          fetchUserFromDatabase();
        } else {
          setIsLoading(false);
          swalError('No user in database');
        }
      });
    }
  };

  return (
    <div className='login-background'>
      <Container className='pt-5 pb-5'>
        <Row className='justify-content-center'>
          <Col lg='5' md='7'>
            <Card className='card-background'>
              <Card.Header className='bg-transparent'>
                <div className='text-muted text-center my-2'>
                  Welcome to the Employee Portal.
                </div>
              </Card.Header>
              <Card.Body className='px-lg-5 py-lg-5'>
                <img alt='Eyerate logo' className='login-logo' src={logo} />
                <div className='text-center text-muted mb-4'>
                  Please login in order to proceed.
                </div>
                {!newUser ? (
                  <form onSubmit={Login} className='login-form'>
                    <input
                      type='text'
                      name='email'
                      id='email'
                      placeholder='email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value.trim())}
                      className='mb-3'
                    />
                    <input
                      type='password'
                      name='password'
                      id='password'
                      placeholder='password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value.trim())}
                      className='mb-5'
                    />
                    <button
                      type='submit'
                      disabled={isLoading}
                      className='btn login-button'
                    >
                      Sign In
                    </button>
                    <Link to='/forgot-password' className='text-bottom mt-3'>
                      Forgot password?
                    </Link>
                  </form>
                ) : (
                  <>
                    <p>Please change your password</p>
                    <form onSubmit={LoginWitNewPassword} className='login-form'>
                      <input
                        type='password'
                        name='newPassword'
                        id='newPassword'
                        placeholder='New Password'
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value.trim())}
                        className='mb-5'
                      />
                      <button
                        type='submit'
                        disabled={isLoading}
                        className='btn login-button'
                      >
                        Sign In
                      </button>
                    </form>
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginPage;
