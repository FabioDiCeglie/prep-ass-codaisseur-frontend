const initialState = {
  story: null,
};
export default function storyReducer(state = initialState, action) {
  console.log("what is the action", action);
  switch (action.type) {
    default: {
      return state;
    }
  }
}
