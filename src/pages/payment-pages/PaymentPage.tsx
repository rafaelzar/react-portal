import React from 'react';
import {
  Container, Row, Col, Button, Table,
} from 'react-bootstrap';
import { useAppDispatch } from '../../store/store';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { DateRangePicker } from 'react-date-range';
import { subDays } from 'date-fns';
import DefaultLayout from '../../layout/DefaultLayout';
import { fetchIdTokenCognitoFunction } from '../../lib/aws/aws-cognito-functions';
import { IDatePicker, IRevenueHistory } from '../../lib/interfaces';
import { getEmployeesRevenueHistoryPaymentAction } from '../../store/actions/paymentActions';

const PaymentPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [revenueInfo, setRevenueInfo] = React.useState<IRevenueHistory[]>([]);
  const [toggleDatePicker, setToggleDatePicker] = React.useState(false);
  const [paidDates, setPaidDates] = React.useState<Array<any>>([]);
  const [dateRange, setDateRange] = React.useState({
    start: `${moment(subDays(new Date(), 7)).format('MMM DD')}`,
    end: `${moment(new Date()).format('MMM DD')}`,
  });
  const [dateRangeQuery, setDateRangeQuery] = React.useState({
    start: `${moment(subDays(new Date(), 7)).format('YYYY-MM-DD')}`,
    end: `${moment(new Date()).format('YYYY-MM-DD')}`,
  });
  const [dateState, setDateState] = React.useState<IDatePicker[]>([
    {
      startDate: subDays(new Date(), 7),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  const datePickerDropdownRefDateInput = React.useRef<HTMLDivElement>(null);
  const datePickerDropdownRef = React.useRef<HTMLDivElement>(null);

  // const userID = '607a1d65e4be5100126b827e';
  const userID = '60261996b55f7d0012ba8104';

  React.useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent | TouchEvent) => {
      const isClickedOutsideOfAnyDropdowns = toggleDatePicker
        && datePickerDropdownRef.current
        && !datePickerDropdownRef.current.contains(e.target as Node)
        && datePickerDropdownRefDateInput.current
        && !datePickerDropdownRefDateInput.current.contains(e.target as Node);
      if (isClickedOutsideOfAnyDropdowns) {
        setToggleDatePicker(false);
      }
    };
    document.addEventListener('mousedown', checkIfClickedOutside);
    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [toggleDatePicker]);

  React.useEffect(() => {
    async function fetchIdToken() {
      const idToken = await fetchIdTokenCognitoFunction();
      if (idToken === false) {
        history.push('/login');
      }
    }
    fetchIdToken();

    const query = `${userID}?startDate=${dateRangeQuery.start}&endDate=${dateRangeQuery.end}`;
    dispatch(getEmployeesRevenueHistoryPaymentAction(query)).then(
      (res: Array<IRevenueHistory>) => {
        if (res) {
          console.log(res);
          setRevenueInfo(res);
          const objectsByStatusPaid = res.map((r) => {
            const eventsArray = r.events.find(e => e.status === 'PAID');
            return eventsArray;
          });
          // const datesByStatusPaid = objectsByStatusPaid.map(d => d?.date);
          console.log(objectsByStatusPaid);
          setPaidDates(objectsByStatusPaid);
        }
      },
    );
  }, [dispatch, history, dateRangeQuery]);

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

  const setDateRangeFilter = () => {
    setDateRange((prevState) => ({
      ...prevState,
      start: moment(dateState.map((d) => d.startDate).toString()).format(
        'MMM DD',
      ),
      end: moment(dateState.map((d) => d.endDate).toString()).format('MMM DD'),
    }));
    setDateRangeQuery((prevState) => ({
      ...prevState,
      start: moment(dateState.map((d) => d.startDate).toString()).format(
        'YYYY-MM-DD',
      ),
      end: moment(dateState.map((d) => d.endDate).toString()).format(
        'YYYY-MM-DD',
      ),
    }));
    setToggleDatePicker(!toggleDatePicker);
  };

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
        <div
          className={`date-picker-wrapp payment-page ${
            toggleDatePicker ? 'd-block' : ''
          }`}
          ref={datePickerDropdownRef}
        >
          <DateRangePicker
            onChange={(item) => setDateState([item.selection])}
            inputRanges={[]}
            // staticRanges={[]}
            showDateDisplay={false}
            showMonthAndYearPickers={false}
            moveRangeOnFirstSelection={false}
            maxDate={new Date()}
            ranges={dateState}
            direction='vertical'
          />
          <Col md={12} className='mb-4'>
            <Button className='w-100' onClick={setDateRangeFilter}>
              Filter
            </Button>
          </Col>
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
                {revenueInfo?.map((td) => (
                  <tr key={`${td?.check_id}`}>
                    <th scope='row' className='text-left'>
                      <span className='mb-0 text-sm'>
                        {moment(paidDates?.map(e => e.date).toString()).format('MMM DD YYYY')}
                      </span>
                    </th>
                    <td>Withdrawal</td>
                    <td className='text-right'>
                      <span>-$</span>
                      {td?.amount}
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
