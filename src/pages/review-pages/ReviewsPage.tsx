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

const ReviewsPage: React.FC = () => {
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
            <DropdownButton id='dropdown-reviews-time' title='All sites'>
              <Dropdown.Item>All sites</Dropdown.Item>
              <Dropdown.Item>Eyerate</Dropdown.Item>
            </DropdownButton>
          </div>
        </div>
        <Row>
          <Col md={4}>
            <Card className='p-2'>
              <Card.Title>
                <h3>Review Stats</h3>
              </Card.Title>
              <Card.Text>
                <Row>
                  <Col md={6}>
                    <p>New reviews</p>
                    <p>7</p>
                  </Col>
                  <Col md={6}>
                    <p>Average Rating</p>
                    <p>4.5</p>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <p>Star Distribution</p>
                  </Col>
                </Row>
              </Card.Text>
            </Card>
          </Col>
          <Col md={8}>
            <Card className='p-2'>
              <Card.Title>
                <h3>Review List</h3>
              </Card.Title>
            </Card>
          </Col>
        </Row>
      </Container>
    </DefaultLayout>
  );
};

export default ReviewsPage;
