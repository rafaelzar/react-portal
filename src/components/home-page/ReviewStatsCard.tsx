import React from 'react';
import {
  Container, Card, Row, Col,
} from 'react-bootstrap';

const ReviewStatsCard: React.FC = () => {
  return (
    <Card className='mb-3'>
      <Container className='py-3'>
        <h2>Review Stats</h2>
        <Row className='mt-3'>
          <Col md='4' sm='4' className='text-center mb-2'>
            <h3 className='big-number'>5</h3>
            <span>This Month&apos;s Mentions</span>
          </Col>
          <Col md='4' sm='4' className='text-center mb-2'>
            <h3 className='big-number'>70</h3>
            <span>All Time Mentions</span>
          </Col>
          <Col md='4' sm='4' className='text-center mb-2'>
            <h3 className='big-number'>4.9</h3>
            <span>Average Review Rating</span>
          </Col>
        </Row>
      </Container>
    </Card>
  );
};

export default ReviewStatsCard;
