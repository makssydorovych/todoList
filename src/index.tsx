import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import * as serviceWorker from './serviceWorker'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import App from "./App/App";
import {store} from "./App/store";

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>

            <App/>

        </Provider>
    </BrowserRouter>
    , document.getElementById('root'))

// If you want your appActions to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
