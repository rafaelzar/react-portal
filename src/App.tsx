import { Component, ReactElement } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import FirstTimeSigninPage from './pages/auth-pages/FirstTimeSigninPage';
import HomePage from './pages/home/HomePage';
import PaymentPage from './pages/payment-pages/PaymentPage';
import EyerateReviewsPage from './pages/review-pages/EyerateReviewsPage';
import OtherReviewsPage from './pages/review-pages/OtherReviewsPage';
import ForgotPasswordPage from './pages/auth-pages/ForgotPasswordPage';
import './styles/globals.scss';
import Amplify from 'aws-amplify';
import { awsconfig } from './lib/aws-exports';

Amplify.configure(awsconfig);

export class App extends Component {
  render(): ReactElement {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/' exact component={HomePage} />
          <Route path='/eyerate-reviews' exact component={EyerateReviewsPage} />
          <Route path='/other-reviews' exact component={OtherReviewsPage} />
          <Route path='/payment' exact component={PaymentPage} />
          <Route path='/new-user-login' exact component={FirstTimeSigninPage} />
          <Route path='/forgot-password' exact component={ForgotPasswordPage} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
