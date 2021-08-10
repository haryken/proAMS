import axios from 'axios';
import {
  GET_ALL_USERS_FAIL,
  GET_ALL_USERS_REQUEST,
  GET_ALL_USERS_SUCCESS,
  USERS_LOGIN_FAIL,
  USERS_LOGIN_REQUEST,
  USERS_LOGIN_SUCCESS,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAIL,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAIL,
  STORE_USER,
  REMOVE_STORE_USER,
  EDIT_USER_REQUEST,
  EDIT_USER_SUCCESS,
  EDIT_USER_FAIL,
} from '../constants';
import { getErrorMessageFromResponse, createAuthorizedRequestHeader } from '../utils';

const USERS_URL = `${process.env.REACT_APP_API_URL}/users`;

export const getAllUsers = () => (dispatch) => {
  dispatch({
    type: GET_ALL_USERS_REQUEST,
  });
  try {
    // const res = await axios.get("/endpoint");
    const res = {
      data: [],
    };
    dispatch({
      type: GET_ALL_USERS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_USERS_FAIL,
      payload: getErrorMessageFromResponse(error),
    });
  }
};

export const login =
  ({ username, password }) =>
  async (dispatch) => {
    dispatch({
      type: USERS_LOGIN_REQUEST,
    });
    try {
      const res = await axios.post(`${USERS_URL}/login`, {
        username,
        password,
      });
      dispatch({
        type: USERS_LOGIN_SUCCESS,
        payload: res.data,
      });
      // eslint-disable-next-line no-undef
      localStorage.setItem('userData', JSON.stringify(res.data));
    } catch (error) {
      dispatch({
        type: USERS_LOGIN_FAIL,
        payload: getErrorMessageFromResponse(error),
      });
    }
  };

export const createUser =
  ({ firstName, lastName, dateOfBirth, joinedDate, gender, userType }) =>
  async (dispatch) => {
    dispatch({
      type: CREATE_USER_REQUEST,
    });
    try {
      const res = await axios.post(`${USERS_URL}`, {
        firstName,
        lastName,
        dateOfBirth,
        joinedDate,
        gender,
        userType,
      });
      dispatch({
        type: CREATE_USER_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: CREATE_USER_FAIL,
        payload: getErrorMessageFromResponse(error),
      });
    }
  };

export const removeStoreUser = () => (dispatch) => {
  dispatch({
    type: REMOVE_STORE_USER,
  });
};

export const getUser = (id) => async (dispatch, getState) => {
  dispatch({
    type: GET_USER_REQUEST,
  });
  const {
    authReducer: { userData },
  } = getState();
  try {
    const res = await axios.get(`${USERS_URL}/${id}`, {
      headers: {
        Authorization: createAuthorizedRequestHeader(userData),
      },
    });
    dispatch({
      type: GET_USER_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_USER_FAIL,
      payload: getErrorMessageFromResponse(error),
    });
  }
};

export const editUser =
  (id, dateOfBirth, joinedDate, gender, userType) => async (dispatch, getState) => {
    dispatch({
      type: EDIT_USER_REQUEST,
    });
    const {
      authReducer: { userData },
    } = getState();
    try {
      const res = await axios.put(
        `${USERS_URL}`,
        {
          id,
          dateOfBirth,
          joinedDate,
          gender,
          userType,
        },
        {
          headers: {
            Authorization: createAuthorizedRequestHeader(userData),
          },
        }
      );
      dispatch({
        type: EDIT_USER_SUCCESS,
        payload: res.data,
      });
      dispatch({
        type: STORE_USER,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: EDIT_USER_FAIL,
        payload: getErrorMessageFromResponse(error),
      });
    }
  };
