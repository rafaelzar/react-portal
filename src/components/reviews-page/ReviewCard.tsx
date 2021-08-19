import React from 'react';
import moment from 'moment';
import { IEmployeeReviews } from '../../lib/interfaces';
import StarResolver from './StarResolver';

interface IProps {
  data: IEmployeeReviews;
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
          <div>{moment(data.date).format('LL')}</div>
          <div className='d-flex align-items-center'>
            <span>{data.rating}</span>
            <span className='mx-2'>{data.platform}</span>
            <div>
              <StarResolver rating={data.rating} />
            </div>
          </div>
        </div>
      </div>
      <div className='review-card-body'>
        <p>{data.content}</p>
      </div>
      <div className='review-card-footer'>
        <span>{data.author}</span>
        <span> (612) 258-2151</span>
      </div>
    </div>
  );
};

export default ReviewCard;
