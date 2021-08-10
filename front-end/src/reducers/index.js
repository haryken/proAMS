import { combineReducers } from 'redux';
import { getAllUsersReducer } from './userReducers';
import { headerTitleReducer } from './headerReducers';
import { authReducer } from './authReducers';
import { createUserReducer, storeUserReducer } from './createUserReducer';
import { getUserReducer } from './getUserReducer';
import { editUserReducer } from './editUserReducer';

const rootReducer = combineReducers({
  getAllUsersReducer,
  headerTitleReducer,
  authReducer,
  createUserReducer,
  storeUserReducer,
  getUserReducer,
  editUserReducer,
});

export default rootReducer;
