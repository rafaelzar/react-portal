import React from 'react';
import { Pagination } from 'react-bootstrap';

interface IProps {
  disableNextPagination: boolean;
  handlePaginationNext: (e: React.SyntheticEvent) => void;
}

const PaginationComponent: React.FC<IProps> = (props) => {
  const {
    handlePaginationNext,
    disableNextPagination,
    // disablePrevPagination,
  } = props;
  return (
    <Pagination>
      <Pagination.Prev />
      <Pagination.Next
        onClick={(e) => handlePaginationNext(e)}
        disabled={disableNextPagination}
      />
    </Pagination>
  );
};

export default PaginationComponent;
