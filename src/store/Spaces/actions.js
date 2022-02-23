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
