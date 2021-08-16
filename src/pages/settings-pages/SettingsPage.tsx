import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getUserJwtTokenSelector } from '../../store/selectors/selectors';
import DefaultLayout from '../../layout/DefaultLayout';

const SettingsPage: React.FC = () => {
  const userInfo = useSelector((state) => getUserJwtTokenSelector(state));
  const history = useHistory();
  React.useEffect(() => {
    if (userInfo === '') {
      history.push('/login');
    }
  }, [history, userInfo]);
  return (
    <DefaultLayout>
      <div className='text-center'>
        <h1>User Settings</h1>
      </div>
    </DefaultLayout>
  );
};

export default SettingsPage;
