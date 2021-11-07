import React, { useState } from 'react';
import cn from 'classnames';
import {
  Form,
  OverlayTrigger,
  Popover,
  FormControlProps,
} from 'react-bootstrap';
import styles from './styles.module.scss';

type Props = FormControlProps & {
    label: string;
    placeholder?: string
    matchTo?: string
    matchToLabel?: string
};

const PasswordInput: React.FC<Props> = ({
  label, matchTo, matchToLabel, onChange, ...props
}) => {
  const [password, setPassword] = useState('');

  const overlay = (
    <Popover id='password-input-overlay'>
      <Popover.Content>
        <h6>
          {label}
          {' '}
          must
        </h6>
        <div>
          <span className={cn(styles.dot, { [styles.valid]: /[0-9]/.test(password) })} />
          Have One number
        </div>
        <div>
          <span className={cn(styles.dot, { [styles.valid]: /[A-Z]/.test(password) })} />
          Have One uppercase character
        </div>
        <div>
          <span className={cn(styles.dot, { [styles.valid]: /[a-z]/.test(password) })} />
          Have One lowercase character
        </div>
        <div>
          <span className={cn(styles.dot, { [styles.valid]: /[^A-Za-z0-9]/.test(password) })} />
          Have One special character
        </div>
        <div>
          <span className={cn(styles.dot, { [styles.valid]: password.length >= 8 })} />
          Have 8 characters minimum
        </div>
        {matchToLabel && (
          <div>
            <span className={cn(styles.dot, { [styles.valid]: password === matchTo })} />
            Have match
            {' '}
            {matchToLabel}
          </div>
        )}
      </Popover.Content>
    </Popover>
  );

  return (
    <OverlayTrigger trigger='focus' placement='right' overlay={overlay}>
      <Form.Control
        type='password'
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        onChange={e => {
          setPassword(e.target.value);
          onChange?.(e);
        }}
      />
    </OverlayTrigger>
  );
};

export default PasswordInput;
