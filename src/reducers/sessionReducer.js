import { types } from '@actions/sessionActions';

const initialState = {
  user: null,
  token: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SESSION_LOGIN_REQUEST:
      return { ...state };
    case types.SESSION_LOGIN_SUCCESS:
      return { ...state, user: action.payload };
    case types.SESSION_LOGIN_FAILURE:
      return initialState;
    case types.SESSION_SET_TOKEN:
      return { ...state, token: action.payload };
    case types.SESSION_LOGOUT:
      return initialState;
    default:
      return state;
  }
};
