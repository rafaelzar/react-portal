/* eslint-disable camelcase */
import React, { useCallback, useState, FunctionComponent } from 'react';
import { PlaidLink, PlaidLinkOnSuccess } from 'react-plaid-link';
import { getPlaidLinkToken, sendPlaidPublicToken } from '../../store/apiCalls';

const PlaidComponent: FunctionComponent = () => {
  const [token, setToken] = useState<string | null>(null);
  const userID = '607a1d65e4be5100126b827e';

  React.useEffect(() => {
    async function createLinkToken() {
      const response = await getPlaidLinkToken(userID);
      const { data: { link_token } } = response;
      setToken(link_token);
      console.log(link_token);
    }
    createLinkToken();
  }, []);

  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    (public_token, metadata) => {
      const res = sendPlaidPublicToken(userID, public_token);
      if (res) {
        console.log(res);
      }
      console.log(metadata);
    },
    [],
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

export default PlaidComponent;
