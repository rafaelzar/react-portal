import React from 'react';
import { useAppDispatch } from '../../store/store';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  getUserJwtTokenSelector,
  getUserSelector,
} from '../../store/selectors/selectors';
import DefaultLayout from '../../layout/DefaultLayout';
import {
  Container, Row, Col, Card, Form, Button,
} from 'react-bootstrap';
import { swalInfo } from '../../lib/utils/toasts';
import {
  changePasswordAuthAction,
  logOutCognitoUserAuthAction,
} from '../../store/actions/authActions';
import { validateChangePasswordSubmit } from '../../lib/utils/validator';
import { updateUser } from '../../store/apiCalls';

const SettingsPage: React.FC = () => {
  const userInfo = useSelector((state) => getUserSelector(state));
  const {
    first_name: userFirstName = '',
    last_name: userLastName = '',
    nick_names: userNickName = '',
    email: userEmail = '',
    phone: userPhone = '',
  } = userInfo;
  const [email, setEmail] = React.useState(userEmail);
  const [firstName, setFirstName] = React.useState(userFirstName);
  const [lastName, setLastName] = React.useState(userLastName);
  const [phoneNumber, setPhoneNumber] = React.useState(userPhone);
  const [nickName, setNickName] = React.useState(userNickName);
  const [password, setPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const userToken = useSelector((state) => getUserJwtTokenSelector(state));
  const dispatch = useAppDispatch();
  const history = useHistory();

  const updateSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (userFirstName !== firstName) {
      // ovde ide poziv za menjanje first Name
    } else if (lastName !== userLastName) {
      console.log('Last Name changed');
    } else if (userEmail !== email) {
      console.log('Email Changed');
    } else if (nickName !== userNickName) {
      console.log('Nickname Changed');
    } else if (userPhone !== phoneNumber) {
      console.log('Phone Number Changed');
    } else if (password !== '') {
      if (
        validateChangePasswordSubmit(password, newPassword, confirmPassword)
      ) {
        changePassword();
      }
    } else {
      swalInfo('No changes were made');
    }
  };
  const changePassword = async () => {
    dispatch(changePasswordAuthAction(password, newPassword)).then(
      (res: boolean | string | undefined) => {
        if (res) {
          dispatch(logOutCognitoUserAuthAction()).then(
            (logoutRes: boolean | string | undefined) => {
              if (logoutRes) {
                swalInfo('Login with new password');
                history.push('/login');
              }
            },
          );
        }
      },
    );
  };

  React.useEffect(() => {
    if (userToken === '') {
      history.push('/login');
    }
  }, [history, userToken]);

  return (
    <DefaultLayout>
      <div className='user-settings-wrapper mb-5'>
        <Container fluid>
          <div>
            <h1 className='mt-5 ml-3'>Account Settings</h1>
          </div>
          <Row>
            <Col lg='4' className='mt-3'>
              <Container>
                <Card className='user-information-card'>
                  <Container className='my-3'>
                    <p>
                      {userFirstName}
                      {' '}
                      {userLastName}
                    </p>
                    <div className='horizontal-line my-3' />
                    <h2>Nickname</h2>
                    {nickName ? (
                      <>
                        <p>{userNickName}</p>
                      </>
                    ) : (
                      <p>Unset</p>
                    )}
                    <h2>Phone</h2>
                    {userPhone ? (
                      <>
                        <p>{userPhone}</p>
                      </>
                    ) : (
                      <p>Unset</p>
                    )}
                    <h2>Email</h2>
                    <p>{userEmail}</p>
                  </Container>
                </Card>
              </Container>
            </Col>
            <Col lg='8' className='mt-3'>
              <Container>
                <Card>
                  <Container className='my-3'>
                    <h2 className='big-h2'>General Settings</h2>
                    <div className='horizontal-line my-3' />
                    <h3>Contact Information</h3>
                    <Form>
                      <Row>
                        <Col lg='6'>
                          <Form.Group className='mb-3'>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                              type='text'
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                            />
                          </Form.Group>
                        </Col>
                        <Col lg='6'>
                          <Form.Group className='mb-3'>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                              type='text'
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg='6'>
                          <Form.Group className='mb-3'>
                            <Form.Label>Nickname</Form.Label>
                            <Form.Control
                              type='text'
                              value={nickName}
                              // onChange={(e) => setNickName(e.target.value)}
                            />
                          </Form.Group>
                        </Col>
                        <Col lg='6' />
                        <Col lg='6'>
                          <Form.Group
                            className='mb-3'
                            controlId='formBasicEmail'
                          >
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                              type='email'
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </Form.Group>
                        </Col>
                        <Col lg='6'>
                          <Form.Group className='mb-4'>
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                              type='text'
                              value={phoneNumber}
                              onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                          </Form.Group>
                        </Col>
                        <Col lg='12'>
                          <div className='horizontal-line mb-3' />
                        </Col>
                        <Col lg='6'>
                          <h3>Password</h3>
                          <Form.Group className='my-3'>
                            <Form.Label>Current Password</Form.Label>
                            <Form.Control
                              type='password'
                              placeholder='**********'
                              onChange={(e) => setPassword(e.target.value)}
                            />
                          </Form.Group>
                        </Col>
                        <Col lg='6' />
                        <Col lg='6'>
                          <Form.Group className='mb-3'>
                            <Form.Label>New Password</Form.Label>
                            <Form.Control
                              type='password'
                              placeholder='**********'
                              onChange={(e) => setNewPassword(e.target.value)}
                            />
                          </Form.Group>
                        </Col>
                        <Col lg='6' />
                        <Col lg='6'>
                          <Form.Group className='mb-3'>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                              type='password'
                              placeholder='**********'
                              onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                          </Form.Group>
                        </Col>
                        <Col lg='12'>
                          <div className='horizontal-line mt-3 mb-4' />
                        </Col>
                        <Col lg='12'>
                          <Button
                            className='btn ml-auto'
                            onClick={updateSubmit}
                          >
                            Save changes
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  </Container>
                </Card>
              </Container>
            </Col>
          </Row>
        </Container>
      </div>
    </DefaultLayout>
  );
};

export default SettingsPage;
