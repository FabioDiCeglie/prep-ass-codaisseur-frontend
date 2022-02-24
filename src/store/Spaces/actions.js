import axios from "axios";
import { selectToken } from "../user/selectors";

export const getSpaces = (data) => ({
  type: "homepage/getSpaces",
  payload: data,
});

export function getAllSpaces() {
  return async function thunk(dispatch, getState) {
    const response = await axios.get("http://localhost:4000/spaces");

    //console.log("what is response", response.data);

    dispatch(getSpaces(response.data));
  };
}

export const getSpace = (data) => ({
  type: "homepage/getSpace",
  payload: data,
});

export function getOneSpace(id) {
  return async function thunk(dispatch, getState) {
    const response = await axios.get(`http://localhost:4000/spaces/${id}`);

    //console.log("what is response", response.data);

    dispatch(getSpace(response.data));
  };
}

export const addOneLike = (data) => ({
  type: "homepage/addOneLike",
  payload: data,
});

export function addLike(id) {
  return async function thunk(dispatch, getState) {
    try {
      const token = localStorage.getItem("token");
      if (token === null) return;

      console.log("what is token", token);
      const response = await axios.post(
        `http://localhost:4000/like/story/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("what is response like", response.data);

      dispatch(addOneLike(response.data));
    } catch (error) {
      console.log(error);
    }
  };
}
