import { apiUrl } from "../../config/constants";
import axios from "axios";
import { selectToken, selectUser } from "./selectors";

import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
  setMessage,
} from "../appState/actions";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const TOKEN_STILL_VALID = "TOKEN_STILL_VALID";
export const LOG_OUT = "LOG_OUT";

const loginSuccess = (userWithToken) => {
  return {
    type: LOGIN_SUCCESS,
    payload: userWithToken,
  };
};

const tokenStillValid = (userWithoutToken) => ({
  type: TOKEN_STILL_VALID,
  payload: userWithoutToken,
});

export const logOut = () => ({ type: LOG_OUT });

export const signUp = (name, email, password) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/auth/signup`, {
        name,
        email,
        password,
      });

      dispatch(loginSuccess(response.data));
      dispatch(showMessageWithTimeout("success", true, "account created"));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const login = (email, password) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, {
        email,
        password,
      });

      //console.log("what is response", response);

      dispatch(loginSuccess(response.data));
      dispatch(showMessageWithTimeout("success", false, "welcome back!", 1500));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const getUserWithStoredToken = () => {
  return async (dispatch, getState) => {
    // get token from the state
    const token = selectToken(getState());

    // if we have no token, stop
    if (token === null) return;

    dispatch(appLoading());
    try {
      // if we do have a token,
      // check wether it is still valid or if it is expired
      const response = await axios.get(`${apiUrl}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("what is response", response.data);
      // token is still valid
      dispatch(tokenStillValid(response.data));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.message);
      } else {
        console.log(error);
      }
      // if we get a 4xx or 5xx response,
      // get rid of the token by logging out
      dispatch(logOut());
      dispatch(appDoneLoading());
    }
  };
};

export const deleteStory = (id) => ({
  type: "user/deleteStory",
  payload: id,
});

export function deleteOneStory(id) {
  return async function thunk(dispatch, getState) {
    const response = await axios.delete(`http://localhost:4000/story/${id}`);

    console.log("what is response", response.data);

    dispatch(deleteStory(id));
  };
}
export const createStory = (data) => ({
  type: "user/createStory",
  payload: data,
});

export function createOneStory(name, content, imageUrl) {
  return async function thunk(dispatch, getState) {
    try {
      console.log("what is name, content and image", name, content, imageUrl);
      // get token from the state
      const token = selectToken(getState());
      const user = selectUser(getState());
      const spaceId = user.userSpace.id;

      // if we have no token, stop
      if (token === null) return;
      const response = await axios.post(
        `http://localhost:4000/story/create/${spaceId}`,
        {
          name,
          content,
          imageUrl,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      //console.log("what is response", response.data);

      dispatch(createStory(response.data));
    } catch (error) {
      console.log("Error", error);
    }
  };
}

export const updateSpace = (id) => ({
  type: "user/updateSpace",
  payload: id,
});

export function updateOneStory(id, title, description, backgroundColor, color) {
  return async function thunk(dispatch, getState) {
    console.log("what is info", id, title, description, backgroundColor, color);
    // get token from the state
    const token = selectToken(getState());

    // if we have no token, stop
    if (token === null) return;
    const response = await axios.patch(
      `http://localhost:4000/spaces/update/${id}`,
      {
        title,
        description,
        backgroundColor,
        color,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    console.log("what is response", response.data);

    dispatch(updateSpace(response.data));
  };
}
/*export const createComment = (id) => ({
  type: "user/updateSpace",
  payload: id,
});

export function createOneComment(comment) {
  return async function thunk(dispatch, getState) {
    console.log("what is comment", comment);
    // get token from the state
    const token = selectToken(getState());

    // if we have no token, stop
    if (token === null) return;
    const response = await axios.post(
      `http://localhost:4000/auth/create/comment`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    console.log("what is response", response.data);

    dispatch();
  };
}*/
