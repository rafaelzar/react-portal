/* eslint-disable camelcase */
import React, { useCallback, useState, FunctionComponent } from 'react';
import { PlaidLink, PlaidLinkOnSuccess } from 'react-plaid-link';
import { getPlaidLinkToken, sendPlaidPublicToken } from '../../store/apiCalls';

const PlaidComponent: FunctionComponent = () => {
  const [token, setToken] = useState<string | null>(null);
  const userID = '607a1d65e4be5100126b827e';

  // generate a link_token
  React.useEffect(() => {
    async function createLinkToken() {
      const response = await getPlaidLinkToken(userID);
      const { data: { link_token } } = response;
      // const link_token = 'test1234';
      setToken(link_token);
      console.log(link_token);
    }
    createLinkToken();
  }, []);

  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    (public_token, metadata) => {
      // send public_token to server
      const res = sendPlaidPublicToken(userID, public_token);
      if (res) {
        console.log(res);
      }
      console.log(metadata);
      // async function sendPublicToken() {
      //   const res = await sendPlaidPublicToken(userID, public_token);
      //   console.log(res);
      //   console.log(metadata);
      // }
      // sendPublicToken();
    },
    [],
  );

  // The pre-built PlaidLink component uses the usePlaidLink hook under the hood.
  // It renders a styled button element and accepts a `className` and/or `style` prop
  // to override the default styles. It accepts any Link config option as a prop such
  // as receivedRedirectUri, onEvent, onExit, onLoad, etc.
  return token === null ? (
    // insert your loading animation here
    <div className='loader' />
  ) : (
    <PlaidLink
      token={token}
      onSuccess={onSuccess}
      // onExit={...}
      // onEvent={...}
    >
      Connect a bank account
    </PlaidLink>
  );
};

export default PlaidComponent;
