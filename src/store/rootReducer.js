import { combineReducers } from "redux";
import appState from "./appState/reducer";
import user from "./user/reducer";
import spacesReducer from "./Spaces/reducer";

export default combineReducers({
  appState,
  user,
  spaces: spacesReducer,
});
