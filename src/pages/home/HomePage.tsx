import React from 'react';
import {
  Row, Col, Container, Spinner,
} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useAppDispatch } from '../../store/store';
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
import { getEmployeeStatsStatsAction } from '../../store/actions/statsActions';

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [data, setData] = React.useState<IHomePageData>({} as IHomePageData);
  const [isLoading, setIsLoading] = React.useState(false);
  const userID = '607a1d65e4be5100126b827e';

  React.useEffect(() => {
    async function fetchIdToken() {
      const idToken = await fetchIdTokenCognitoFunction();
      if (idToken === false) {
        history.push('/login');
      }
    }
    fetchIdToken();
    const buildQueryFromState = () => {
      const queryData = `${userID}?sort=desc`;
      return queryData;
    };
    const query = buildQueryFromState();
    setIsLoading(true);
    dispatch(getEmployeeStatsStatsAction(query)).then(
      (res: IHomePageData | undefined) => {
        if (res) {
          setData(res);
          console.log(res);
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      },
    );
  }, [dispatch, history]);

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
            {!isLoading ? (
              <Col lg={8}>
                <EarningsAvailableCard />
                <EarningsStatsCard earningsStats={data.earningsStats} />
                <ReviewStatsCard stats={data.reviewStats} />
                <MentionsChartCard
                  sitesData={data.reviewSiteMentions}
                />
                <ReviewMentionsCard reviewsData={data.reviewMentions} />
              </Col>
            ) : (
              <Spinner className='d-block m-auto' animation='border' />
            )}
          </Row>
        </Container>
      </div>
    </DefaultLayout>
  );
};

export default HomePage;
