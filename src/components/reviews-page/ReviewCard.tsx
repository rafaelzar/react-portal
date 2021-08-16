import React from 'react';

interface IProps {
  name: string,
  date: string,
  body?: string
  rating: number
}

const ReviewCard: React.FC<IProps> = ({
  name, date, body, rating,
}) => {
  return (
    <div className='review-card'>
      <div className='review-card-header'>
        <div className='header-border' />
        <div className='d-flex justify-content-between mb-3 review-card-body'>
          <div>{date}</div>
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
