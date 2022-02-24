const initialState = {
  spaces: null,
  space: null,
};
export default function spacesReducer(state = initialState, action) {
  //console.log("what is the action", action);
  switch (action.type) {
    case "homepage/getSpaces": {
      //console.log("what is the action payload", action.payload);
      return {
        ...state,
        spaces: action.payload,
      };
    }
    case "homepage/getSpace": {
      console.log("what is the action payload", action.payload);
      return {
        ...state,
        space: action.payload,
      };
    }
    case "homepage/addOneLike":
      console.log("what is action payload", action.payload);
      const newState = { ...state };
      const stories = newState.space.stories.map((story) => {
        if (story.id === action.payload.idstory) {
          const likes = [...story.storyLikes, action.payload];
          return { ...story, storyLikes: likes };
        }
        return { ...story };
      });
      return {
        ...state,
        space: {
          ...state.space,
          stories: [...stories],
          /*stories: [
            ...state.space.stories,
            { storyLikes: [...state.space.stories.storyLikes, action.payload] },
          ]*/
        },
      };
    default: {
      return state;
    }
  }
}
