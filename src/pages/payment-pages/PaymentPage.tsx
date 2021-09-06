import React from 'react';
import {
  Container, Row, Col, Button, Table,
} from 'react-bootstrap';
import { useAppDispatch } from '../../store/store';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { DateRangePicker } from 'react-date-range';
import { subDays } from 'date-fns';
import { CSVLink } from 'react-csv';
import DefaultLayout from '../../layout/DefaultLayout';
import { fetchIdTokenCognitoFunction } from '../../lib/aws/aws-cognito-functions';
import { IDatePicker, IRevenueHistory } from '../../lib/interfaces';
import { getEmployeesRevenueHistoryPaymentAction } from '../../store/actions/paymentActions';

const PaymentPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const [revenueInfo, setRevenueInfo] = React.useState<IRevenueHistory[]>([]);
  const [infoForCsv, setInfoForCsv] = React.useState<{amount: number}[]>([]);
  const [toggleDatePicker, setToggleDatePicker] = React.useState(false);
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
        }
      },
    );
  }, [dispatch, history, dateRangeQuery]);

  const setDateRangeFilter = () => {
    setDateRangeQuery((prevState) => ({
      ...prevState,
      start: moment(dateState[0]?.startDate).format('YYYY-MM-DD'),
      end: moment(dateState[0]?.endDate).format('YYYY-MM-DD'),
    }));
    setToggleDatePicker(!toggleDatePicker);
  };

  const parsePaymentDate = (singleRevenue: IRevenueHistory) => {
    const { events = [] } = singleRevenue;
    const paidEvent = events.find((e) => e.status === 'PAID') || { date: '' };
    return moment(paidEvent.date).format('MMM DD YYYY');
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
              <span>{moment(dateRangeQuery.start).format('MMM DD')}</span>
              {' '}
              -
              {' '}
              <span>{moment(dateRangeQuery.end).format('MMM DD')}</span>
            </div>
          </div>
          {revenueInfo.length < 1 ? (
            <Button disabled={revenueInfo.length < 1}> Export CSV </Button>
          ) : (
            <CSVLink data={revenueInfo}>
              <Button>Export CSV</Button>
            </CSVLink>
          )}
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
                {revenueInfo && revenueInfo.length !== 0 ? (
                  revenueInfo?.map((singleRevenue) => (
                    <tr key={`${singleRevenue?.check_id}`}>
                      <th scope='row' className='text-left'>
                        <span className='mb-0 text-sm'>
                          {parsePaymentDate(singleRevenue)}
                        </span>
                      </th>
                      <td>Withdrawal</td>
                      <td className='text-right'>
                        <span>-$</span>
                        {singleRevenue?.amount}
                      </td>
                    </tr>
                  ))
                ) : (
                  <div className='no-revenue-block'>No Data</div>
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </DefaultLayout>
  );
};

export default PaymentPage;
