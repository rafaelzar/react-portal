import React from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import {
  Container,
  Dropdown,
  DropdownButton,
  Row,
  Col,
  Card,
} from 'react-bootstrap';
import { DateRangePicker } from 'react-date-range';
import { addDays } from 'date-fns';
import ReviewCard from '../../components/reviews-page/ReviewCard';
import { mockupData } from '../../lib/utils/mockupData';
import { IReviews, IDatePicker } from '../../lib/interfaces';
import ReviewStats from '../../components/reviews-page/ReviewStats';

const ReviewsPage: React.FC = () => {
  const [reviews, setReviews] = React.useState<IReviews[]>([]);
  const [toggleDatePicker, setToggleDatePicker] = React.useState(false);
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
            <div className='date-range-btn'>Jun 30-Jul 30</div>
          </div>
          <div className='d-flex align-items-center ml-2'>
            <span className='mr-2'>on</span>
            <div
              className='date-range-btn with-border d-flex align-items-center'
              onClick={() => console.log(dateState)}
            >
              All Sites
              <div className='arrow-wrapp'>
                <i className='arrow down ml-5' />
              </div>
            </div>
          </div>
        </div>
        <div
          className={`date-piker-wrapp ${toggleDatePicker ? 'd-block' : ''}`}
        >
          <DateRangePicker
            onChange={(item) => setDateState([item.selection])}
            showSelectionPreview
            // showMonthAndYearPickers={false}
            moveRangeOnFirstSelection={false}
            ranges={dateState}
            direction='horizontal'
          />
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
