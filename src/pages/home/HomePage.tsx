import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import EarningsAvailableCard from '../../components/home-page/EarningsAvailableCard';
import EarningsStatsCard from '../../components/home-page/EarningsStatsCard';
import MentionsChartCard from '../../components/home-page/MentionsChartCard';
import ReviewMentionsCard from '../../components/home-page/ReviewMentionsCard';
import ReviewStatsCard from '../../components/home-page/ReviewStatsCard';
import UserInfoCard from '../../components/UserInfoCard';
import DefaultLayout from '../../layout/DefaultLayout';
import { fetchIdTokenCognitoFunction } from '../../lib/aws/aws-cognito-functions';
import { homePageData } from '../../lib/utils/mockupData';
import { IHomePageData } from '../../lib/interfaces';

const HomePage: React.FC = () => {
  const history = useHistory();
  const [data, setData] = React.useState<IHomePageData>({} as IHomePageData);

  React.useEffect(() => {
    async function fetchIdToken() {
      const idToken = await fetchIdTokenCognitoFunction();
      if (idToken === false) {
        history.push('/login');
      }
    }
    fetchIdToken();
    if (homePageData) {
      console.log(data);
      setData(homePageData);
    }
  }, [history, data]);

  return (
    <DefaultLayout>
      <div>
        <Container fluid>
          <Row>
            <Col lg={12} className='mb-3'>
              <h1>Home Page</h1>
            </Col>
            <Col lg={4} className='mb-3'>
              <UserInfoCard withButton />
            </Col>
            <Col lg={8}>
              <EarningsAvailableCard />
              <EarningsStatsCard />
              <ReviewStatsCard stats={homePageData.reviewStats} />
              <MentionsChartCard />
              <ReviewMentionsCard />
            </Col>
          </Row>
        </Container>
      </div>
    </DefaultLayout>
  );
};

export default HomePage;
