import React from 'react';
import { Pagination } from 'react-bootstrap';

interface IProps {
  disableNextPagination: boolean;
  disablePrevPagination: boolean;
  handlePaginationNext: (e: React.SyntheticEvent) => void;
  handlePaginationPrev: (e: React.SyntheticEvent) => void;
}

const PaginationComponent: React.FC<IProps> = (props) => {
  const {
    handlePaginationNext,
    handlePaginationPrev,
    disableNextPagination,
    disablePrevPagination,
  } = props;
  return (
    <Pagination className='m-auto'>
      <Pagination.Prev
        onClick={(e) => handlePaginationPrev(e)}
        disabled={disablePrevPagination}
      />
      <Pagination.Next
        onClick={(e) => handlePaginationNext(e)}
        disabled={disableNextPagination}
      />
    </Pagination>
  );
};

export default PaginationComponent;
