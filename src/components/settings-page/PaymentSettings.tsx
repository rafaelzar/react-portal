/* eslint-disable camelcase */
import React, { useCallback, useState, FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { PlaidLink, PlaidLinkOnSuccess } from 'react-plaid-link';
import { useAppDispatch } from '../../store/store';
import { getPlaidLinkToken, sendPlaidPublicToken } from '../../store/apiCalls';
import { getUserSelector } from '../../store/selectors/selectors';
import { fetchUserFromDatabaseAuthAction } from '../../store/actions/authActions';

const PaymentSettings: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const userInfo = useSelector((state) => getUserSelector(state));
  const { _id: userId = '' } = userInfo;
  const [token, setToken] = useState<string | null>(null);
  // const userID = '607a1d65e4be5100126b827e';

  React.useEffect(() => {
    async function createLinkToken() {
      const response = await getPlaidLinkToken(userId);
      const {
        data: { link_token },
      } = response;
      setToken(link_token);
      console.log(link_token);
    }
    createLinkToken();
  }, []);

  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    async (public_token, metadata) => {
      const res = await sendPlaidPublicToken(userId, public_token);
      if (res) {
        console.log(res);
        dispatch(fetchUserFromDatabaseAuthAction()).then(
          (response: boolean | undefined) => {
            if (response) {
              console.log(response);
            }
          },
        );
      }
      console.log(metadata);
    },
    [userId],
  );

  return token === null ? (
    // insert your loading animation here
    <div className='loader' />
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
