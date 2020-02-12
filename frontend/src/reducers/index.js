import { combineReducers } from 'redux';
import BoardReducer from './BoardReducer'
import UserReducer from './UserReducer';

const rootReducer = combineReducers({
  boards: BoardReducer,
  user: UserReducer
})

export default rootReducer;