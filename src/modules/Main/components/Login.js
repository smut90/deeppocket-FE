import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { connect } from 'react-redux';
import { initiateLogin } from '../../effects';

export class Login extends React.Component {

    render() {
        const onLoginSuccess = (response) => {
            let credentials = {
                firstName: response.w3.ofa,
                lastName: response.w3.wea
            };
            this.props.initiateLogin(credentials);
        };

        const onLoginFailure = (response) => {
        };

        return (
            <div>
                <GoogleLogin
                    style={{}}
                    disabledStyle={true}
                    className="btn btn-danger btn-block"
                    clientId=process.env.REACT_APP_GOOGLE_CLIENTID
                    onSuccess={onLoginSuccess}
                    onFailure={onLoginFailure}
                >
                    Sign in with <b>Google</b>
                </GoogleLogin>
            </div>
        );
    }
}

export default connect(
    (state) => (
        {

        }),
    {
        initiateLogin
    }
)(Login);