import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from "../modules/reducer";

// const store = createStore(rootReducer);
let composeEnhancers = composeWithDevTools;
const enhancers = [applyMiddleware(thunk)];

const store = createStore(
    rootReducer,
    composeEnhancers(...enhancers)
);

export default store;
