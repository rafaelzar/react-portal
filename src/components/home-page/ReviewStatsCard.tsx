import React from 'react';
import {
  Container, Card, Row, Col,
} from 'react-bootstrap';
import { IHomeReviewStats } from '../../lib/interfaces';

interface IProps {
  stats: IHomeReviewStats;
}

const ReviewStatsCard: React.FC<IProps> = ({ stats = {} }) => {
  const { mentionsThisMonth = 0, mentionsAllTime = 0, averageRatingAllTime = 0 } = stats;
  return (
    <Card className='mb-3'>
      <Container className='py-3'>
        <h2>Review Stats</h2>
        <Row className='mt-3'>
          <Col md='4' sm='4' xs='4' className='text-center mb-2'>
            <h3 className='big-number xs-normal'>{mentionsThisMonth}</h3>
            <span>This Month&apos;s Mentions</span>
          </Col>
          <Col md='4' sm='4' xs='4' className='text-center mb-2'>
            <h3 className='big-number xs-normal'>{mentionsAllTime}</h3>
            <span>All Time Mentions</span>
          </Col>
          <Col md='4' sm='4' xs='4' className='text-center mb-2'>
            <h3 className='big-number xs-normal'>{averageRatingAllTime.toFixed(2)}</h3>
            <span>Average Review Rating</span>
          </Col>
        </Row>
      </Container>
    </Card>
  );
};

export default ReviewStatsCard;
