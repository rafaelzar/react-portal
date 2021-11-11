import React from 'react';
import { Container, Card, Spinner } from 'react-bootstrap';
import ReviewCard from '../reviews-page/ReviewCard';
import { IEmployeeReviews } from '../../lib/interfaces';

interface IProps {
  reviewsData: IEmployeeReviews[];
  setDateRangeForReviews: (arg: number) => void;
  dateRangeLabel: string;
  loadRevews: boolean;
}

const ReviewMentionsCard: React.FC<IProps> = ({
  reviewsData,
  setDateRangeForReviews,
  dateRangeLabel,
  loadRevews,
}) => {
  const [reviews, setReviews] = React.useState<IEmployeeReviews[]>([]);
  const [toggleDateSortDropdown, setToggleDateSortDropdown] = React.useState(
    false,
  );
  const dateSortDropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setReviews(reviewsData);
    const checkIfClickedOutside = (e: MouseEvent | TouchEvent) => {
      const isClickedOutsideOfAnyDropdowns = toggleDateSortDropdown
        && dateSortDropdownRef.current
        && !dateSortDropdownRef.current.contains(e.target as Node);
      if (isClickedOutsideOfAnyDropdowns) {
        setToggleDateSortDropdown(false);
      }
    };
    document.addEventListener('mousedown', checkIfClickedOutside);
    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [toggleDateSortDropdown, reviewsData]);

  const handleDateSortDropdownChange = (arg: number) => {
    setDateRangeForReviews(arg);
  };

  return (
    <Card className='mb-3'>
      <Container className='py-3'>
        <div className='review-mentions-card-header'>
          <h2>Review Mentions</h2>
          <div
            className='date-range-btn custom-dropdown d-flex align-items-center'
            onClick={() => {
              setToggleDateSortDropdown(!toggleDateSortDropdown);
            }}
            ref={dateSortDropdownRef}
          >
            {/* {dateSortDropdownValue} */}
            {dateRangeLabel}
            <div className='arrow-wrapp'>
              <i className='arrow down' />
            </div>
            <div
              className={`custom-dropdown-menu home ${
                toggleDateSortDropdown ? 'd-block' : ''
              }`}
            >
              <div
                className='custom-dropdown-item'
                onClick={() => handleDateSortDropdownChange(7)}
              >
                Last 7 Days
              </div>
              <div
                className='custom-dropdown-item'
                onClick={() => handleDateSortDropdownChange(30)}
              >
                Last 30 Days
              </div>
              <div
                className='custom-dropdown-item'
                onClick={() => handleDateSortDropdownChange(90)}
              >
                Last 90 Days
              </div>
              <div
                className='custom-dropdown-item'
                onClick={() => handleDateSortDropdownChange(180)}
              >
                Last 180 Days
              </div>
              <div
                className='custom-dropdown-item'
                onClick={() => handleDateSortDropdownChange(365)}
              >
                Last 365 Days
              </div>
            </div>
          </div>
        </div>
        <div className='mt-3'>
          {!loadRevews ? (
            <>
              {reviews && reviews.length > 0 ? (
                reviews?.map((r) => <ReviewCard key={r._id} data={r} />)
              ) : (
                <div className='m-auto text-center'>No reviews on this dates</div>
              )}
            </>
          ) : (
            <Spinner className='d-block m-auto' animation='border' />
          )}
        </div>
      </Container>
    </Card>
  );
};

export default ReviewMentionsCard;
