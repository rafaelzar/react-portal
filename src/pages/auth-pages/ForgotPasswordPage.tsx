import React from 'react';
import { useAppDispatch } from '../../store/store';
import {
  forgotPasswordAuthAction,
  forgotPasswordSubmitAuthAction,
} from '../../store/actions/authActions';
import { Link, useHistory } from 'react-router-dom';
import { swalError, swalSuccess } from '../../lib/utils/toasts';
import {
  Card, Col, Container, Row,
} from 'react-bootstrap';
import { isValidPassword, validateEmail } from '../../lib/utils/validator';

const ForgotPasswordPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [newPassword, setNewPassword] = React.useState('');
  const [newPasswordConfirmed, setNewPasswordConfirmed] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [code, setCode] = React.useState('');
  const [isUsernameSubmited, setIsUsernameSubmited] = React.useState(false);

  const forgotPassword = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!validateEmail(username)) {
      swalError('Please enter a valid email');
    } else {
      dispatch(forgotPasswordAuthAction(username)).then(
        (res: boolean | undefined) => {
          if (res) {
            setIsUsernameSubmited(true);
          } else {
            swalError('Something went wrong');
          }
        },
      );
    }
  };

  const forgotPasswordSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (code === '') {
      swalError('Please enter a valid code');
    } else if (!isValidPassword(newPassword)) {
      swalError('Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 digit and one special character');
    } else if (newPassword !== newPasswordConfirmed) {
      swalError('Passwords do not match');
    } else {
      dispatch(
        forgotPasswordSubmitAuthAction(username, code, newPassword),
      ).then((res: boolean | undefined) => {
        if (res) {
          history.push('/login');
          swalSuccess('Please login with new password');
        } else {
          swalError('Something went wrong');
        }
      });
    }
    // if (isValidPassword(newPassword)) {
    //   if (code !== '') {
    //     if (newPassword === newPasswordConfirmed) {
    //       dispatch(
    //         forgotPasswordSubmitAuthAction(username, code, newPassword),
    //       ).then((res: boolean | undefined) => {
    //         if (res) {
    //           history.push('/');
    //         } else {
    //           swalError('Something went wrong');
    //         }
    //       });
    //     } else {
    //       swalError('Passwords do not match');
    //     }
    //   } else {
    //     swalError('Please enter a valid  code');
    //   }
    //   swalSuccess('Please login with new password');
    // } else {
    //   swalError(
    //     'Password must be long at least 8 characters and contain at least one uppercase letter, one lower case letter, one digit and one special charater',
    //   );
    // }
  };
  return (
    <>
      <div className='forgot-background'>
        <Container className='pt-5 pb-5'>
          <Row className='justify-content-center'>
            <Col lg='5' md='7'>
              <Card className='card-background'>
                <Card.Header className='bg-transparent'>
                  <div className='text-muted text-center my-2'>
                    Forgot Password?
                  </div>
                </Card.Header>
                <Card.Body className='px-lg-5 py-lg-4'>
                  {!isUsernameSubmited ? (
                    <div>
                      <div className='text-center text-muted mb-4'>
                        Please enter your email.
                      </div>
                      <form onSubmit={forgotPassword} className='forgot-form'>
                        <input
                          type='text'
                          name='username'
                          placeholder='email'
                          id='email'
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                        <button
                          type='submit'
                          value='Submit'
                          className='btn forgot-button mt-5'
                        >
                          Submit
                        </button>
                        <Link to='/login' className='text-bottom mt-3'>
                          Return to login
                        </Link>
                      </form>
                    </div>
                  ) : (
                    <>
                      <div>
                        <form
                          onSubmit={forgotPasswordSubmit}
                          className='forgot-form'
                        >
                          <button
                            type='button'
                            onClick={() => setIsUsernameSubmited(false)}
                            className='btn forgot-button mx-auto mb-5'
                          >
                            Go Back
                          </button>
                          <input
                            type='text'
                            name='code'
                            placeholder='code'
                            id='code'
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            className='mb-3'
                          />
                          <input
                            type='password'
                            name='newPassword'
                            placeholder='new password'
                            id='newPassword'
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className='mb-3'
                          />
                          <input
                            type='password'
                            name='newPasswordConfirmed'
                            placeholder='confirm new password'
                            id='newPasswordConfirmed'
                            value={newPasswordConfirmed}
                            onChange={(e) => setNewPasswordConfirmed(e.target.value)}
                          />
                          <input
                            type='submit'
                            value='Submit'
                            className='btn forgot-button mt-5'
                          />
                          <Link to='/login' className='text-bottom mt-3'>
                            Return to login
                          </Link>
                        </form>
                      </div>
                    </>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};
export default ForgotPasswordPage;
