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
// import axios from 'axios';
// import { useSelector } from 'react-redux';
// import { getUserJwtTokenSelector } from './store/selectors/selectors';

Amplify.configure(awsconfig);

// axios.interceptors.request.use(
//   config => {
//     const token = useSelector((state) => getUserJwtTokenSelector(state));
//     if (token != null) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   err => {
//     return Promise.reject(err);
//   },
// );

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
