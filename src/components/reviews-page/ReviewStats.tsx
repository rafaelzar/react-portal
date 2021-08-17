import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { Doughnut } from 'react-chartjs-2';
import { chartData } from '../../lib/utils/chartData';

const ReviewStats: React.FC = () => {
  return (
    <Card className='p-3'>
      <Card.Title>
        <h3>Review Stats</h3>
      </Card.Title>
      <Card.Text>
        <Row>
          <Col md={6}>
            <p>New reviews</p>
            <p className='big-number'>7</p>
          </Col>
          <Col md={6}>
            <p>Average Rating</p>
            <p className='big-number'>4.5</p>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <p>Star Distribution</p>
            <Doughnut data={chartData} />
          </Col>
        </Row>
      </Card.Text>
    </Card>
  );
};

export default ReviewStats;
