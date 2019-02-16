import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { isBookingAllowedForUser } from '../../effects';
import auth0Client from '../../auth/Auth';
import '../../../style/bootstrap/css/bootstrap.min.css'
import '../../../style/style.css'


export class NavBar extends React.Component {

    signOut = () => {
        auth0Client.signOut();
        this.props.history.replace('/');
    };

    render() {

        return (
            <header id="header">
                <div className="container-fluid">
                    <nav id="nav-menu-container">
                        <ul className="nav-menu">
                            <div className="row">
                                <div className="col-6" style={{ 'text-align': 'left'}}>
                                    <Link to="/">
                                        Home
                                    </Link>
                                    <Link to="/book">
                                        Book DIMES
                                    </Link>
                                    { sessionStorage.getItem('loggedIn') === 'false' &&
                                        (
                                            <button className="btn btn-dark" onClick={auth0Client.signIn}>Login</button>
                                        )
                                    }
                                </div>
                                <div className="col-2">

                                </div>
                                {
                                    sessionStorage.getItem('loggedIn') === 'true' &&
                                    <div className="col-4" style={{ 'text-align': 'right'}}>
                                        <Link to="/dashboard">
                                            Dashboard
                                        </Link>
                                        < button className="btn btn-dark" onClick={() => {this.signOut()}}>Sign Out</button>
                                    </div>
                                }
                            </div>
                        </ul>
                    </nav>

                </div>
            </header>
        );
    }

}

NavBar.propTypes = {
    isBookingAllowedInfoOfUser: PropTypes.oneOfType([
        PropTypes.shape({
            userName: PropTypes.string,
            edition: PropTypes.number,
            editionFrom: PropTypes.string,
            editionTo: PropTypes.string,
            isBookingAllowed: PropTypes.bool,
            numbersAllowedToBook: PropTypes.int,
        }),
    ]),
};

NavBar.defaultProps = {
    isBookingAllowedInfoOfUser: {
        userName: '',
        edition: '',
        editionFrom: '',
        editionTo: '',
        isBookingAllowed: true,
        numbersAllowedToBook: 10,
    }
};

export default connect(
    (state) => (
        {
            isBookingAllowedInfoOfUser: state.get('userAlreadyBookedInfo'),
        }),
    {
        isBookingAllowedForUser,
    }
)(withRouter(NavBar));