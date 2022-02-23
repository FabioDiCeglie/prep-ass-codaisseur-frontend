const initialState = {
  spaces: null,
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
    default: {
      return state;
    }
  }
}
