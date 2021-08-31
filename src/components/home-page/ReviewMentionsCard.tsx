import React from 'react';
import { Container, Card } from 'react-bootstrap';
import ReviewCard from '../reviews-page/ReviewCard';
import { IEmployeeReviews } from '../../lib/interfaces';

interface IProps {
  reviewsData: IEmployeeReviews[];
}

const ReviewMentionsCard: React.FC<IProps> = ({ reviewsData }) => {
  const [reviews, setReviews] = React.useState<IEmployeeReviews[]>([]);
  const [dateSortDropdownValue, setDateSortDropdownValue] = React.useState(
    'Last 7 Days',
  );
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

  const handleDateSortDropdownChange = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLElement;
    setDateSortDropdownValue(target.innerText);
  };

  return (
    <Card className='mb-3'>
      <Container className='py-3'>
        <div className='d-flex justify-content-between'>
          <h2>Review Mentions</h2>
          <div
            className='date-range-btn custom-dropdown d-flex align-items-center'
            onClick={() => {
              setToggleDateSortDropdown(!toggleDateSortDropdown);
            }}
            ref={dateSortDropdownRef}
          >
            {dateSortDropdownValue}
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
                onClick={(e) => handleDateSortDropdownChange(e)}
              >
                Last 7 Days
              </div>
              <div
                className='custom-dropdown-item'
                onClick={(e) => handleDateSortDropdownChange(e)}
              >
                Last 30 Days
              </div>
            </div>
          </div>
        </div>
        <div className='mt-3'>
          {reviews.length > 0 ? (
            reviews?.map((r) => <ReviewCard key={r._id} data={r} />)
          ) : (
            <div className='m-auto'>No reviews with this criteria</div>
          )}
        </div>
      </Container>
    </Card>
  );
};

export default ReviewMentionsCard;
