import React from 'react';
import { Container, Card } from 'react-bootstrap';
import moment from 'moment';
import { IEmployeeEarningsDetails } from '../../lib/interfaces';

interface IProps {
  data: IEmployeeEarningsDetails;
}

const EarningDetails: React.FC<IProps> = ({ data }) => {
  const {
    earningsAvailable = 0,
    lastPayment = 0,
    lastPaymentDate = null,
  } = data;
  return (
    <Card className='mb-3'>
      <Container className='my-3'>
        <h2 className='big-h2'>Payment Settings</h2>
        <span className='font-weight-bold'>Balance</span>
        <div className='big-number'>
          $
          {earningsAvailable.toFixed(2)}
        </div>
        <div className='horizontal-line my-3' />
        <span className='font-weight-bold'>Last Payment</span>
        {lastPayment !== 0 && lastPaymentDate !== null ? (
          <p>
            $
            {lastPayment.toFixed(2)}
            {' '}
            on
            {' '}
            {moment(lastPaymentDate).format('MMM DD YYYY')}
          </p>
        ) : (
          <p>There are no payments.</p>
        )}
      </Container>
    </Card>
  );
};

export default EarningDetails;
