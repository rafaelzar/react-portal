import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import DefaultLayout from '../../layout/DefaultLayout';
import { getUserJwtTokenSelector } from '../../store/selectors/selectors';

const HomePage: React.FC = () => {
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
        <h1>Home Page</h1>
        <Link to='/forgot-password'>Forgot Password</Link>
      </div>
    </DefaultLayout>
  );
};

export default HomePage;
