import React from 'react';
import {
  Row, Col, Card, ProgressBar,
} from 'react-bootstrap';
import { Doughnut } from 'react-chartjs-2';
import { chartData, starsData } from '../../lib/utils/chartData';

const ReviewStats: React.FC = () => {
  return (
    <Card className='p-3'>
      <Card.Title>
        <h3>Review Stats</h3>
      </Card.Title>
      <Card.Text>
        <Row>
          <Col md={6}>
            <p className='font-weight-bold'>New reviews</p>
            <p className='big-number'>7</p>
          </Col>
          <Col md={6}>
            <p className='font-weight-bold'>Average Rating</p>
            <p className='big-number'>4.5</p>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <p className='font-weight-bold'>Star Distribution</p>
            <div className='mb-4'>
              {starsData.map((stars) => (
                <div key={stars.stars} className='stars-bar-wrapp mb-2'>
                  <span>
                    {stars.stars}
                    {' '}
                    Star
                  </span>
                  <ProgressBar className='star-bar' now={stars.percent} />
                </div>
              ))}
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <p className='font-weight-bold'>Site Distribution</p>
            <Doughnut
              data={chartData}
              options={{ animation: { duration: 0 } }}
            />
          </Col>
        </Row>
      </Card.Text>
    </Card>
  );
};

export default ReviewStats;
