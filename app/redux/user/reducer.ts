import { 
  UserState, 
  UserActionTypes, 
  SET_USER
} from "./types";
import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';

const initialState: UserState = {
  currentUser: undefined
}

const UserReducer = (state = initialState, action: UserActionTypes ): UserState => {
  switch ( action.type ) {
    case SET_USER:
      return {
        ...state,
        currentUser: action.payload
      }
    default:
      return state
  }
}

const persistConfig = {
  key: 'user',
  storage: storage
}

export default persistReducer(persistConfig, UserReducer)