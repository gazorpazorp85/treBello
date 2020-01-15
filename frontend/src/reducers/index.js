import { combineReducers } from 'redux';
import BoardReducer from './BoardReducer'
import UserReducer from './UserReducer';
import SystemReducer from './SystemReducer';

const rootReducer = combineReducers({
  boards: BoardReducer,
  system: SystemReducer,
  user: UserReducer
})

export default rootReducer;