import { Component, ReactElement } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginPage from './pages/auth-pages/LoginPage';
import HomePage from './pages/home/HomePage';
import PaymentPage from './pages/payment-pages/PaymentPage';
import EyerateReviewsPage from './pages/review-pages/EyerateReviewsPage';
import OtherReviewsPage from './pages/review-pages/OtherReviewsPage';
import ForgotPasswordPage from './pages/auth-pages/ForgotPasswordPage';
import './styles/globals.scss';
import Amplify from 'aws-amplify';
import { awsconfig } from './lib/aws-exports';
import axios from 'axios';
import store from './store/store';

Amplify.configure(awsconfig);
axios.interceptors.request.use(
  (config) => {
    const st = store.getState();
    const token = st?.user?.signInUserSession?.idToken?.jwtToken || '';
    if (token != null) {
      config.headers.Authorization = `Bearer ${token}`;
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
          <Route path='/eyerate-reviews' exact component={EyerateReviewsPage} />
          <Route path='/other-reviews' exact component={OtherReviewsPage} />
          <Route path='/payment' exact component={PaymentPage} />
          <Route path='/login' exact component={LoginPage} />
          <Route path='/forgot-password' exact component={ForgotPasswordPage} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
