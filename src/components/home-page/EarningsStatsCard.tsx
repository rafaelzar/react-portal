import React from 'react';
import {
  Container, Card, Row, Col,
} from 'react-bootstrap';

const EarningsStatsCard: React.FC = () => {
  return (
    <Card className='mb-3'>
      <Container className='py-3'>
        <h2>Earnings Stats</h2>
        <Row className='mt-3'>
          <Col md='4' sm='4' className='text-center mb-2'>
            <h3 className='big-number'>$80</h3>
            <span>This Month&apos;s Earnings</span>
          </Col>
          <Col md='4' sm='4' className='text-center mb-2'>
            <h3 className='big-number'>$345</h3>
            <span>All Time Earnins</span>
          </Col>
          <Col md='4' sm='4' className='text-center mb-2'>
            <h3 className='big-number'>2</h3>
            <span>Leaderboard Rank</span>
          </Col>
        </Row>
      </Container>
    </Card>
  );
};

export default EarningsStatsCard;
