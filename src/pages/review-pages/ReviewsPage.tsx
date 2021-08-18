import React, { SyntheticEvent } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import {
  Container,
  Dropdown,
  DropdownButton,
  Row,
  Col,
  Card,
  Button,
} from 'react-bootstrap';
import { DateRangePicker } from 'react-date-range';
import { addDays } from 'date-fns';
import moment from 'moment';
import ReviewCard from '../../components/reviews-page/ReviewCard';
import { mockupData } from '../../lib/utils/mockupData';
import { IReviews, IDatePicker } from '../../lib/interfaces';
import ReviewStats from '../../components/reviews-page/ReviewStats';

const ReviewsPage: React.FC = () => {
  const [reviews, setReviews] = React.useState<IReviews[]>([]);
  const [toggleDatePicker, setToggleDatePicker] = React.useState(false);
  const [toggleSitesDropdonw, setToggleSitesDropdown] = React.useState(false);
  const [sitesDropdownValue, setSitesDropdownValue] = React.useState(
    'All Sites',
  );
  const [dateRange, setDateRange] = React.useState({
    start: 'From',
    end: 'To',
  });
  const [dateState, setDateState] = React.useState<IDatePicker[]>([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection',
    },
  ]);
  React.useEffect(() => {
    setReviews(mockupData);
  }, []);

  const setDateRangeFilter = () => {
    setDateRange((prevState) => ({
      ...prevState,
      start: moment(dateState.map((d) => d.startDate).toString()).format(
        'MMM DD',
      ),
      end: moment(dateState.map((d) => d.endDate).toString()).format('MMM DD'),
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
            <div className='date-range-btn'>Last 4 weeks</div>
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
          className={`date-piker-wrapp ${toggleDatePicker ? 'd-block' : ''}`}
        >
          <Row>
            <DateRangePicker
              onChange={(item) => setDateState([item.selection])}
              inputRanges={[]}
              showDateDisplay={false}
              showMonthAndYearPickers={false}
              moveRangeOnFirstSelection={false}
              ranges={dateState}
              direction='vertical'
            />
            <Col md={12} className='mb-4'>
              <Button onClick={setDateRangeFilter}>Filter</Button>
            </Col>
          </Row>
        </div>
        <Row>
          <Col md={4}>
            <ReviewStats />
          </Col>
          <Col md={8}>
            <Card className='p-3 mb-3'>
              <Card.Title className='d-flex justify-content-between px-2'>
                <h3>Review List</h3>
                <DropdownButton id='dropdown-reviews-sort' title='Most Recent'>
                  <Dropdown.Item>Newset</Dropdown.Item>
                  <Dropdown.Item>Oldest</Dropdown.Item>
                </DropdownButton>
              </Card.Title>
              {reviews.map((r) => (
                <ReviewCard
                  key={r._id}
                  author={r.author}
                  content={r.content}
                  date={r.date}
                  rating={r.rating}
                  platform={r.platform}
                />
              ))}
            </Card>
          </Col>
        </Row>
      </Container>
    </DefaultLayout>
  );
};

export default ReviewsPage;
