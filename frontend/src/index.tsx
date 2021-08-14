// React Import
import ReactDOM from 'react-dom';

// Main app import
import { App } from './Views';

// Redux import
import { Provider } from 'react-redux';

// Store import
import { store } from './Store/Store';

const element = document.getElementById('root');

// const root = ReactDOM.createRoot(container); // Not implemented

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    element
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

// import reportWebVitals from './reportWebVitals';
// reportWebVitals();
