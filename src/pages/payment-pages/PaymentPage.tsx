import React from 'react';
import { useHistory } from 'react-router-dom';
import DefaultLayout from '../../layout/DefaultLayout';
import { fetchIdTokenCognitoFunction } from '../../lib/aws/aws-cognito-functions';

const PaymentPage: React.FC = () => {
  const history = useHistory();

  React.useEffect(() => {
    async function fetchIdToken() {
      const idToken = await fetchIdTokenCognitoFunction();
      if (idToken === false) {
        history.push('/login');
      }
    }
    fetchIdToken();
  }, [history]);

  return (
    <DefaultLayout>
      <div className='text-center'>
        <h1>Payment Page</h1>
      </div>
    </DefaultLayout>
  );
};

export default PaymentPage;
