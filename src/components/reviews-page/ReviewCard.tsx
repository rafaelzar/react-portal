import React from 'react';
import moment from 'moment';

interface IProps {
  name: string,
  date: string,
  body: string,
  rating: number,
  type?: string,
}

const ReviewCard: React.FC<IProps> = ({
  name, date, body, rating, type,
}) => {
  return (
    <div className='review-card'>
      <div className='review-card-header'>
        <div className={`header-border ${type === 'Negative' ? 'negative-review-color' : ''}`} />
        <div className='d-flex justify-content-between mb-3 review-card-body'>
          <div>{moment(date).format('LL')}</div>
          <div>
            <span>{rating}</span>
            {' '}
            Google
          </div>
        </div>
      </div>
      <div className='review-card-body'>
        <p>
          {body}
        </p>
      </div>
      <div className='review-card-footer'>
        <span>{name}</span>
        <span>(612) 258-2151</span>
      </div>
    </div>
  );
};

export default ReviewCard;
