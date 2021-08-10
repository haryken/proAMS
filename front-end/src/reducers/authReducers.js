import { USERS_LOGIN_FAIL, USERS_LOGIN_REQUEST, USERS_LOGIN_SUCCESS } from '../constants';

export const authReducer = (
  state = {
    loading: false,
    // eslint-disable-next-line no-undef
    userData: localStorage.getItem('userData')
      ? // eslint-disable-next-line no-undef
        JSON.parse(localStorage.getItem('userData'))
      : null,
    error: null,
  },
  action
) => {
  switch (action.type) {
    case USERS_LOGIN_REQUEST:
      return { ...state, loading: true, error: null };
    case USERS_LOGIN_SUCCESS:
      return { ...state, loading: false, userData: action.payload, error: null };
    case USERS_LOGIN_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
