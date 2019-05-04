import { combineReducers } from "redux";
import UserReducer from '../user/reducer';
import RoutesReducer from '../routes/reducer'

export default combineReducers({
  user: UserReducer,
  routes: RoutesReducer
})