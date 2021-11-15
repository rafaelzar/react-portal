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
  IReviewStats,
} from '../../lib/interfaces';
import ReviewStats from '../../components/reviews-page/ReviewStats';
import { getEmployeesReviewsReviewsAction } from '../../store/actions/reviewsActions';
import StarResolver from '../../components/reviews-page/StarResolver';
import { getUserIDSelector } from '../../store/selectors/selectors';
import { useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';

const ReviewsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [employeeReviews, setEmployeeReviews] = React.useState<
    IEmployeeReviews[]
  >([]);
  const [reviewStats, setReviewStats] = React.useState<IReviewStats>(
    {} as IReviewStats,
  );
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLastPage, setIsLastPage] = React.useState(false);
  const [toggleDatePicker, setToggleDatePicker] = React.useState(false);
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
  const defaultStartDate = '1970-01-01';
  const [dateRangeQuery, setDateRangeQuery] = React.useState({
    start: defaultStartDate,
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

  const sitesDropdownRef = React.useRef<HTMLDivElement>(null);
  const starsDropdownRef = React.useRef<HTMLDivElement>(null);
  const dateSortDropdownRef = React.useRef<HTMLDivElement>(null);
  const datePickerDropdownRef = React.useRef<HTMLDivElement>(null);
  const datePickerDropdownRefDateInput = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent | TouchEvent) => {
      const isClickedOutsideOfAnyDropdowns = (toggleSitesDropdown
          && sitesDropdownRef.current
          && !sitesDropdownRef.current.contains(e.target as Node))
        || (toggleStarsDropdown
          && starsDropdownRef.current
          && !starsDropdownRef.current.contains(e.target as Node))
        || (toggleDateSortDropdown
          && dateSortDropdownRef.current
          && !dateSortDropdownRef.current.contains(e.target as Node))
        || (toggleDatePicker
          && datePickerDropdownRef.current
          && !datePickerDropdownRef.current.contains(e.target as Node)
          && datePickerDropdownRefDateInput.current
          && !datePickerDropdownRefDateInput.current.contains(e.target as Node));
      if (isClickedOutsideOfAnyDropdowns) {
        setToggleSitesDropdown(false);
        setToggleStarsDropdown(false);
        setToggleDateSortDropdown(false);
        setToggleDatePicker(false);
      }
    };
    document.addEventListener('mousedown', checkIfClickedOutside);
    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [
    toggleSitesDropdown,
    toggleStarsDropdown,
    toggleDateSortDropdown,
    toggleDatePicker,
  ]);

  // ! Uncomment this line and import line in order to see real data for the current employee
  const userId = useSelector((state) => getUserIDSelector(state));
  // const userID = '607a1d65e4be5100126b827e';
  // const userID = '610ad8f087eb7f7f432a9759';

  React.useEffect(() => {
    setEmployeeReviews([]);
    setIsLoading(true);
  }, [dateRangeQuery, dateSortDropdownValue, starsDropdownValue, sitesDropdownValue]);

  React.useEffect(() => {
    const buildQueryFromState = () => {
      let query = `${userId}?startDate=${dateRangeQuery.start}&endDate=${
        dateRangeQuery.end
      }&sort=${dateSortDropdownValue === 'Newest' ? 'desc' : 'asc'}&cursor=right`;
      if (starsDropdownValue !== 0)
        query = `${query}&rating=${starsDropdownValue}`;
      if (sitesDropdownValue !== 'All Sites')
        query = `${query}&platform=${sitesDropdownValue}`;
      if (dateQueryForPaginaton.lastDate !== '')
        query = `${query}&lastDate=${dateQueryForPaginaton.lastDate}`;
      if (dateQueryForPaginaton.firstDate !== '')
        query = `${query}&firstDate=${dateQueryForPaginaton.firstDate}`;
      return query;
    };

    const query = buildQueryFromState();

    dispatch(getEmployeesReviewsReviewsAction(query)).then(
      (res: IReviewsResponse | undefined) => {
        if (res) {
          const {
            data: reviews = [],
            stats,
            isLast = false,
          } = res;
          setEmployeeReviews(prevReviews => [...prevReviews, ...reviews]);
          setReviewStats(stats);
          setIsLastPage(isLast);
        }

        setIsLoading(false);
      },
    );
  }, [
    userId,
    dateRangeQuery,
    sitesDropdownValue,
    starsDropdownValue,
    dispatch,
    dateSortDropdownValue,
    dateQueryForPaginaton,
  ]);

  const setDateRangeFilter = () => {
    setDateRangeQuery((prevState) => ({
      ...prevState,
      start: moment(dateState.map((d) => d.startDate).toString()).format(
        'YYYY-MM-DD',
      ),
      end: moment(dateState.map((d) => d.endDate).toString()).format(
        'YYYY-MM-DD',
      ),
    }));
    resetPagination();
    setToggleDatePicker(!toggleDatePicker);
  };

  const resetPagination = () => {
    setDateQueryForPagination((prevState) => ({
      ...prevState,
      lastDate: '',
      firstDate: '',
    }));
  };

  const handleDropdownChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLElement;
    setSitesDropdownValue(target.innerText);
    resetPagination();
  };

  const fetchMore = () => {
    setDateQueryForPagination((prevState) => ({
      ...prevState,
      lastDate: employeeReviews[employeeReviews.length - 1].created_at,
    }));
  };

  const handleDateSortDropdownChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLElement;
    setDateSortDropdownValue(target.innerText);
    resetPagination();
  };

  const handeRatingStarsChange = (rating: number) => {
    setStarsDropdownValue(rating);
    resetPagination();
  };

  return (
    <DefaultLayout>
      <Container fluid>
        <h2>Reviews</h2>
        <div className='filters-section mt-3 mb-5'>
          <span>Show reviews from</span>
          <div
            className='date-range-btn-wrapp'
            onClick={() => setToggleDatePicker(!toggleDatePicker)}
            ref={datePickerDropdownRefDateInput}
          >
            <div className='date-range-btn'>
              {dateRangeQuery.start === defaultStartDate ? <span>All time</span> : (
                <span>
                  {moment(dateRangeQuery.start).format('MMM DD')}
                  {' '}
                  -
                  {' '}
                  {moment(dateRangeQuery.end).format('MMM DD')}
                </span>
              )}
            </div>
          </div>
          <div className='filters-site-wrapper'>
            <span className='mr-2 on-devider'>on</span>
            <div
              className='date-range-btn custom-dropdown d-flex align-items-center'
              onClick={() => {
                setToggleSitesDropdown(!toggleSitesDropdown);
              }}
              ref={sitesDropdownRef}
            >
              {sitesDropdownValue}
              <div className='arrow-wrapp'>
                <i className='arrow down' />
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
                  Weedmaps
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
                  Eyerate
                </div>
              </div>
            </div>
          </div>
          <div
            className='date-range-btn custom-dropdown d-flex align-items-center'
            onClick={() => {
              setToggleStarsDropdown(!toggleStarsDropdown);
            }}
            ref={starsDropdownRef}
          >
            {starsDropdownValue !== 0 ? (
              <StarResolver rating={starsDropdownValue} />
            ) : (
              'All Ratings'
            )}
            <div className='arrow-wrapp'>
              <i className='arrow down' />
            </div>
            <div
              className={`custom-dropdown-menu ${
                toggleStarsDropdown ? 'd-block' : ''
              }`}
            >
              <div
                className='custom-dropdown-item'
                onClick={() => handeRatingStarsChange(0)}
              >
                All Ratings
              </div>
              <div
                className='custom-dropdown-item'
                onClick={() => handeRatingStarsChange(1)}
              >
                <StarResolver rating={1} />
              </div>
              <div
                className='custom-dropdown-item'
                onClick={() => handeRatingStarsChange(2)}
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
                onClick={() => handeRatingStarsChange(4)}
              >
                <StarResolver rating={4} />
              </div>
              <div
                className='custom-dropdown-item'
                onClick={() => handeRatingStarsChange(5)}
              >
                <StarResolver rating={5} />
              </div>
            </div>
          </div>
        </div>
        <div
          className={`date-picker-wrapp ${toggleDatePicker ? 'd-block' : ''}`}
          ref={datePickerDropdownRef}
        >
          <DateRangePicker
            onChange={(item) => setDateState([item.selection])}
            inputRanges={[]}
            // staticRanges={[]}
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
        {!isLoading ? (
          <Row>
            <Col xl={4} lg={5} md={12}>
              <ReviewStats stats={reviewStats} />
            </Col>
            <Col xl={8} lg={7} md={12}>
              <Card className='p-3 mb-3'>
                <Card.Title className='d-flex justify-content-between px-2'>
                  <h3>Review List</h3>
                  <div
                    className='date-range-btn custom-dropdown d-flex align-items-center'
                    onClick={() => {
                      setToggleDateSortDropdown(!toggleDateSortDropdown);
                    }}
                    ref={dateSortDropdownRef}
                  >
                    {dateSortDropdownValue}
                    <div className='arrow-wrapp'>
                      <i className='arrow down' />
                    </div>
                    <div
                      className={`custom-dropdown-menu ${
                        toggleDateSortDropdown ? 'd-block' : ''
                      }`}
                    >
                      <div
                        className='custom-dropdown-item'
                        onClick={(e) => handleDateSortDropdownChange(e)}
                      >
                        Newest
                      </div>
                      <div
                        className='custom-dropdown-item'
                        onClick={(e) => handleDateSortDropdownChange(e)}
                      >
                        Oldest
                      </div>
                    </div>
                  </div>
                </Card.Title>
                {employeeReviews.length > 0 ? (
                  <InfiniteScroll
                    dataLength={employeeReviews.length}
                    next={fetchMore}
                    hasMore={!isLastPage}
                    loader={<Spinner className='d-block mx-auto my-4' animation='border' />}
                  >
                    {employeeReviews.map((r) => (
                      <ReviewCard key={r._id} data={r} />
                    ))}
                  </InfiniteScroll>
                ) : (
                  <div className='m-auto'>No reviews with this criteria</div>
                )}
              </Card>
            </Col>
          </Row>
        ) : (
          <Spinner className='d-block m-auto' animation='border' />
        )}
      </Container>
    </DefaultLayout>
  );
};

export default ReviewsPage;
