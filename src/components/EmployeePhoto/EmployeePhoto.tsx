import React from 'react';
import cn from 'classnames';
import { IUserInformation } from '../../lib/interfaces';

import styles from './styles.module.scss';

type Props = {
    userInfo: IUserInformation;
    className?: string;
    big?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

const EmployeePhoto: React.FC<Props> = ({
  userInfo, big, className, children, onClick
}) => {
  return (
    <>
      <div className={cn(styles.wrapper, { [styles.big]: big, [styles.pointer]: !!onClick }, className)} onClick={onClick}>
        {userInfo.photo_url ? <img src={userInfo.photo_url} alt={`${userInfo.first_name} ${userInfo.last_name}`} /> : (
          <div className={styles.initials}>
            {userInfo.first_name?.[0]}
            &nbsp;
            {userInfo.last_name?.[0]}
          </div>
        )}
        {children && <div className={styles.overlay}>{children}</div>}
      </div>

      {big && (
        <h3 className='mt-3'>
          {userInfo.first_name}
          &nbsp;
          {userInfo.last_name}
        </h3>
      )}
    </>
  );
};

export default EmployeePhoto;
