import React, { useCallback, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Container,
  Button,
  Spinner,
} from 'react-bootstrap';
import EmployeePhoto from './EmployeePhoto';
import { getUserSelector, getUserIDSelector } from '../../store/selectors/selectors';
import { uploadEmployeePhotoAction, deleteEmployeePhotoAction } from '../../store/actions/settingsActions';
import { useAppDispatch } from '../../store/store';

const PhotoSettings: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState('');
  const photoRef = useRef<HTMLInputElement>(null);
  const userInfo = useSelector((state) => getUserSelector(state));
  const userId = useSelector((state) => getUserIDSelector(state));
  const dispatch = useAppDispatch();

  const uploadNewPhotoClick = useCallback(() => {
    photoRef.current?.click();
  }, []);

  const uploadNewPhoto = useCallback((e) => {
    const photo: Blob = e.target.files[0];
    setValue(e.target.value);

    if (photo) {
      setIsLoading(true);
      dispatch(uploadEmployeePhotoAction(userId, photo))
        .then(() => {
          setValue('');
          setIsLoading(false);
        });
    }
  }, [dispatch, userId]);

  const deletePhoto = useCallback(() => {
    setIsLoading(true);
    dispatch(deleteEmployeePhotoAction(userId))
      .then(() => setIsLoading(false));
  }, [dispatch, userId]);

  return (
    <Container fluid>
      <h5>Avatar</h5>

      <div className='d-flex align-items-center'>
        <EmployeePhoto userInfo={userInfo} className='mr-4' onClick={uploadNewPhotoClick}>
          {isLoading && <Spinner animation='border' variant='info' />}
        </EmployeePhoto>
        <input
          ref={photoRef}
          value={value}
          onChange={uploadNewPhoto}
          type='file'
          accept='image/*'
          style={{ display: 'none' }}
        />
        <Button variant='outline-success' className='mr-2 text-uppercase' disabled={isLoading} onClick={uploadNewPhotoClick}>
          Upload new photo
        </Button>
        {userInfo.photo_url && <Button variant='outline-danger' className='text-uppercase' disabled={isLoading} onClick={deletePhoto}>Remove</Button>}
      </div>
    </Container>
  );
};

export default PhotoSettings;
