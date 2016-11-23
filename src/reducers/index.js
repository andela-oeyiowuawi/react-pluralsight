import {combineReducers} from 'redux';
import courses from './courseReducers';
import authors from './AuthorReducer';
import ajaxCallInProgress from './ajaxStatusReducer';
const rootReducer = combineReducers({
  courses,
  authors,
  ajaxCallInProgress
});

export default rootReducer;
