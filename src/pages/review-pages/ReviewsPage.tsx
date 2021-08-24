import React, { SyntheticEvent } from 'react';
import { useAppDispatch } from '../../store/store';
import DefaultLayout from '../../layout/DefaultLayout';
import {
  Container, Row, Col, Card, Button, Spinner,
} from 'react-bootstrap';
import { DateRangePicker } from 'react-date-range';
import { subDays } from 'date-fns';
import moment from 'moment';
import ReviewCard from '../../components/reviews-page/ReviewCard';
import {
  IDatePicker,
  IEmployeeReviews,
  IReviewsResponse,
} from '../../lib/interfaces';
import ReviewStats from '../../components/reviews-page/ReviewStats';
import { getEmployeesReviewsReviewsAction } from '../../store/actions/reviewsActions';
import StarResolver from '../../components/reviews-page/StarResolver';
import PaginationComponent from '../../components/reviews-page/Pagination';

const ReviewsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [employeeReviews, setEmployeeReviews] = React.useState<
    IEmployeeReviews[]
  >([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [toggleDatePicker, setToggleDatePicker] = React.useState(false);
  const [paginationCursor, setPaginationCursor] = React.useState('');
  const [disableNextPagination, setDisableNextPagination] = React.useState(false);
  const [toggleSitesDropdown, setToggleSitesDropdown] = React.useState(false);
  const [toggleStarsDropdown, setToggleStarsDropdown] = React.useState(false);
  const [toggleDateSortDropdown, setToggleDateSortDropdown] = React.useState(
    false,
  );
  const [sitesDropdownValue, setSitesDropdownValue] = React.useState(
    'All Sites',
  );
  const [starsDropdownValue, setStarsDropdownValue] = React.useState(0);
  const [dateSortDropdownValue, setDateSortDropdownValue] = React.useState(
    'Newest',
  );
  const [dateRange, setDateRange] = React.useState({
    start: `${moment(subDays(new Date(), 7)).format('MMM DD')}`,
    end: `${moment(new Date()).format('MMM DD')}`,
  });
  const [dateRangeQuery, setDateRangeQuery] = React.useState({
    start: `${moment(subDays(new Date(), 7)).format('YYYY-MM-DD')}`,
    end: `${moment(new Date()).format('YYYY-MM-DD')}`,
  });
  const [dateQueryForPaginaton, setDateQueryForPagination] = React.useState({
    firstDate: '',
    lastDate: '',
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
    const buildQueryFromState = () => {
      let query = `${userID}?startDate=${dateRangeQuery.start}&endDate=${
        dateRangeQuery.end
      }&sort=${
        dateSortDropdownValue === 'Newest' ? 'desc' : 'asc'
      }`;
      if (starsDropdownValue !== 0)
        query = `${query}&rating=${starsDropdownValue}`;
      if (sitesDropdownValue !== 'All Sites')
        query = `${query}&platform=${sitesDropdownValue}`;
      if (paginationCursor !== '')
        query = `${query}&cursor=${paginationCursor}`;
      if (dateQueryForPaginaton.lastDate !== '')
        query = `${query}&lastDate=${dateQueryForPaginaton.lastDate}`;
      return query;
    };

    const query = buildQueryFromState();
    setIsLoading(true);
    dispatch(getEmployeesReviewsReviewsAction(query)).then(
      (res: IReviewsResponse | undefined) => {
        if (res) {
          const { data: reviews = [], stats = {} } = res;
          setEmployeeReviews(reviews);
          if (reviews.length < 5) {
            setDisableNextPagination(true);
          }
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      },
    );
  }, [
    dateRangeQuery,
    sitesDropdownValue,
    starsDropdownValue,
    dispatch,
    dateSortDropdownValue,
    paginationCursor,
    dateQueryForPaginaton,
  ]);

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
    setDateQueryForPagination((prevState) => ({
      ...prevState,
      lastDate: '',
      firstDate: '',
    }));
    setPaginationCursor('');
    setToggleDatePicker(!toggleDatePicker);
  };

  const handleDropdownChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLElement;
    setSitesDropdownValue(target.innerText);
  };

  const handlePaginationNext = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setPaginationCursor('right');
    setDateQueryForPagination((prevState) => ({
      ...prevState,
      lastDate: employeeReviews[employeeReviews.length - 1].created_at,
    }));
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
                setToggleSitesDropdown(!toggleSitesDropdown);
              }}
            >
              {sitesDropdownValue}
              <div className='arrow-wrapp'>
                <i className='arrow down ml-5' />
              </div>
              <div
                className={`custom-dropdown-menu ${
                  toggleSitesDropdown ? 'd-block' : ''
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
                  Google
                </div>
                <div
                  className='custom-dropdown-item'
                  onClick={(e) => handleDropdownChange(e)}
                >
                  Weedmaps
                </div>
                <div
                  className='custom-dropdown-item'
                  onClick={(e) => handleDropdownChange(e)}
                >
                  GMB
                </div>
                <div
                  className='custom-dropdown-item'
                  onClick={(e) => handleDropdownChange(e)}
                >
                  Yelp
                </div>
              </div>
            </div>
          </div>
          <div
            className='date-range-btn custom-dropdown d-flex align-items-center m-2'
            onClick={() => {
              setToggleStarsDropdown(!toggleStarsDropdown);
            }}
          >
            {starsDropdownValue !== 0 ? (
              <StarResolver rating={starsDropdownValue} />
            ) : (
              'All Ratings'
            )}
            <div className='arrow-wrapp'>
              <i className='arrow down ml-3' />
            </div>
            <div
              className={`custom-dropdown-menu ${
                toggleStarsDropdown ? 'd-block' : ''
              }`}
            >
              <div
                className='custom-dropdown-item'
                onClick={() => setStarsDropdownValue(0)}
              >
                All Ratings
              </div>
              <div
                className='custom-dropdown-item'
                onClick={() => setStarsDropdownValue(1)}
              >
                <StarResolver rating={1} />
              </div>
              <div
                className='custom-dropdown-item'
                onClick={() => setStarsDropdownValue(2)}
              >
                <StarResolver rating={2} />
              </div>
              <div
                className='custom-dropdown-item'
                onClick={() => setStarsDropdownValue(3)}
              >
                <StarResolver rating={3} />
              </div>
              <div
                className='custom-dropdown-item'
                onClick={() => setStarsDropdownValue(4)}
              >
                <StarResolver rating={4} />
              </div>
              <div
                className='custom-dropdown-item'
                onClick={() => setStarsDropdownValue(5)}
              >
                <StarResolver rating={5} />
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
          <Col xl={4} lg={5} md={12}>
            <ReviewStats />
          </Col>
          <Col xl={8} lg={7} md={12}>
            {!isLoading ? (
              <Card className='p-3 mb-3'>
                <Card.Title className='d-flex justify-content-between px-2'>
                  <h3>Review List</h3>
                  <div
                    className='date-range-btn custom-dropdown d-flex align-items-center'
                    onClick={() => {
                      setToggleDateSortDropdown(!toggleDateSortDropdown);
                    }}
                  >
                    {dateSortDropdownValue}
                    <div className='arrow-wrapp'>
                      <i className='arrow down ml-3' />
                    </div>
                    <div
                      className={`custom-dropdown-menu ${
                        toggleDateSortDropdown ? 'd-block' : ''
                      }`}
                    >
                      <div
                        className='custom-dropdown-item'
                        onClick={() => setDateSortDropdownValue('Newest')}
                      >
                        Newest
                      </div>
                      <div
                        className='custom-dropdown-item'
                        onClick={() => setDateSortDropdownValue('Oldest')}
                      >
                        Oldest
                      </div>
                    </div>
                  </div>
                </Card.Title>
                {employeeReviews.length > 0 ? (
                  employeeReviews.map((r) => (
                    <ReviewCard key={r._id} data={r} />
                  ))
                ) : (
                  <div className='m-auto'>No reviews with this criteria</div>
                )}
                {employeeReviews.length > 0 && (
                  <PaginationComponent
                    disableNextPagination={disableNextPagination}
                    handlePaginationNext={handlePaginationNext}
                  />
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
