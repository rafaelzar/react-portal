/* eslint-disable camelcase */
import React, { useCallback, useState, FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { PlaidLink, PlaidLinkOnSuccess } from 'react-plaid-link';
import { Spinner } from 'react-bootstrap';
import { useAppDispatch } from '../../store/store';
import { getPlaidLinkToken, sendPlaidPublicToken } from '../../store/apiCalls';
import { getUserIDSelector } from '../../store/selectors/selectors';
import { fetchUserFromDatabaseAuthAction } from '../../store/actions/authActions';
import { swalSuccess } from '../../lib/utils/toasts';

const PaymentSettings: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const userId = useSelector((state) => getUserIDSelector(state));
  const [token, setToken] = useState<string | null>(null);
  // const userId = '607a1d65e4be5100126b827e';

  React.useEffect(() => {
    async function createLinkToken() {
      const response = await getPlaidLinkToken(userId);
      const {
        data: { link_token },
      } = response;
      setToken(link_token);
      console.log(link_token);
    }
    if (userId) createLinkToken();
  }, [userId]);

  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    async (public_token, metadata) => {
      const res = await sendPlaidPublicToken(userId, public_token);
      if (res) {
        console.log(res);
        dispatch(fetchUserFromDatabaseAuthAction()).then(
          (response: boolean | undefined) => {
            if (response) {
              swalSuccess('Bank account is connected');
            }
          },
        );
      }
      console.log(metadata);
    },
    [dispatch, userId],
  );

  return token === null ? (
    <Spinner className='d-block m-auto' animation='border' />
  ) : (
    <PlaidLink
      token={token}
      onSuccess={onSuccess}
      // className=''
      // onExit={...}
      // onEvent={...}
    >
      Connect a bank account
    </PlaidLink>
  );
};

export default PaymentSettings;
