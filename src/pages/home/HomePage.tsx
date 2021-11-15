import React from 'react';
import {
  Row, Col, Container, Spinner, Card,
} from 'react-bootstrap';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { useAppDispatch } from '../../store/store';
import EmployeePhoto from '../../components/EmployeePhoto';
import EarningsAvailableCard from '../../components/home-page/EarningsAvailableCard';
import EarningsStatsCard from '../../components/home-page/EarningsStatsCard';
import MentionsChartCard from '../../components/home-page/MentionsChartCard';
import ReviewMentionsCard from '../../components/home-page/ReviewMentionsCard';
import ReviewStatsCard from '../../components/home-page/ReviewStatsCard';
import UserInfoCard from '../../components/UserInfoCard';
import DefaultLayout from '../../layout/DefaultLayout';
import { fetchIdTokenCognitoFunction } from '../../lib/aws/aws-cognito-functions';
import { IHomePageData, IEmployeeReviews } from '../../lib/interfaces';
import { getEmployeeStatsStatsAction } from '../../store/actions/statsActions';
import { getUserSelector, getUserIDSelector } from '../../store/selectors/selectors';
import { useSelector } from 'react-redux';

import styles from './styles.module.scss';

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [data, setData] = React.useState<IHomePageData>({} as IHomePageData);
  const [isLoading, setIsLoading] = React.useState(false);
  const [reviews, setReviews] = React.useState<IEmployeeReviews[]>([]);
  const [hasMoreReviews, setHasMoreReviews] = React.useState(true);

  // ! Uncomment this line and import line in order to see real data for the current employee
  const user = useSelector((state) => getUserSelector(state));
  const userId = useSelector((state) => getUserIDSelector(state));

  // const userID = '607a1d65e4be5100126b827e';
  // const userID = '60ad43e35e08070013432c0b';

  React.useEffect(() => {
    async function fetchIdToken() {
      const idToken = await fetchIdTokenCognitoFunction();
      if (idToken === false) {
        history.push('/login');
      }
    }
    fetchIdToken();
    const buildQueryFromState = () => {
      const startDate = '1970-01-01';
      const endDate = moment(new Date()).format('YYYY-MM-DD');
      const queryData = `${userId}?sort=desc&startDate=${startDate}&endDate=${endDate}`;
      return queryData;
    };
    const query = buildQueryFromState();
    setIsLoading(true);
    dispatch(getEmployeeStatsStatsAction(query)).then(
      (res: IHomePageData | undefined) => {
        if (res) {
          setData(res);
          setReviews(res.reviewMentions);
        }
        setIsLoading(false);
      },
    );
  }, [dispatch, history, userId]);

  const fetchMoreReviews = () => {
    const buildQueryFromState = () => {
      const startDate = '1970-01-01';
      const lastDate = reviews[reviews.length - 1].created_at;
      const endDate = moment(new Date()).format('YYYY-MM-DD');
      const queryData = `${userId}?sort=desc&startDate=${startDate}&endDate=${endDate}&cursor=right&lastDate=${lastDate}`;
      return queryData;
    };
    const query = buildQueryFromState();
    dispatch(getEmployeeStatsStatsAction(query)).then(
      (res: IHomePageData | undefined) => {
        if (res) {
          setData(res);
          setReviews(prevReviews => [...prevReviews, ...res.reviewMentions]);
          setHasMoreReviews(Boolean(res.reviewMentions?.length));
        }
      },
    );
  };

  const goToSettings = () => {
    history.push('/settings');
  };

  return (
    <DefaultLayout>
      <div>
        <Container fluid>
          <Row>
            <Col lg={12} className='mb-3'>
              <h1>
                Welcome,&nbsp;
                {user.first_name}
                !
              </h1>
            </Col>
            <Col lg={4} className='mb-3'>
              <Card>
                <Container className='my-3 d-flex flex-column align-items-center'>
                  <EmployeePhoto userInfo={user} big onClick={goToSettings} />
                </Container>
              </Card>
              <UserInfoCard className={styles.userInfo} />
            </Col>
            {!isLoading ? (
              <Col lg={8}>
                <EarningsAvailableCard earningsStats={data.earningsStats} />
                <EarningsStatsCard earningsStats={data.earningsStats} />
                <ReviewStatsCard stats={data.reviewStats} />
                <ReviewMentionsCard reviewsData={reviews} fetchMore={fetchMoreReviews} hasMore={hasMoreReviews} />
                <MentionsChartCard sitesData={data.reviewSiteMentions} />
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
