import { GET_ALL_USERS_REQUEST, GET_ALL_USERS_SUCCESS, GET_ALL_USERS_FAIL } from '../constants';

export const getAllUsersReducer = (
  state = {
    loading: false,
    users: [],
    error: null,
  },
  action
) => {
  switch (action.type) {
    case GET_ALL_USERS_REQUEST:
      return { ...state, loading: true };
    case GET_ALL_USERS_SUCCESS:
      return { ...state, loading: false, users: action.payload };
    case GET_ALL_USERS_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
