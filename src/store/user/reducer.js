import { LOG_OUT, LOGIN_SUCCESS, TOKEN_STILL_VALID } from "./actions";

const initialState = {
  token: localStorage.getItem("token"),
  name: null,
  email: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return { ...state, ...action.payload };

    case LOG_OUT:
      localStorage.removeItem("token");
      return { ...initialState, token: null };

    case TOKEN_STILL_VALID:
      return { ...state, ...action.payload };

    case "user/deleteStory": {
      const newState = { ...state };
      const filterArrayStory = newState.userSpace.stories.filter(
        (story) => story.id !== action.payload
      );
      return {
        ...state,
        userSpace: { ...state.userSpace, stories: filterArrayStory },
      };
    }
    case "user/createStory": {
      //console.log("what is ", action.payload);
      const newStoriesArr = [...state.userSpace.stories, action.payload];

      return {
        ...state,
        userSpace: {
          ...state.userSpace,
          stories: newStoriesArr,
        },
      };
    }
    default:
      return state;
  }
};
