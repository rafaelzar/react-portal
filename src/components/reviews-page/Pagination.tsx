import React from 'react';
import { Pagination } from 'react-bootstrap';

const PaginationComponent: React.FC = () => {
  return (
    <Pagination>
      <Pagination.Prev />
      <Pagination.Item>{1}</Pagination.Item>
      <Pagination.Next />
    </Pagination>
  );
};

export default PaginationComponent;
