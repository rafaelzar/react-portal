import React from 'react';
import star from '../../lib/assets/img/star.svg';
import blankStar from '../../lib/assets/img/star-empty.svg';
import halfStar from '../../lib/assets/img/half-star.svg';

interface IProps {
  rating: number,
}

const StarResolver: React.FC<IProps> = ({ rating = 5 }) => {
  const stars = [];
  const maxRating = 5;
  const diffRating = maxRating - rating;
  const isThereAHalfStar = diffRating !== Math.round(diffRating);
  for (let i = 0; i < rating; i += 1) {
    stars.push(<img src={star} alt='rating star' className='star' />);
  }
  if (isThereAHalfStar)
    stars[stars.length - 1] = <img src={halfStar} alt='rating star' className='star' />;
  if (stars.length !== maxRating) {
    const missingStarsNumber = maxRating - stars.length;
    for (let i = 0; i < missingStarsNumber; i += 1) {
      stars.push(<img src={blankStar} alt='rating star' className='star' />);
    }
  }
  return <span>{stars}</span>;
};

export default StarResolver;
