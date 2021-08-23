import React from 'react';
import {
  Row, Col, Container,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import UserInfoCard from '../../components/home-page/UserInfoCard';
import DefaultLayout from '../../layout/DefaultLayout';
import { getUserJwtTokenSelector } from '../../store/selectors/selectors';

const HomePage: React.FC = () => {
  const userToken = useSelector((state) => getUserJwtTokenSelector(state));
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
            <Col lg={12}>
              <h1>Home Page</h1>
            </Col>
            <Col lg={4} className='mt-3'>
              <UserInfoCard />
            </Col>
            <Col lg={8} />
          </Row>
        </Container>
      </div>
    </DefaultLayout>
  );
};

export default HomePage;
