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
    lastPayment = 0, prevMonthEarningsUnpaid = 0, thisMonthEarningsUnpaid = 0
  } = earningsStats;
  return (
    <Card className='mb-3'>
      <Container className='py-2'>
        <h2 className='mb-0'>Earnings Summary 💰</h2>
        <Row>
          <Col md='4' sm='4' xs='4' className='text-center'>
            <h3 className='big-number xs-normal'>
              $
              {lastPayment.toFixed(2)}
            </h3>
            <p>
              Last Payment
            </p>
          </Col>
          <Col md='4' sm='4' xs='4' className='text-center'>
            <h3 className='big-number xs-normal'>
              $
              {prevMonthEarningsUnpaid.toFixed(2)}
            </h3>
            <p>
              Rollover from Last Month
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
