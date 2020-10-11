import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './redux/store';
import {Provider} from 'react-redux';
import {CssBaseline, ThemeProvider} from "@material-ui/core";
import theme from "./config/theme";

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <App />
        </ThemeProvider>
    </Provider>,
    document.getElementById('root')
);