import React from 'react';
import { Container, Card } from 'react-bootstrap';

const EarningsStatsCard: React.FC = () => {
  return (
    <Card className='mb-3'>
      <Container className='py-3'>
        <h2>Earnings Stats</h2>
        <div className='d-flex justify-content-between mt-3'>
          <div className='text-center'>
            <h3 className='big-number'>$80</h3>
            <span>This Month&apos;s</span>
          </div>
          <div className='text-center'>
            <h3 className='big-number'>$345</h3>
            <span>All Time Earnins</span>
          </div>
          <div className='text-center'>
            <h3 className='big-number'>2</h3>
            <span>Leaderboard Rank</span>
          </div>
        </div>
      </Container>
    </Card>
  );
};

export default EarningsStatsCard;
