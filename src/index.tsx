// React Import
import React from 'react';
import ReactDOM from 'react-dom';

// Main app import
import { App } from './Pages';

// Redux import
import { Provider } from 'react-redux';

// Store import
import { store } from './Store/store';
// const container = document.getElementById('react-root');
// const root = ReactDOM.createRoot(container);

// root.render(<App />);

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
