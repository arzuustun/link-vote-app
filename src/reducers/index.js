import { combineReducers } from 'redux';
import links from './links';
import { loadingBarReducer } from 'react-redux-loading';

export default combineReducers({
  links,
  loadingBar: loadingBarReducer
}) 