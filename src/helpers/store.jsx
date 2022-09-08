import { composeWithDevTools } from 'redux-devtools-extension';
import { applyMiddleware, legacy_createStore as createStore } from "redux"
import { createLogger } from 'redux-logger'
import thunk from "redux-thunk"
import multi from 'redux-multi'
import rootRedux from "../reducer"

const loggerMiddleware = createLogger()

export const Store =  createStore(
  rootRedux,
  composeWithDevTools(applyMiddleware(thunk, loggerMiddleware, multi))
)