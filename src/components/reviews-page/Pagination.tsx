import React from 'react';
import { Pagination } from 'react-bootstrap';

const PaginationComponent: React.FC = (props) => {
  const {
    goPrev, goNext, currentPage, pageCount,
  } = props;
  return (
    <Pagination>
      <Pagination.Prev onClick={goPrev} disabled={currentPage === 1} />
      <Pagination.Next onClick={goNext} disabled={pageCount === currentPage} />
    </Pagination>
  );
};

export default PaginationComponent;
