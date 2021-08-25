import React from 'react';
import {
  Row, Col, Card, ProgressBar,
} from 'react-bootstrap';
import { Doughnut } from 'react-chartjs-2';
import { Chart } from './Chart';

interface IStarsData {
  stars: number;
  percent: number;
  number: number;
}
interface IReviewStats {
  numberOfReviews: number;
  averageRating: number;
  starsData: IStarsData[];
  chartData: Array<number>;
}
interface IProps {
  stats: IReviewStats;
}

const ReviewStats: React.FC<IProps> = ({ stats }) => {
  const {
    numberOfReviews, averageRating, starsData, chartData,
  } = stats;

  return (
    <Card className='p-3'>
      <Card.Title>
        <h3>Review Stats</h3>
      </Card.Title>
      <Card.Text>
        <Row>
          <Col md={6}>
            <p className='font-weight-bold'>New reviews</p>
            <p className='big-number'>{numberOfReviews}</p>
          </Col>
          <Col md={6}>
            <p className='font-weight-bold'>Average Rating</p>
            <p className='big-number'>{averageRating}</p>
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
              data={Chart(chartData)}
              options={{ animation: { duration: 0 } }}
            />
          </Col>
        </Row>
      </Card.Text>
    </Card>
  );
};

export default ReviewStats;
