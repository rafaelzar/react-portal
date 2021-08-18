import React from 'react';
import moment from 'moment';

interface IProps {
  author: string;
  date: string;
  content: string;
  rating: number;
  platform: string;
}

const ReviewCard: React.FC<IProps> = ({
  author,
  date,
  content,
  rating,
  platform,
}) => {
  return (
    <div className='review-card'>
      <div className='review-card-header'>
        <div
          className={`header-border ${
            rating < 3 ? 'negative-review-color' : ''
          }`}
        />
        <div className='d-flex justify-content-between mb-3 review-card-body'>
          <div>{moment(date).format('LL')}</div>
          <div>
            <span>{rating}</span>
            {' '}
            {platform}
          </div>
        </div>
      </div>
      <div className='review-card-body'>
        <p>{content}</p>
      </div>
      <div className='review-card-footer'>
        <span>{author}</span>
        <span> (612) 258-2151</span>
      </div>
    </div>
  );
};

export default ReviewCard;
