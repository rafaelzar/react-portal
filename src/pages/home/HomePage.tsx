import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import UserInfoCard from '../../components/home-page/UserInfoCard';
import DefaultLayout from '../../layout/DefaultLayout';
import { fetchIdTokenCognitoFunction } from '../../lib/aws/aws-cognito-functions';

const HomePage: React.FC = () => {
  const history = useHistory();

  React.useEffect(() => {
    async function fetchIdToken() {
      const idToken = await fetchIdTokenCognitoFunction();
      if (idToken === false) {
        history.push('/login');
      }
    }
    fetchIdToken();
  }, [history]);

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
