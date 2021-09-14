import React from 'react';
import {
  Container, Row, Col, Button, Table,
} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { DateRangePicker } from 'react-date-range';
import { subDays } from 'date-fns';
import DefaultLayout from '../../layout/DefaultLayout';
import { fetchIdTokenCognitoFunction } from '../../lib/aws/aws-cognito-functions';

const PaymentPage: React.FC = () => {
  const history = useHistory();
  const [toggleDatePicker, setToggleDatePicker] = React.useState(false);
  const datePickerDropdownRefDateInput = React.useRef<HTMLDivElement>(null);
  const [dateRange, setDateRange] = React.useState({
    start: `${moment(subDays(new Date(), 7)).format('MMM DD')}`,
    end: `${moment(new Date()).format('MMM DD')}`,
  });

  React.useEffect(() => {
    async function fetchIdToken() {
      const idToken = await fetchIdTokenCognitoFunction();
      if (idToken === false) {
        history.push('/login');
      }
    }
    fetchIdToken();
  }, [history]);

  const tableData = [
    {
      _id: '8f00fe0397c16035f8ca790f72fa8991',
      date: '2021-05-28T01:45:05Z',
      description: 'Deposit - Google Review',
      amount: 15,
    },
    {
      _id: 'ce7e82c10ce564a905d9c9694d7c3357',
      date: '2021-06-02T14:51:45Z',
      description: 'Deposit - Weedmaps Review',
      amount: 25,
    },
    {
      _id: 'd1c11650f946bbfec3a726adebd9be4c',
      date: '2021-07-25T01:45:05Z',
      description: 'Deposit - Eyerate Review',
      amount: 35,
    },
  ];

  return (
    <DefaultLayout>
      <Container fluid>
        <h2>Revenue History</h2>
        <div className='d-flex justify-content-between my-3'>
          <div className='d-flex align-items-center'>
            <span className='mr-2'>Statement Period</span>
            <div
              className='date-range-btn custom-dropdown'
              onClick={() => setToggleDatePicker(!toggleDatePicker)}
              ref={datePickerDropdownRefDateInput}
            >
              <span>{dateRange.start}</span>
              {' '}
              -
              {' '}
              <span>{dateRange.end}</span>
            </div>
          </div>
          <Button>EXPORT CSV</Button>
        </div>
        <Row>
          <Col>
            <Table responsive>
              <thead className='thead-dark'>
                <tr>
                  <th className='pointer text-left'>Date</th>
                  <th scope='col'>Description</th>
                  <th className='text-right' scope='col'>
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className='list'>
                {tableData?.map(td => (
                  <tr key={`${td?._id}`}>
                    <th scope='row' className='text-left'>
                      <span className='mb-0 text-sm'>{moment(td?.date).format('MMM DD YYYY')}</span>
                    </th>
                    <td>
                      {td?.description}
                    </td>
                    <td className='text-right'>
                      {td?.amount}
                      <span>$</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </DefaultLayout>
  );
};

export default PaymentPage;
