import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import DefaultLayout from '../../layout/DefaultLayout';
import { logOutCognitoUserAuthAction } from '../../store/actions/authActions';
import { getUserJwtTokenSelector } from '../../store/selectors/selectors';
import { useAppDispatch } from '../../store/store';

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const userInfo = useSelector((state) => getUserJwtTokenSelector(state));
  const history = useHistory();

  React.useEffect(() => {
    console.log('jwt', userInfo);
    if (userInfo === '') {
      history.push('/login');
    }
  }, [history, userInfo]);

  const logout = async () => {
    dispatch(logOutCognitoUserAuthAction()).then((res: boolean) => {
      if (res) {
        history.push('/login');
      } else {
        console.log('Something went wrong');
      }
    });
  };

  return (
    <DefaultLayout>
      <div className='text-center'>
        <h1>Home Page</h1>
        <input type='button' value='Logout' onClick={logout} />
        <Link className='nav-link' to='/forgot-password'>
          Forgot Password
        </Link>
      </div>
    </DefaultLayout>
  );
};

export default HomePage;
