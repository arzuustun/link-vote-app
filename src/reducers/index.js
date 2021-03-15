import { combineReducers } from 'redux';
import links from './links';
import { loadingBarReducer } from 'react-redux-loading';
import paging from './paging';

export default combineReducers({
  links,
  paging,
  loadingBar: loadingBarReducer
}) 