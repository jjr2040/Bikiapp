import { createStore, applyMiddleware } from 'redux';
import Reducers from './reducers';
import ReduxThunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

const persistConfig = {
  key: 'root',
  storage: storage,
  stateReconciler: autoMergeLevel2
}

const persistedReducer = persistReducer(persistConfig, Reducers);

export default () => {
  const store = createStore(persistedReducer, applyMiddleware(ReduxThunk));
  const persistor = persistStore(store);
  return { store, persistor };
}