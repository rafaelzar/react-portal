import React, { SyntheticEvent } from 'react';
import { useAppDispatch } from '../../store/store';
import DefaultLayout from '../../layout/DefaultLayout';
import {
  Container,
  Dropdown,
  DropdownButton,
  Row,
  Col,
  Card,
  Button,
  Spinner,
} from 'react-bootstrap';
import { DateRangePicker } from 'react-date-range';
import { subDays } from 'date-fns';
import moment from 'moment';
import ReviewCard from '../../components/reviews-page/ReviewCard';
import { IDatePicker, IEmployeeReviews } from '../../lib/interfaces';
import ReviewStats from '../../components/reviews-page/ReviewStats';
import { getEmployeesReviewsReviewsAction } from '../../store/actions/reviewsActions';

const ReviewsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [employeeReviews, setEmployeeReviews] = React.useState<
    IEmployeeReviews[]
  >([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [toggleDatePicker, setToggleDatePicker] = React.useState(false);
  const [toggleSitesDropdonw, setToggleSitesDropdown] = React.useState(false);
  const [sitesDropdownValue, setSitesDropdownValue] = React.useState(
    'All Sites',
  );
  const [dateRange, setDateRange] = React.useState({
    start: `${moment(subDays(new Date(), 7)).format('MMM DD')}`,
    end: `${moment(new Date()).format('MMM DD')}`,
  });
  const [dateRangeQuery, setDateRangeQuery] = React.useState({
    start: `${moment(subDays(new Date(), 7)).format('YYYY-MM-DD')}`,
    end: `${moment(new Date()).format('YYYY-MM-DD')}`,
  });
  const [dateState, setDateState] = React.useState<IDatePicker[]>([
    {
      startDate: subDays(new Date(), 7),
      endDate: new Date(),
      key: 'selection',
    },
  ]);
  const userID = '607a1d65e4be5100126b827e';
  React.useEffect(() => {
    const query = `${userID}?startDate=${dateRangeQuery.start}&endDate=${dateRangeQuery.end}`;
    setIsLoading(true);
    dispatch(getEmployeesReviewsReviewsAction(query)).then(
      (res: Array<IEmployeeReviews> | undefined) => {
        if (res) {
          setEmployeeReviews(res);
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      },
    );
  }, [dateRangeQuery, dispatch]);

  const setDateRangeFilter = () => {
    setDateRange((prevState) => ({
      ...prevState,
      start: moment(dateState.map((d) => d.startDate).toString()).format(
        'MMM DD',
      ),
      end: moment(dateState.map((d) => d.endDate).toString()).format('MMM DD'),
    }));
    setDateRangeQuery((prevState) => ({
      ...prevState,
      start: moment(dateState.map((d) => d.startDate).toString()).format(
        'YYYY-MM-DD',
      ),
      end: moment(dateState.map((d) => d.endDate).toString()).format(
        'YYYY-MM-DD',
      ),
    }));
    setToggleDatePicker(!toggleDatePicker);
  };

  const handleDropdownChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLElement;
    setSitesDropdownValue(target.innerText);
  };
  return (
    <DefaultLayout>
      <Container fluid>
        <h2>Reviews</h2>
        <div className='filters-section d-flex align-items-center mt-3 mb-5'>
          <span>Show reviews from</span>
          <div
            className='date-range-btn-wrapp ml-2'
            onClick={() => setToggleDatePicker(!toggleDatePicker)}
          >
            <div className='date-range-btn d-none'>Last 4 weeks</div>
            <div className='date-range-btn'>
              <span>{dateRange.start}</span>
              {' '}
              -
              {' '}
              <span>{dateRange.end}</span>
            </div>
          </div>
          <div className='d-flex align-items-center ml-2'>
            <span className='mr-2'>on</span>
            <div
              className='date-range-btn custom-dropdown d-flex align-items-center'
              onClick={() => {
                setToggleSitesDropdown(!toggleSitesDropdonw);
              }}
            >
              {sitesDropdownValue}
              <div className='arrow-wrapp'>
                <i className='arrow down ml-5' />
              </div>
              <div
                className={`custom-dropdown-menu ${
                  toggleSitesDropdonw ? 'd-block' : ''
                }`}
              >
                <div
                  className='custom-dropdown-item'
                  onClick={(e) => handleDropdownChange(e)}
                >
                  All Sites
                </div>
                <div
                  className='custom-dropdown-item'
                  onClick={(e) => handleDropdownChange(e)}
                >
                  Eyerate
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`date-picker-wrapp ${toggleDatePicker ? 'd-block' : ''}`}
        >
          <DateRangePicker
            onChange={(item) => setDateState([item.selection])}
            inputRanges={[]}
            staticRanges={[]}
            showDateDisplay={false}
            showMonthAndYearPickers={false}
            moveRangeOnFirstSelection={false}
            maxDate={new Date()}
            ranges={dateState}
            direction='vertical'
          />
          <Col md={12} className='mb-4'>
            <Button className='w-100' onClick={setDateRangeFilter}>
              Filter
            </Button>
          </Col>
        </div>
        <Row>
          <Col md={4}>
            <ReviewStats />
          </Col>
          <Col md={8}>
            {!isLoading ? (
              <Card className='p-3 mb-3'>
                <Card.Title className='d-flex justify-content-between px-2'>
                  <h3>Review List</h3>
                  <DropdownButton
                    id='dropdown-reviews-sort'
                    title='Most Recent'
                  >
                    <Dropdown.Item>Newset</Dropdown.Item>
                    <Dropdown.Item>Oldest</Dropdown.Item>
                  </DropdownButton>
                </Card.Title>
                {employeeReviews.length > 0 ? (
                  employeeReviews.map((r) => (
                    <ReviewCard key={r._id} data={r} />
                  ))
                ) : (
                  <div className='m-auto'>No reviews for this period</div>
                )}
              </Card>
            ) : (
              <Spinner className='d-block m-auto' animation='border' />
            )}
          </Col>
        </Row>
      </Container>
    </DefaultLayout>
  );
};

export default ReviewsPage;
