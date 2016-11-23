/*eslint-disable import/default */
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { browserHistory, Router } from 'react-router';
import routes from './routes';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './styles/styles.css';
import configureStore from './store/configureStore';
import {loadCourses} from './actions/courseActions';
import {loadAuthors} from './actions/authorActions';
import {Provider} from 'react-redux';
import '../node_modules/toastr/build/toastr.min.css';
const store = configureStore();
store.dispatch(loadCourses());
store.dispatch(loadAuthors());
render (
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('app')
);
