import React from 'react';
import {
  Container, Card, Button, Row, Col
} from 'react-bootstrap';
import { IHomeEarningStats } from '../../lib/interfaces';
import { Link } from 'react-router-dom';

interface IProps {
  earningsStats: IHomeEarningStats;
}

const EarningsAvailableCard: React.FC<IProps> = ({ earningsStats = {} }) => {
  const {
    earningsAvailable = 0, lastPayment = 0, prevMonthEarningsUnpaid = 0, thisMonthEarningsUnpaid = 0
  } = earningsStats;
  return (
    <Card className='mb-3'>
      <Container className='py-3'>
        <h2>Earnings Available</h2>
        <Row>
          <Col md='4' sm='4' xs='4' className='text-center mb-2'>
            <h3 className='big-number xs-normal'>
              $
              {earningsAvailable.toFixed(2)}
            </h3>
            <p>
              Last Payment: $
              {lastPayment.toFixed(2)}
            </p>
          </Col>
          <Col md='4' sm='4' xs='4' className='text-center mb-2'>
            <h3 className='big-number xs-normal'>
              $
              {prevMonthEarningsUnpaid.toFixed(2)}
            </h3>
            <p>
              Rollover from Last Month
            </p>
          </Col>
          <Col md='4' sm='4' xs='4' className='text-center mb-2'>
            <h3 className='big-number xs-normal'>
              $
              {thisMonthEarningsUnpaid.toFixed(2)}
            </h3>
            <p>
              Rollover to Next Month
            </p>
          </Col>
        </Row>
        <div className='d-flex mt-3'>
          <Link to='/settings#payment' className='button-link'>
            <Button>PAYMENT SETTINGS</Button>
          </Link>
        </div>
      </Container>
    </Card>
  );
};

export default EarningsAvailableCard;
