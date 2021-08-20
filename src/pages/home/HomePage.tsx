import React from 'react';
import {
  Row, Col, Container, Card,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import DefaultLayout from '../../layout/DefaultLayout';
import { getUserJwtTokenSelector, getUserSelector } from '../../store/selectors/selectors';

const HomePage: React.FC = () => {
  const userToken = useSelector((state) => getUserJwtTokenSelector(state));
  const userInfo = useSelector((state) => getUserSelector(state));
  const {
    first_name: userFirstName = '',
    last_name: userLastName = '',
    nick_names: userNickName = [' '],
    email: userEmail = '',
    phone: userPhone = '',
  } = userInfo;
  const history = useHistory();

  React.useEffect(() => {
    if (userToken === '') {
      history.push('/login');
    }
  }, [history, userToken]);

  return (
    <DefaultLayout>
      <div>
        <Container fluid>
          <Row>
            <Col lg='4' className='mt-3'>
              <h1>Home Page</h1>
              <Card className='user-information-card'>
                <Container className='my-3'>
                  <p>
                    {userFirstName}
                    {' '}
                    {userLastName}
                  </p>
                  <h2>Nick name</h2>
                  {userNickName ? (
                    <>
                      <p>{userNickName[0]}</p>
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

            </Col>
            <Col lg='8' />
          </Row>
        </Container>
      </div>
    </DefaultLayout>
  );
};

export default HomePage;
