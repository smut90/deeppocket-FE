import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider, connect } from 'react-redux';
import { withRouter, BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import auth0Client from './modules/auth/Auth';
import { notifySystemStart } from './modules/actions';

import App from './App';

const RoutedApp = withRouter(App);

const AppProvider = class extends Component {

    componentDidMount() {
        auth0Client.silentAuth();
        if (sessionStorage.getItem('loggedIn') === null || sessionStorage.getItem('loggedIn') === undefined){
            this.reloadApp();
            sessionStorage.setItem('loggedIn', JSON.stringify(false));
        }
        if (sessionStorage.getItem('loggedIn') !== null && sessionStorage.getItem('loggedIn') !== undefined){
            this.props.notifySystemStart();
        }
    }

    reloadApp(){
        window.location.reload(true);
    }


    render() {
        const { store, isSessionValidationComplete } = this.props;

        if (isSessionValidationComplete !== 'done') {
            return (
                <p>App Loading...</p>
            );
        }

        return (
            <CookiesProvider>
                <Provider store={store}>
                    <BrowserRouter>
                        <RoutedApp />
                    </BrowserRouter>
                </Provider>
            </CookiesProvider>
        );
    }
};

AppProvider.propTypes = {
    store: PropTypes.object.isRequired,
    isSessionValidationComplete: PropTypes.string.isRequired,
    notifySystemStart: PropTypes.func.isRequired,
};

AppProvider.defaultProps = {
    isSessionValidationComplete: ''
};

export default connect(
    (state) => ({
        isSessionValidationComplete: state.get('isSessionValidationComplete'),
    }),
    {
        notifySystemStart,
    },
)(AppProvider);
