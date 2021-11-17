import React from 'react';
import { Container, Card, Spinner } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import ReviewCard from '../reviews-page/ReviewCard';
import { IEmployeeReviews } from '../../lib/interfaces';

interface IProps {
  reviewsData: IEmployeeReviews[];
  fetchMore: () => void;
  hasMore: boolean;
}

const ReviewMentionsCard: React.FC<IProps> = ({
  reviewsData,
  fetchMore,
  hasMore,
}) => {
  return (
    <Card className='mb-3'>
      <Container className='py-3'>
        <div className='review-mentions-card-header'>
          <h2 className='mb-0'>Review Mentions</h2>
        </div>
        <div className='mt-3'>
          {reviewsData && reviewsData.length > 0 ? (
            <InfiniteScroll
              dataLength={reviewsData.length}
              next={fetchMore}
              hasMore={hasMore}
              loader={<Spinner className='d-block mx-auto my-4' animation='border' />}
              style={{ maxHeight: 500 }}
            >
              {reviewsData.map((r) => <ReviewCard key={r._id} data={r} />)}
            </InfiniteScroll>
          ) : (
            <div className='m-auto text-center'>No reviews yet</div>
          )}
        </div>
      </Container>
    </Card>
  );
};

export default ReviewMentionsCard;
