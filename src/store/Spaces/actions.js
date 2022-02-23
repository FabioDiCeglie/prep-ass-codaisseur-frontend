import axios from "axios";

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
