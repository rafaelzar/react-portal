import React from 'react';
import moment from 'moment';
import { Badge } from 'react-bootstrap';
import { IEmployeeReviews } from '../../lib/interfaces';
import StarResolver from './StarResolver';

interface IProps {
  data: IEmployeeReviews;
}

const PAID_PLATFORMS = ['google', 'weedmaps'];

const ReviewCard: React.FC<IProps> = ({ data }) => {
  return (
    <div className='review-card'>
      <div className='review-card-header'>
        <div
          className={`header-border ${
            data.rating < 3 ? 'negative-review-color' : ''
          }`}
        />
        <div className='mb-3 d-flex justify-content-between review-card-body'>
          <div className='d-flex align-items-center'>
            {moment(data.created_at).format('LL')}
            {data.is_new && <Badge pill variant='info' className='ml-1'>new</Badge>}
          </div>
          <div className='d-flex align-items-center'>
            {data.platform && PAID_PLATFORMS.includes(data.platform.toLocaleLowerCase()) && (
              <span>💵</span>
            )}
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
        <span>{data.name}</span>
      </div>
    </div>
  );
};

export default ReviewCard;
