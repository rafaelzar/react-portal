import React from 'react';
import {
  Container, Card, Row, Col
} from 'react-bootstrap';
import { IHomeEarningStats } from '../../lib/interfaces';

interface IProps {
  earningsStats: IHomeEarningStats;
}

const EarningsAvailableCard: React.FC<IProps> = ({ earningsStats = {} }) => {
  const {
    allTimeEarnings = 0, lastPayment = 0, thisMonthEarningsUnpaid = 0
  } = earningsStats;
  return (
    <Card className='mb-3'>
      <Container className='py-3'>
        <h2 className='mb-0'>Earnings Summary 💰</h2>
        <Row>
          <Col md='4' sm='4' xs='4' className='text-center'>
            <h3 className='big-number xs-normal'>
              $
              {allTimeEarnings.toFixed(2)}
            </h3>
            <p>
              All Time Earnings
            </p>
          </Col>
          <Col md='4' sm='4' xs='4' className='text-center'>
            <h3 className='big-number xs-normal'>
              $
              {lastPayment.toFixed(2)}
            </h3>
            <p>
              Paid Out
            </p>
          </Col>
          <Col md='4' sm='4' xs='4' className='text-center'>
            <h3 className='big-number xs-normal'>
              $
              {thisMonthEarningsUnpaid.toFixed(2)}
            </h3>
            <p>
              Rollover to Next Month
            </p>
          </Col>
        </Row>
      </Container>
    </Card>
  );
};

export default EarningsAvailableCard;
