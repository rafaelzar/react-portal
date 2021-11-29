import React, { SyntheticEvent } from 'react';
import { useAppDispatch } from '../../store/store';
import DefaultLayout from '../../layout/DefaultLayout';
import {
  Container, Row, Col, Card, Button, Spinner,
} from 'react-bootstrap';
import { DateRangePicker } from 'react-date-range';
import { subDays } from 'date-fns';
import moment from 'moment';
import FeedbackCard from '../../components/feedback-page/FeedbackCard';
import {
  IDatePicker,
  IEmployeeFeedback,
  IFeedbackResponse,
  IFeedbackStats,
} from '../../lib/interfaces';
import FeedbackStats from '../../components/feedback-page/FeedbackStats';
import { getEmployeesFeedbackAction } from '../../store/actions/feedbackActions';
import StarResolver from '../../components/reviews-page/StarResolver';
import { getUserIDSelector } from '../../store/selectors/selectors';
import { useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';

const FeedbackPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [feedback, setFeedback] = React.useState<
    IEmployeeFeedback[]
  >([]);
  const [stats, setStats] = React.useState<IFeedbackStats>(
    {} as IFeedbackStats,
  );
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLastPage, setIsLastPage] = React.useState(false);
  const [toggleDatePicker, setToggleDatePicker] = React.useState(false);
  const [toggleStarsDropdown, setToggleStarsDropdown] = React.useState(false);
  const [toggleDateSortDropdown, setToggleDateSortDropdown] = React.useState(
    false,
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

  const starsDropdownRef = React.useRef<HTMLDivElement>(null);
  const dateSortDropdownRef = React.useRef<HTMLDivElement>(null);
  const datePickerDropdownRef = React.useRef<HTMLDivElement>(null);
  const datePickerDropdownRefDateInput = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent | TouchEvent) => {
      const isClickedOutsideOfAnyDropdowns = (toggleStarsDropdown
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
    toggleStarsDropdown,
    toggleDateSortDropdown,
    toggleDatePicker,
  ]);

  // ! Uncomment this line and import line in order to see real data for the current employee
  const userId = useSelector((state) => getUserIDSelector(state));
  // const userID = '607a1d65e4be5100126b827e';
  // const userID = '610ad8f087eb7f7f432a9759';

  React.useEffect(() => {
    setFeedback([]);
    setIsLoading(true);
  }, [dateRangeQuery, dateSortDropdownValue, starsDropdownValue]);

  React.useEffect(() => {
    const buildQueryFromState = () => {
      let query = `${userId}?startDate=${dateRangeQuery.start}&endDate=${
        dateRangeQuery.end
      }&sort=${dateSortDropdownValue === 'Newest' ? 'desc' : 'asc'}&cursor=right`;
      if (starsDropdownValue !== 0)
        query = `${query}&rating=${starsDropdownValue}`;
      if (dateQueryForPaginaton.lastDate !== '')
        query = `${query}&lastDate=${dateQueryForPaginaton.lastDate}`;
      if (dateQueryForPaginaton.firstDate !== '')
        query = `${query}&firstDate=${dateQueryForPaginaton.firstDate}`;
      return query;
    };

    const query = buildQueryFromState();

    dispatch(getEmployeesFeedbackAction(query)).then(
      (res: IFeedbackResponse | undefined) => {
        if (res) {
          setFeedback(prevReviews => [...prevReviews, ...res.data]);
          setStats(res.stats);
          setIsLastPage(res.isLast || res.data.length === 0);
        }

        setIsLoading(false);
      },
    );
  }, [
    userId,
    dateRangeQuery,
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

  const fetchMore = () => {
    setDateQueryForPagination((prevState) => ({
      ...prevState,
      lastDate: feedback[feedback.length - 1].created_at,
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
        <h2>Feedback</h2>
        <div className='filters-section mt-3 mb-5'>
          <span>Show feedbacks from</span>
          <div
            className='date-range-btn-wrapp mr-2'
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
              <FeedbackStats stats={stats} />
            </Col>
            <Col xl={8} lg={7} md={12}>
              <Card className='p-3 mb-3'>
                <Card.Title className='d-flex justify-content-between px-2'>
                  <h3>Feedback List</h3>
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
                {feedback.length > 0 ? (
                  <InfiniteScroll
                    dataLength={feedback.length}
                    next={fetchMore}
                    hasMore={!isLastPage}
                    loader={<Spinner className='d-block mx-auto my-4' animation='border' />}
                  >
                    {feedback.map((r) => (
                      <FeedbackCard key={r._id} data={r} />
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

export default FeedbackPage;
