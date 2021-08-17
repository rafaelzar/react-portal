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
import ReviewCard from '../../components/reviews-page/ReviewCard';
import { mockupData } from '../../lib/utils/mockupData';
import { IReviews } from '../../lib/interfaces';
import ReviewStats from '../../components/reviews-page/ReviewStats';

const ReviewsPage: React.FC = () => {
  const [reviews, setReviews] = React.useState<IReviews[]>([]);
  React.useEffect(() => {
    setReviews(mockupData);
  }, []);
  return (
    <DefaultLayout>
      <Container fluid>
        <h2>Reviews</h2>
        <div className='filters-section d-flex align-items-center mt-3 mb-5'>
          <span>Show reviews from</span>
          <div className='d-flex align-items-center ml-2'>
            <DropdownButton id='dropdown-reviews-time' title='Last Week'>
              <Dropdown.Item>Last Week</Dropdown.Item>
              <Dropdown.Item>Last 4 weeks</Dropdown.Item>
              <Dropdown.Item>Last 3 Months</Dropdown.Item>
            </DropdownButton>
            <input type='date' name='review-date' className='mx-2' />
            <span className='mr-2'>on</span>
            <DropdownButton id='dropdown-reviews-site' title='All sites'>
              <Dropdown.Item>All sites</Dropdown.Item>
              <Dropdown.Item>Eyerate</Dropdown.Item>
            </DropdownButton>
          </div>
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
