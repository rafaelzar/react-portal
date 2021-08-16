import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getUserJwtTokenSelector } from '../../store/selectors/selectors';
import DefaultLayout from '../../layout/DefaultLayout';
import {
  Container, Row, Col, Card, Form, Button,
} from 'react-bootstrap';

const SettingsPage: React.FC = () => {
  const userInfo = useSelector((state) => getUserJwtTokenSelector(state));
  const history = useHistory();

  React.useEffect(() => {
    if (userInfo === '') {
      history.push('/login');
    }
  }, [history, userInfo]);

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
                    <p>John Peterson</p>
                    <div className='horizontal-line my-3' />
                    <h2>Nickname</h2>
                    <p>J.P.</p>
                    <h2>Phone</h2>
                    <p>(838)718-5555</p>
                    <h2>Email</h2>
                    <p>example@gmail.com</p>
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
                            <Form.Control type='text' placeholder='John' />
                          </Form.Group>
                        </Col>
                        <Col lg='6'>
                          <Form.Group className='mb-3'>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type='text' placeholder='Peterson' />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg='6'>
                          <Form.Group className='mb-3'>
                            <Form.Label>Nickname</Form.Label>
                            <Form.Control type='text' placeholder='J.P.' />
                          </Form.Group>
                        </Col>
                        <Col lg='6' />
                        <Col lg='6'>
                          <Form.Group className='mb-3' controlId='formBasicEmail'>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type='email' placeholder='Enter email' />
                          </Form.Group>
                        </Col>
                        <Col lg='6'>
                          <Form.Group className='mb-4'>
                            <Form.Label>Phone</Form.Label>
                            <Form.Control type='text' placeholder='(838)718-5555' />
                          </Form.Group>
                        </Col>
                        <Col lg='12'>
                          <div className='horizontal-line mb-3' />
                        </Col>
                        <Col lg='6'>
                          <h3>Password</h3>
                          <Form.Group className='my-3'>
                            <Form.Label>Current Password</Form.Label>
                            <Form.Control type='password' placeholder='**********' />
                          </Form.Group>
                        </Col>
                        <Col lg='6' />
                        <Col lg='6'>
                          <Form.Group className='mb-3'>
                            <Form.Label>New Password</Form.Label>
                            <Form.Control type='password' placeholder='**********' />
                          </Form.Group>
                        </Col>
                        <Col lg='6' />
                        <Col lg='6'>
                          <Form.Group className='mb-3'>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type='password' placeholder='**********' />
                          </Form.Group>
                        </Col>
                        <Col lg='12'>
                          <div className='horizontal-line mt-3 mb-4' />
                        </Col>
                        <Col lg='12'>
                          <Button type='submit' className='btn ml-auto'>
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
