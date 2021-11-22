import React from 'react';
import { Container, Card, Spinner } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import FeedbackCard from '../feedback-page/FeedbackCard';
import { IEmployeeFeedback } from '../../lib/interfaces';

interface IProps {
  feedbackData: IEmployeeFeedback[];
  fetchMore: () => void;
  hasMore: boolean;
}

const FeedbackMentionsCard: React.FC<IProps> = ({
  feedbackData,
  fetchMore,
  hasMore,
}) => {
  return (
    <Card className='mb-3'>
      <Container className='py-3'>
        <div className='review-mentions-card-header'>
          <h2 className='mb-0'>Your Customer Feedback Collected through EyeRate</h2>
        </div>
        <div className='mt-3'>
          {feedbackData && feedbackData.length > 0 ? (
            <InfiniteScroll
              dataLength={feedbackData.length}
              next={fetchMore}
              hasMore={hasMore}
              loader={<Spinner className='d-block mx-auto my-4' animation='border' />}
              style={{ maxHeight: 500 }}
            >
              {feedbackData.map((r) => <FeedbackCard key={r._id} data={r} />)}
            </InfiniteScroll>
          ) : (
            <div className='m-auto text-center'>No feedback yet</div>
          )}
        </div>
      </Container>
    </Card>
  );
};

export default FeedbackMentionsCard;
