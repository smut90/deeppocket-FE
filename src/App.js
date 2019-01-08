import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NumberCollection from './modules/booking/components/NumberCollection';
import MainSection from './modules/Main/components/MainSection';
import Callback from './modules/auth/Callback';
import UserDashboard from './modules/Main/components/UserDashboard';
import SecuredRoute from './modules/auth/securedRoutes/SecuredRoute';
import auth0Client from './modules/auth/Auth';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            checkingSession: true,
            isAuthenticated: false,
        }
    }

    async componentDidMount() {

        if (this.props.location.pathname === '/callback') {
            this.setState({ checkingSession: false, isAuthenticated: auth0Client.isAuthenticated() });
            return;
        }

        if (this.props.location.pathname === '/callback') return;
        try {
            await auth0Client.silentAuth();
            this.forceUpdate();
        } catch (err) {
            if (err.error !== 'login_required');
        }

        this.setState({ checkingSession: false, isAuthenticated: auth0Client.isAuthenticated() })

    }

    isSessionValidated = () => {
        return this.props.isSessionValidationComplete === 'done';
    };

    render () {
        return (
            <div>
                <Route exact path="/" component={MainSection} />
                <Route exact path="/book" component={NumberCollection} />
                <Route exact path='/callback' component={Callback}/>
                {/*<SecuredRoute path='/dashboard'*/}
                              {/*component={UserDashboard}*/}
                              {/*checkingSession={this.isSessionValidated()} />*/}
                <SecuredRoute path='/dashboard'
                              component={UserDashboard}
                              checkingSession={this.state.checkingSession} />
            </div>
        );
    }
}

App.propTypes = {
    isSessionValidationComplete: PropTypes.string,
};

App.defaultProps = {
    isSessionValidationComplete: '',
};

export default connect(
    (state) => (
        {
            isSessionValidationComplete: state.get('isSessionValidationComplete'),
        }),
    {

    }
)(withRouter(App));

// export default withRouter(App);
