import React from 'react';
import {
  Container, Card, Row, Col,
} from 'react-bootstrap';
import { IHomeEarningStats } from '../../lib/interfaces';

interface IProps {
  earningsStats: IHomeEarningStats;
}

const EarningsStatsCard: React.FC<IProps> = ({ earningsStats = {} }) => {
  const { allTimeEarnings = 0, thisMonthEarnings = 0, leaderboardRank = 0 } = earningsStats;
  return (
    <Card className='mb-3'>
      <Container className='py-3'>
        <h2>Earnings Stats</h2>
        <Row className='mt-3'>
          <Col md='4' sm='4' className='text-center mb-2'>
            <h3 className='big-number'>
              $
              {thisMonthEarnings}
            </h3>
            <span>This Month&apos;s Earnings</span>
          </Col>
          <Col md='4' sm='4' className='text-center mb-2'>
            <h3 className='big-number'>
              $
              {allTimeEarnings}
            </h3>
            <span>All Time Earnings</span>
          </Col>
          <Col md='4' sm='4' className='text-center mb-2'>
            <h3 className='big-number'>{leaderboardRank}</h3>
            <span>Leaderboard Rank</span>
          </Col>
        </Row>
      </Container>
    </Card>
  );
};

export default EarningsStatsCard;
