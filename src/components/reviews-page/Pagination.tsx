import React from 'react';
import { Pagination } from 'react-bootstrap';

interface IProps {
  pageCount: number;
  currentPage: number;
  handlePaginationClick: (e: React.SyntheticEvent, page: number) => void;
}

const PaginationComponent: React.FC<IProps> = (props) => {
  const { handlePaginationClick, currentPage, pageCount } = props;
  return (
    <Pagination>
      <Pagination.Prev
        onClick={(e) => handlePaginationClick(e, currentPage - 1)}
        disabled={currentPage === 1}
      />
      <Pagination.Next
        onClick={(e) => handlePaginationClick(e, currentPage + 1)}
        disabled={pageCount === currentPage}
      />
    </Pagination>
  );
};

export default PaginationComponent;
