import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'

import { Store } from "./helpers/store";
import { Provider } from "react-redux";
import Router from "./router";

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={Store}>
    <Router />
  </Provider>
)
