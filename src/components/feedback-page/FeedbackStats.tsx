import React from 'react';
import {
  Row, Col, Card, ProgressBar,
} from 'react-bootstrap';
import { IFeedbackStats } from '../../lib/interfaces';

interface IProps {
  stats: IFeedbackStats;
}

const FeedbackStats: React.FC<IProps> = ({ stats }) => {
  const {
    numberOfReviews, averageRating, starsData,
  } = stats;

  return (
    <Card className='p-3 mb-3'>
      <Card.Title>
        <h3>Feedback Stats</h3>
      </Card.Title>
      {numberOfReviews !== 0 && averageRating ? (
        <Card.Text>
          <Row>
            <Col md={6}>
              <p className='font-weight-bold'>Feedbacks</p>
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
                    <span>{stars.number}</span>
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </Card.Text>
      ) : (
        <div>No feedback with this criteria</div>
      )}
    </Card>
  );
};

export default FeedbackStats;
