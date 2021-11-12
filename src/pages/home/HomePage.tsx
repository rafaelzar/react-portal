import React from 'react';
import {
  Row, Col, Container, Spinner, Card,
} from 'react-bootstrap';
import moment from 'moment';
import { subDays } from 'date-fns';
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
import { IHomePageData } from '../../lib/interfaces';
import { getEmployeeStatsStatsAction } from '../../store/actions/statsActions';
import { getUserSelector, getUserIDSelector } from '../../store/selectors/selectors';
import { useSelector } from 'react-redux';

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [data, setData] = React.useState<IHomePageData>({} as IHomePageData);
  const [isLoading, setIsLoading] = React.useState(false);
  const [loadRevews, setLoadReviews] = React.useState(false);
  const [dateRangeQuery, setDateRangeQuery] = React.useState({
    start: `${moment(subDays(new Date(), 7)).format('YYYY-MM-DD')}`,
    end: `${moment(new Date()).format('YYYY-MM-DD')}`,
  });
  const [dateRangeLabel, setDateRangeLabel] = React.useState('Last 7 Days');

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
      const queryData = `${userId}?sort=desc&startDate=${moment(
        subDays(new Date(), 7),
      ).format('YYYY-MM-DD')}&endDate=${moment(new Date()).format(
        'YYYY-MM-DD',
      )}`;
      return queryData;
    };
    const query = buildQueryFromState();
    setIsLoading(true);
    dispatch(getEmployeeStatsStatsAction(query)).then(
      (res: IHomePageData | undefined) => {
        if (res) {
          setData(res);
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      },
    );
  }, [dispatch, history, userId]);

  const setDateRangeForReviews = (day: number) => {
    setDateRangeQuery((prevState) => ({
      ...prevState,
      start: `${moment(subDays(new Date(), day)).format('YYYY-MM-DD')}`,
    }));
    if (day === 30) {
      setDateRangeLabel('Last 30 Days');
    } else {
      setDateRangeLabel('Last 7 Days');
    }
    const query = `${userId}?sort=desc&startDate=${dateRangeQuery.start}&endDate=${dateRangeQuery.end}`;
    setLoadReviews(true);
    dispatch(getEmployeeStatsStatsAction(query)).then(
      (res: IHomePageData | undefined) => {
        if (res) {
          setData(res);
          setLoadReviews(false);
        } else {
          setLoadReviews(false);
        }
      },
    );
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
                  <EmployeePhoto userInfo={user} big />
                </Container>
              </Card>
              <UserInfoCard withButton />
            </Col>
            {!isLoading ? (
              <Col lg={8}>
                <EarningsAvailableCard earningsStats={data.earningsStats} />
                <EarningsStatsCard earningsStats={data.earningsStats} />
                <ReviewStatsCard stats={data.reviewStats} />
                <MentionsChartCard sitesData={data.reviewSiteMentions} />
                <ReviewMentionsCard
                  reviewsData={data.reviewMentions}
                  setDateRangeForReviews={setDateRangeForReviews}
                  dateRangeLabel={dateRangeLabel}
                  loadRevews={loadRevews}
                />
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
