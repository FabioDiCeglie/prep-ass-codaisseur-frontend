const initialState = {
  space: null,
};

export default function storyReducer(state = initialState, action) {
  switch (action.type) {
    case "story/getComments": {
      return {
        ...state,
        space: action.payload,
      };
    }
    case "user/createComment": {
      console.log("what is action payload comment", action.payload);
      const newState = { ...state };
      const addComment = newState.space.stories.map((story) => {
        if (story.id === action.payload.storyId) {
          return {
            ...story,
            comments: [...story.comments, action.payload],
          };
        } else {
          return { ...story };
        }
      });
      console.log("what is add comment", addComment);
      return {
        ...state,
        space: {
          ...state.space,
          stories: addComment,
        },
      };
    }
    default: {
      return state;
    }
  }
}
