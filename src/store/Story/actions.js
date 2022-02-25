import axios from "axios";

export const getComments = (id) => ({
  type: "story/getComments",
  payload: id,
});

export function fetchComments(id) {
  return async function thunk(dispatch, getState) {
    const response = await axios.get(
      `http://localhost:4000/story/comments/${id}`
    );

    //console.log("what is response", response.data);

    dispatch(getComments(response.data));
  };
}

export const createComment = (id) => ({
  type: "user/createComment",
  payload: id,
});

export function createOneComment(comment, email, id) {
  return async function thunk(dispatch, getState) {
    console.log("what is comment", comment);
    const response = await axios.post(
      `http://localhost:4000/story/comments/create/${id}`,
      {
        comment,
        email,
        storyId: id,
      }
    );

    console.log("what is response", response.data);

    dispatch(createComment(response.data));
  };
}
