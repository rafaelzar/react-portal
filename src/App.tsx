import { Component, ReactElement } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import PaymentPage from './pages/payment-pages/PaymentPage';
import EyerateReviewsPage from './pages/review-pages/EyerateReviewsPage';
import OtherReviewsPage from './pages/review-pages/OtherReviewsPage';
import './styles/globals.scss';

export class App extends Component {
  render(): ReactElement {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/' exact component={HomePage} />
          <Route path='/eyerate-reviews' exact component={EyerateReviewsPage} />
          <Route path='/other-reviews' exact component={OtherReviewsPage} />
          <Route path='/payment' exact component={PaymentPage} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
