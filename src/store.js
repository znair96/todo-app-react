import { createStore, compose } from 'redux';
import { rootReducer } from './redux/reducers';
const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;
export const store = createStore(rootReducer, composeEnhancers());
export default store;
