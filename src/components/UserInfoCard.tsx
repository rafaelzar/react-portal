import React from 'react';
import cn from 'classnames';
import { Container, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUserSelector } from '../store/selectors/selectors';

interface IProps {
  className?: string;
  withButton?: boolean;
}

const UserInfoCard: React.FC<IProps> = ({ className, withButton }) => {
  const userInfo = useSelector((state) => getUserSelector(state));
  const {
    first_name: userFirstName = '',
    last_name: userLastName = '',
    nick_names: userNickName = [' '],
    email: userEmail = '',
    phone: userPhone = '',
  } = userInfo;
  return (
    <Card className={cn('user-information-card', className)}>
      <Container className='mt-4'>
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
        {withButton && (
          <Link to='/settings' className='button-link'>
            <Button block>EDIT CONTACT INFO</Button>
          </Link>
        )}
      </Container>
    </Card>
  );
};

export default UserInfoCard;
