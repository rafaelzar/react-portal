import React from 'react';
import { useAppDispatch } from '../../store/store';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getUserJwtTokenSelector } from '../../store/selectors/selectors';
import DefaultLayout from '../../layout/DefaultLayout';
import {
  Container, Row, Col, Card, Form, Button,
} from 'react-bootstrap';
import { swalError, swalInfo } from '../../lib/utils/toasts';
import {
  changePasswordAuthAction,
  logOutCognitoUserAuthAction,
} from '../../store/actions/authActions';

const SettingsPage: React.FC = () => {
  const reduxStore = useSelector((state: { user: any }) => state);
  const { user } = reduxStore.user;
  const firstNameValue = user.first_name;
  const lastNameValue = user.last_name;
  const nickNameValue = user.nick_name;
  const userEmailValue = user.email;
  const phoneNumberValue = user.phone;
  const [email, setEmail] = React.useState(userEmailValue);
  const [firstName, setFirstName] = React.useState(firstNameValue);
  const [lastName, setLastName] = React.useState(lastNameValue);
  const [phoneNumber, setPhoneNumber] = React.useState(phoneNumberValue);
  const [nickName, setNickName] = React.useState(nickNameValue);
  const [password, setPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const userToken = useSelector((state) => getUserJwtTokenSelector(state));
  const dispatch = useAppDispatch();
  const history = useHistory();

  const changePassword = async () => {
    if (newPassword !== '' && confirmPassword !== '') {
      if (newPassword !== confirmPassword) {
        swalError('Passwords do not match.');
      } else {
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
      }
    }
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
                      {firstNameValue}
                      {' '}
                      {lastNameValue}
                    </p>
                    <div className='horizontal-line my-3' />
                    {nickNameValue && (
                      <>
                        <h2>Nickname</h2>
                        <p>{nickNameValue}</p>
                      </>
                    )}
                    {phoneNumberValue && (
                      <>
                        <h2>Phone</h2>
                        <p>{phoneNumberValue}</p>
                      </>
                    )}
                    <h2>Email</h2>
                    <p>{userEmailValue}</p>
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
                              onChange={(e) => setNickName(e.target.value)}
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
                            onClick={changePassword}
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
