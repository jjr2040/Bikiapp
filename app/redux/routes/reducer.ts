import { 
  RoutesState, 
  RoutesActionTypes, 
  SAVE_ROUTE
} from "./types";
import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';

const initialState: RoutesState = {
  savedRoutes: []
}

const RoutesReducer = (state = initialState, action: RoutesActionTypes ): RoutesState => {
  switch ( action.type ) {
    case SAVE_ROUTE:
      return {
        ...state,
        savedRoutes: state.savedRoutes.concat([action.payload]) 
      }
    default:
      return state
  }
}

const persistConfig = {
  key: 'routes',
  storage: storage
}

export default persistReducer(persistConfig, RoutesReducer)