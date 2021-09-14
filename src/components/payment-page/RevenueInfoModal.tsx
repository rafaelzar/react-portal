import React from 'react';
import { Modal } from 'react-bootstrap';
import { IReviews } from '../../lib/interfaces';
import moment from 'moment';

interface IProps {
  data: IReviews;
  showModal: boolean;
  setShowModal: (arg: boolean) => void;
}

const RevenueInfoModal: React.FC<IProps> = ({
  data,
  showModal,
  setShowModal,
}) => {
  const {
    date, platform, author, content, rating,
  } = data;

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Review Summary</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='font-weight-bold'>Review Date</div>
        <span className='text-secondary'>
          {moment(date).format('MMM DD YYYY')}
        </span>
        <div className='font-weight-bold mt-3'>Review Site</div>
        <span className='text-secondary'>{platform}</span>
        <div className='font-weight-bold mt-3'>Guest</div>
        <span className='text-secondary'>{author}</span>
        <div className='font-weight-bold mt-3'>Rating</div>
        <span className='text-secondary'>{rating}</span>
        <div className='font-weight-bold mt-3'>Review</div>
        <span className='text-secondary'>{content}</span>
      </Modal.Body>
    </Modal>
  );
};

export default RevenueInfoModal;
