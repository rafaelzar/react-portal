import React from 'react';
import { Container, Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getUserSelector } from '../../store/selectors/selectors';

const UserInfoCard: React.FC = () => {
  const userInfo = useSelector((state) => getUserSelector(state));
  const {
    first_name: userFirstName = '',
    last_name: userLastName = '',
    nick_names: userNickName = [' '],
    email: userEmail = '',
    phone: userPhone = '',
  } = userInfo;
  return (
    <Card className='user-information-card'>
      <Container className='my-3'>
        <h2>Full Name</h2>
        <p>
          {userFirstName}
          {' '}
          {userLastName}
        </p>
        <h2>Nicknames</h2>
        {userNickName ? (
          <>
            <p>{userNickName.join(', ')}</p>
          </>
        ) : (
          <p>Unset</p>
        )}
        <h2>Phone</h2>
        {userPhone ? (
          <>
            <p>{userPhone}</p>
          </>
        ) : (
          <p>Unset</p>
        )}
        <h2>Email</h2>
        <p>{userEmail}</p>
      </Container>
    </Card>
  );
};

export default UserInfoCard;
