import { Component, ReactElement } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginPage from './pages/auth-pages/LoginPage';
import HomePage from './pages/home/HomePage';
import PaymentPage from './pages/payment-pages/PaymentPage';
import ReviewsPage from './pages/review-pages/ReviewsPage';
import ForgotPasswordPage from './pages/auth-pages/ForgotPasswordPage';
import './styles/globals.scss';
import Amplify from 'aws-amplify';
import { awsconfig } from './lib/aws-exports';
import axios from 'axios';
import { fetchIdTokenCognitoFunction } from './lib/aws/aws-cognito-functions';

import 'bootstrap/dist/css/bootstrap.min.css';
import SettingsPage from './pages/settings-pages/SettingsPage';

Amplify.configure(awsconfig);
axios.interceptors.request.use(
  async (config) => {
    const idToken = await fetchIdTokenCognitoFunction();
    if (idToken != null) {
      config.headers.Authorization = `Bearer ${idToken}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  },
);

export class App extends Component {
  render(): ReactElement {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/' exact component={HomePage} />
          <Route path='/reviews' exact component={ReviewsPage} />
          <Route path='/payment' exact component={PaymentPage} />
          <Route path='/settings' exact component={SettingsPage} />
          <Route path='/login' exact component={LoginPage} />
          <Route path='/forgot-password' exact component={ForgotPasswordPage} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
