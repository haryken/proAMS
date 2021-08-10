import { combineReducers } from 'redux';
import { getAllUsersReducer } from './userReducers';
import { headerTitleReducer } from './headerReducers';
import { authReducer } from './authReducers';
import { createUserReducer, storeUserReducer } from './createUserReducer';

const rootReducer = combineReducers({
  getAllUsersReducer,
  headerTitleReducer,
  authReducer,
  createUserReducer,
  storeUserReducer,
});

export default rootReducer;
