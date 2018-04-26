import { combineReducers } from 'redux';
import count from './component/Counter/reducer';

const rootReducer = combineReducers({
  count
});

export default rootReducer;