// React Import
import React from 'react';
import ReactDOM from 'react-dom';

// Main app import
import { App } from './Views';

// Redux import
import { Provider } from 'react-redux';

// Store import
import { store } from './Store/store';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

// import reportWebVitals from './reportWebVitals';
// reportWebVitals();
