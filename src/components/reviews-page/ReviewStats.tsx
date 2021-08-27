import React from 'react';
import {
  Row, Col, Card, ProgressBar,
} from 'react-bootstrap';
import { Doughnut } from 'react-chartjs-2';
import { Chart } from './Chart';
import { IReviewStats } from '../../lib/interfaces';

interface IProps {
  stats: IReviewStats;
}

const ReviewStats: React.FC<IProps> = ({ stats }) => {
  const {
    numberOfReviews, averageRating, starsData, chartData,
  } = stats;

  const parseStarsIntoNumber = (percent: number) => {
    const amountOfReviews = (percent / 100) * (numberOfReviews || 100);

    return `${Math.round(amountOfReviews)}`;
  };

  return (
    <Card className='p-3'>
      <Card.Title>
        <h3>Review Stats</h3>
      </Card.Title>
      {numberOfReviews !== 0 ? (
        <Card.Text>
          <Row>
            <Col md={6}>
              <p className='font-weight-bold'>New reviews</p>
              <p className='big-number'>{numberOfReviews}</p>
            </Col>
            <Col md={6}>
              <p className='font-weight-bold'>Average Rating</p>
              <p className='big-number'>{averageRating?.toFixed(2)}</p>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <p className='font-weight-bold'>Star Distribution</p>
              <div className='mb-4'>
                {starsData?.map((stars) => (
                  <div key={stars.stars} className='stars-bar-wrapp mb-2'>
                    <span>
                      {stars.stars}
                      {' '}
                      Star
                    </span>
                    <ProgressBar
                      className='star-bar'
                      now={stars.percent}
                    />
                    {' '}
                    {parseStarsIntoNumber(stars.percent)}
                  </div>
                ))}
              </div>
            </Col>
          </Row>
          <Row>
            {chartData && (
              <Col md={12}>
                <p className='font-weight-bold'>Site Distribution</p>
                <Doughnut
                  data={Chart(chartData)}
                  options={{ animation: { duration: 0 } }}
                />
              </Col>
            )}
          </Row>
        </Card.Text>
      ) : (
        <div>No reviews with this criteria</div>
      )}
    </Card>
  );
};

export default ReviewStats;
