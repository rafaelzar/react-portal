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
import {
  IDatePicker,
  IRevenueHistory,
  IRevenueDetails,
  IReviews,
} from '../../lib/interfaces';
import { getEmployeesRevenueHistoryPaymentAction } from '../../store/actions/paymentActions';
import RevenueInfoModal from '../../components/payment-page/RevenueInfoModal';
import reviewIcon from '../../lib/assets/img/review.png';
import { getUserIDSelector } from '../../store/selectors/selectors';
import { useSelector } from 'react-redux';

const PaymentPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const [revenueInfo, setRevenueInfo] = React.useState<IRevenueDetails[]>([]);
  const [toggleDatePicker, setToggleDatePicker] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [activeRevenueReview, setActiveRevenueReview] = React.useState<
    IReviews
  >({} as IReviews);
  const defaultStartDate = '1970-01-01';
  const [dateRangeQuery, setDateRangeQuery] = React.useState({
    start: defaultStartDate,
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

  // ! Uncomment this line and import line in order to see real data for the current employee
  const userId = useSelector((state) => getUserIDSelector(state));
  // const userID = '607a1d65e4be5100126b827e';
  // const userID = '5f876451946f720b216ca65b';

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

    const query = `${userId}?startDate=${dateRangeQuery.start}&endDate=${dateRangeQuery.end}`;
    dispatch(getEmployeesRevenueHistoryPaymentAction(query)).then(
      (res: Array<IRevenueHistory>) => {
        if (res) {
          const resParsed: Array<IRevenueDetails> = res.map((r) => {
            if (r.check_id) {
              return {
                _id: r._id,
                amount: r.amount.toFixed(2),
                description: 'Withdrawal',
                date: r.events
                  ?.filter((da) => da.status === 'PAID')
                  .map((d) => d.date)
                  .toString(),
                check_id: r.check_id,
              };
            } else {
              return {
                _id: r._id,
                amount: r.amount.toFixed(2),
                description: `Deposit - ${r.platform} Review`,
                date: r.date,
                review: r.review,
                platform: r.platform,
              };
            }
          });
          setRevenueInfo(resParsed);
        }
      },
    );
  }, [dispatch, history, dateRangeQuery, userId]);

  const setDateRangeFilter = () => {
    setDateRangeQuery((prevState) => ({
      ...prevState,
      start: moment(dateState[0]?.startDate).format('YYYY-MM-DD'),
      end: moment(dateState[0]?.endDate).format('YYYY-MM-DD'),
    }));
    setToggleDatePicker(!toggleDatePicker);
  };

  const getCsvData = () => {
    const data = revenueInfo?.map((d) => {
      return {
        Date: moment(d.date).format('MMM DD YYYY'),
        Description: d.description,
        'Amount($)': `${d.check_id ? '-$' : '+$'} ${d.amount}`,
      };
    });
    return data;
  };

  return (
    <DefaultLayout>
      <Container fluid>
        <h2>Revenue History</h2>
        <div className='revenue-header-wrapp my-3'>
          <div className='statement-period-wrapp'>
            <span className='mr-2'>Statement Period</span>
            <div
              className='date-range-btn custom-dropdown payment-page'
              onClick={() => setToggleDatePicker(!toggleDatePicker)}
              ref={datePickerDropdownRefDateInput}
            >
              {dateRangeQuery.start === defaultStartDate ? <span>All time</span> : (
                <span>
                  {moment(dateRangeQuery.start).format('MMM DD')}
                  {' '}
                  -
                  {' '}
                  {moment(dateRangeQuery.end).format('MMM DD')}
                </span>
              )}
            </div>
          </div>
          {revenueInfo.length < 1 ? (
            <Button disabled={revenueInfo.length < 1}> Export CSV </Button>
          ) : (
            <CSVLink
              filename={`EyeRate_Revenue_${moment(new Date()).format(
                'MM-DD-YYYY',
              )}.csv`}
              data={getCsvData()}
            >
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
            <Table striped bordered responsive>
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
                    <tr
                      key={`${singleRevenue?._id}`}
                      className={`${singleRevenue.review ? 'pointer' : ''}`}
                      onClick={() => {
                        if (singleRevenue.review) {
                          setShowModal(true);
                          setActiveRevenueReview(singleRevenue.review);
                        }
                      }}
                    >
                      <th scope='row' className='text-left'>
                        <span className='mb-0 text-sm'>
                          {moment(singleRevenue.date).format('MMM DD YYYY')}
                        </span>
                      </th>
                      <td>
                        {singleRevenue.description}
                        {singleRevenue.review && (
                          <img className='ml-3' src={reviewIcon} alt='review icon' />
                        )}
                      </td>
                      <td
                        className={`text-right ${
                          singleRevenue.check_id
                            ? 'text-danger'
                            : 'text-success'
                        }`}
                      >
                        <span>{singleRevenue.check_id ? '-$' : '+$'}</span>
                        {singleRevenue?.amount}
                      </td>
                    </tr>
                  ))
                ) : (
                  <div className='no-revenue-block'>No Data</div>
                )}
              </tbody>
            </Table>
            <RevenueInfoModal
              data={activeRevenueReview}
              showModal={showModal}
              setShowModal={setShowModal}
            />
          </Col>
        </Row>
      </Container>
    </DefaultLayout>
  );
};

export default PaymentPage;
