import React from 'react';
import moment from 'moment';
import { IEmployeeFeedback } from '../../lib/interfaces';
import StarResolver from '../reviews-page/StarResolver';

interface IProps {
  data: IEmployeeFeedback;
}

const ReviewCard: React.FC<IProps> = ({ data }) => {
  return (
    <div className='review-card'>
      <div className='review-card-header'>
        <div
          className={`header-border ${
            data.rating < 3 ? 'negative-review-color' : ''
          }`}
        />
        <div className='d-flex justify-content-between mb-3 review-card-body'>
          <div>{moment(data.created_at).format('LL')}</div>
          <div className='d-flex align-items-center'>
            <div>
              <StarResolver rating={data.rating} />
            </div>
          </div>
        </div>
      </div>
      <div className='review-card-body'>
        {data.messages?.map((message) => (
          <React.Fragment key={message.date}>
            <p>{message.content}</p>
          </React.Fragment>
        ))}
      </div>
      <div className='review-card-footer'>
        <span>{data.customer?.[0]?.name}</span>
      </div>
    </div>
  );
};

export default ReviewCard;
