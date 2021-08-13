import React from 'react';
import { logOutCognitoUserAuthAction } from '../store/actions/authActions';
import { useAppDispatch } from '../store/store';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { swalError, swalSuccess } from '../lib/utils/toasts';

interface IProps {
  toggleSidebar: () => void;
}

const Nav: React.FC<IProps> = ({ toggleSidebar }) => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const logout = async () => {
    dispatch(logOutCognitoUserAuthAction()).then((res: boolean) => {
      if (res) {
        history.push('/login');
        swalSuccess('You are logged out');
      } else {
        swalError('Something went wrong');
      }
    });
  };

  return (
    <nav className='nav-custom d-flex justify-content-end mb-2'>
      <div className='d-flex align-items-center'>
        <div id='menu-trigger' onClick={toggleSidebar}>
          <span className='menu-stripe stripe-top mr-3' />
        </div>
        <div className='mr-4'>User</div>
        <Button variant='dark' onClick={logout}>
          Logout
        </Button>
      </div>
    </nav>
  );
};

export default Nav;
