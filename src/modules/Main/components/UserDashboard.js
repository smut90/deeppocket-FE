import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUserBookedNumbers, fetchLastEditionWinningNumber, fetchPrevWinnersForDashboard, fetchNextDrawTime, fetchCurrentEdition, fetchTempBookedNumbersFromCache } from '../../effects';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faHandHoldingUsd, faUserAlt } from "@fortawesome/free-solid-svg-icons";
import '../../../style/bootstrap/css/bootstrap.min.css'
import '../../../style/style.css'
import auth0Client from '../../auth/Auth';
import NavBar from './NavBar';
import Footer from './Footer';
import moment from 'moment';
import CountdownTimer from './CountdownTimer';

const spanStyle = {
    'padding-right': '1em'
};

const lineStyleForFastTrack = {
    'border-bottom': '1px dotted #fff'
};

export class UserDashboard extends React.Component {

    componentDidMount(){
        this.props.fetchUserBookedNumbers(auth0Client.profile);
        this.props.fetchLastEditionWinningNumber();
        this.props.fetchPrevWinnersForDashboard();
        this.props.fetchNextDrawTime();
        this.props.fetchCurrentEdition();
        this.props.fetchTempBookedNumbersFromCache();
    }

    formatValue = (number) => {
        let digits = this.getDigits(number);
        return digits.map( (e, i) =>
            <span style={spanStyle} key={i}>
                    <span style={lineStyleForFastTrack}>{e}</span>
                </span>
        );
    };

    populateUserBookedDimes = (bookedNumbers) => {
        return bookedNumbers.map( (e, i) =>
            <button
                key={i}
                type="button"
                className="btn"
                style={{ 'background-color': '#0c5460', 'color': 'aliceblue', 'border-radius': '100%', 'width': '110px', 'height': '110px', 'margin-right': '1px', 'margin-left': '1px' }}
            >
                {this.formatValue(e)}
            </button>

        )
    };

    getDigits = (n) => {
        return Array.from(String(n), Number);
    };

    populateWinningNumberInfo = (number) => {
        let digits = this.getDigits(number);

        return digits.map( (e, i) =>
            <button
                key={i}
                type="button"
                className="btn"
                style={{ 'background-color': '#34495E', 'color': 'aliceblue', 'border-bottom-style': 'solid', 'border-bottom': '2px solid', 'font-size': '30px', 'margin-right': '1em' }}
            >
                {e}
            </button>
        )
    };

    populateWinningNumberInfoForCard = (number) => {

            if (number){
                let digits = this.getDigits(number);

                return digits.map( (e, i) =>
                    <button
                        key={i}
                        type="button"
                        className="btn"
                        style={{ 'background-color': '#34495E', 'color': 'aliceblue', 'border-bottom-style': 'solid', 'border-bottom': '2px solid aliceblue', 'font-size': '25px', 'margin-right': '1px' }}
                    >
                        {e}
                    </button>
                )
            } else {
                return (
                    <button
                        type="button"
                        className="btn"
                        style={{ 'background-color': '#34495E', 'color': 'aliceblue', 'border-bottom-style': 'solid', 'border-bottom': '2px solid aliceblue', 'font-size': '25px', 'margin-right': '1px' }}
                    >
                        No Number
                    </button>
                )
            }
    };

    populateDashboardName = (name) => {
        if (name !== null && name !== undefined && name !== '') {
            const fAndLName = name.split(' ');

            return (
                <h3 style={{ 'color': '#336e7b', 'text-align': 'left' }}>{fAndLName[0]}<strong style={{ 'color': '#cce5ff' }}> {fAndLName[1]}</strong></h3>
            );
        }
        return (
            <h3 style={{ 'color': '#336e7b', 'text-align': 'left' }}>NO <strong style={{ 'color': '#cce5ff' }}> WINNER</strong></h3>
        );
    };

    populateLeaderBoard = () => {
        const { dashboard } = this.props;

        return dashboard.map( (e, k) =>
            <div key={k} className="card col-4" style={{ 'border': '1px solid rgba(0,0,0,.125)', 'border-radius': '3%', 'background-color': '#34495E' }}>
                <div className="card-header text-center" style={{ 'padding-top': '5px', 'padding-bottom': '5px', 'padding-left': '10px', 'background-color': '#34495E' }}>
                    <h4 style={{ 'color': 'aliceblue', 'margin-bottom': '0px', 'text-align': 'left' }}>Edition <span class="badge badge-secondary">{ e.edition.edition }</span></h4>
                </div>
                <div className="card-body" style={{ 'padding': '10px' }}>

                    { this.populateDashboardName(e.name) }

                    <div className="col-12 text-center" style={{ 'padding-bottom': '5px', 'padding-top': '5px' }}>
                        { this.populateWinningNumberInfoForCard(e.winningNumber) }
                    </div>
                    <div className="row text-center">
                        <div className="col-12">
                            <p style={{ 'color': 'aliceblue' }}>Winning Dime</p>
                        </div>
                    </div>
                </div>
                <div className="card-footer" style={{ 'text-align': 'right' }}>
                    <small className="text-muted">{ e.edition.editionFrom } - { e.edition.editionTo }</small>
                </div>
            </div>
        );
    };

    populateTotalWinningAmount = (number) => {
        let digits = this.getDigits(number);

        return digits.map( (e, i) =>
            <button
                key={i}
                type="button"
                className="btn"
                style={{ 'background-color': '#34495E', 'color': 'aliceblue', 'border-bottom-style': 'solid', 'font-size': '25px', 'margin-right': '2px' }}
            >
                {e}
            </button>
        );
    };

    calculateTotalWinningAmount = () => {
        const { tempBookedNumbersForAllUsers } = this.props;

        if (tempBookedNumbersForAllUsers){
            const dimeAmount = 4;
            const bookedNumbers = tempBookedNumbersForAllUsers.length;
            return dimeAmount * bookedNumbers;
        } else {
            return 0;
        }
    };

    calculateTotalBookedNumbers = () => {
        const { tempBookedNumbersForAllUsers } = this.props;

        if (tempBookedNumbersForAllUsers){
            return tempBookedNumbersForAllUsers.length;
        } else {
            return 0;
        }
    };

    populateUserBookedDimeCount = () => {
        const { userInfo } = this.props;

        return userInfo && userInfo.bookedNumbers ? userInfo.bookedNumbers.length : 0;
    };

    populateSign = (sign) => {
        return (
            <button
                type="button"
                className="btn"
                style={{ 'background-color': '#34495E', 'color': 'aliceblue', 'font-size': '25px', 'margin-right': '3px' }}
            >
                {sign}
            </button>
        );
    };

    countDownTimer = () => {
        const { draw } = this.props;
        return (
            <CountdownTimer endDate={moment.utc(draw.nextDraw, 'YYYY-MM-DD hh:mm:ss')}/>
        );
    };

    render() {
        const { edition } = this.props;
        return (
            <div>
                <NavBar/>
                <div className="container-fluid" style={{ 'padding-right': '0px', 'padding-left': '0px' }}>

                    {/*Name & About*/}
                    <div className="row" style={{ 'height': '50px', 'max-height': '50px', 'padding-top': '10px', 'margin-right': '0px' }}>
                        <div className="col-12" style={{ 'text-align': 'right' }}>
                            <h4 style={{ 'color': '#336e7b', 'text-align': 'right' }}>
                                <span style={{ 'font-size': '20px', 'color': '#34495E' }}>
                                    <FontAwesomeIcon icon={faUserAlt} />
                                </span>
                                <span> </span>
                                {auth0Client.profile.given_name} <strong style={{ 'color': '#cce5ff' }}>{auth0Client.profile.family_name}</strong>
                            </h4>
                        </div>
                    </div>
                    {/*End Name & About*/}

                    {/*Stats*/}
                    <div className="container-fluid" >
                        <div className="row">

                            <div className="col-12 text-center" style={{ 'padding-bottom': '5px' }}>
                                <h3 style={{ 'color': '#336e7b' }}>My Dimes for Edition <span class="badge badge-secondary">{ edition.edition }</span></h3>
                                <p><span class="badge badge-secondary">{ edition.editionFrom } - { edition.editionTo }</span></p>

                                <div className="container text-center" style={{ 'padding-top': '30px', 'padding-bottom': '5px', 'margin-top': '30px', 'margin-bottom': '5px' }}>
                                    { this.populateUserBookedDimes(this.props.userInfo.bookedNumbers) }
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="container-fluid text-center" style={{ 'padding-bottom': '10px' }}>

                        <div className="row text-center">
                            <div className="col-12 text-center">
                                <h5 style={{ 'color': '#34495E' }}>My DIME Count</h5>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-6" style={{ 'border-right': '2px dotted #34495E', 'height': '40px', 'margin-left': '2px', 'margin-top': '5px', 'margin-bottom': '5px' }}>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12 text-center">
                                <button className="btn btn-info" style={{ 'width': '50px',  'height': '50px', 'border-radius': '100%', 'border': '2px dotted #34495E' }}>
                                    { this.populateUserBookedDimeCount() }
                                </button>
                            </div>
                        </div>
                    </div>

                    {/*/!*Last draw winning number*!/*/}
                    <div className="container-fluid">

                        <div className="row">
                            <div className="col-12 text-center" style={{ 'background-color': '#34495E', 'padding-bottom': '35px', 'padding-top': '35px' }}>
                                { this.populateWinningNumberInfo(this.props.winningInfo.winningNumber) }
                            </div>
                        </div>

                        <div className="row text-center">
                            <div className="col-12" style={{ 'background-color': '#34495E', 'padding-bottom': '20px' }}>
                                <p style={{ 'color': 'aliceblue' }}>Last Draw winning Number</p>
                            </div>
                        </div>
                    </div>
                    {/*/!*End Last draw winning number*!/*/}

                    {/*Countdown Timer*/}
                    <div className="container-fluid" style={{ 'padding-bottom': '10px', 'padding-top': '30px', 'background-color': '#17a2b8' }} >
                        <div className="row" style={{ 'margin': '0px' }}>
                            <div className="col-12 text-center">
                                <h4 className="display-4" style={{ 'color': '#34495E', 'font-size': '25px' }}>
                                    Time Till Next <strong style={{ 'color': '#cce5ff'}}>DRAW</strong>
                                </h4>
                            </div>
                        </div>
                        <div className="row" style={{ 'margin-left': '0px', 'margin-right': '0px' }}>
                            { this.countDownTimer() }
                        </div>

                    </div>
                    <div className="container-fluid" style={{ 'padding-bottom': '10px', 'background-color': '#17a2b8' }} >
                        <div className="row">
                            <div className="col-12 text-center" style={{ 'margin-top': '10px', 'margin-bottom': '30px' }}>
                                <p style={{ 'color': 'aliceblue', 'margin-bottom': '0px' }}>This Edition <span class="badge badge-secondary">{ this.props.edition.edition }</span></p>
                                <span className="badge badge-secondary">{ this.props.edition.editionFrom }</span> <span style={{ 'color': 'aliceblue' }}>-</span> <span class="badge badge-secondary">{ this.props.edition.editionTo }</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="card col-2 text-center" style={{ 'background-color': '#17a2b8' }}></div>
                            <div className="card col-4 text-center" style={{ 'border': '1px solid rgba(0,0,0,.125)', 'border-radius': '3%', 'background-color': '#17a2b8' }}>
                                <div className="text-center" style={{ 'padding-top': '5px', 'padding-bottom': '5px', 'background-color': '#17a2b8' }}>
                                    <span style={{ 'font-size': '50px', 'color': '#34495E' }}>
                                        <FontAwesomeIcon icon={faSpinner} />
                                    </span>
                                </div>

                                <div className="card-body" style={{ 'padding': '10px' }}>
                                    <div className="col-12 text-center" style={{ 'padding-bottom': '5px', 'padding-top': '5px' }}>
                                        <h4 className="display-4" style={{ 'color': '#34495E', 'font-size': '20px', 'padding-bottom': '10px' }}>
                                            Total DIMES <strong style={{ 'color': '#cce5ff'}}>BOOKED</strong>
                                        </h4>

                                        { this.populateTotalWinningAmount(this.calculateTotalBookedNumbers()) }

                                    </div>
                                </div>
                                <div className="card-footer" style={{ 'text-align': 'right' }}>
                                    <small style={{ 'color': '#cce5ff' }}>Spread the word, let others book DIMES</small>
                                </div>
                            </div>
                            <div className="card col-4 text-center" style={{ 'border': '1px solid rgba(0,0,0,.125)', 'border-radius': '3%', 'background-color': '#17a2b8' }}>
                                <div className="text-center" style={{ 'padding-top': '5px', 'padding-bottom': '5px', 'background-color': '#17a2b8' }}>
                                    <span style={{ 'font-size': '50px', 'color': '#34495E' }}>
                                        <FontAwesomeIcon icon={faHandHoldingUsd} />
                                    </span>
                                </div>

                                <div className="card-body" style={{ 'padding': '10px' }}>
                                    <div className="col-12 text-center" style={{ 'padding-bottom': '5px', 'padding-top': '5px' }}>
                                        <h4 className="display-4" style={{ 'color': '#34495E', 'font-size': '20px', 'padding-bottom': '10px' }}>
                                            Cash Price for this <strong style={{ 'color': '#cce5ff'}}>EDITION</strong>
                                        </h4>

                                        { this.populateSign('$') }
                                        { this.populateTotalWinningAmount(this.calculateTotalWinningAmount()) }

                                    </div>
                                </div>
                                <div className="card-footer" style={{ 'text-align': 'right' }}>
                                    <small style={{ 'color': '#cce5ff' }}>More DIMES booked, will increase the final Cash Price</small>
                                </div>
                            </div>
                            <div className="card col-2 text-center" style={{ 'background-color': '#17a2b8' }}></div>
                        </div>

                    </div>
                    {/*End Countdown Timer*/}

                    {/*Leaderboard*/}
                    <div className="container-fluid text-center" style={{ 'padding-top': '30px', 'background-color': '#34495E' }}>
                        <h4 className="display-4" style={{ 'color': '#336e7b', 'font-size': '30px' }}>
                            Leader <strong style={{ 'color': '#cce5ff'}}>BOARD</strong>
                        </h4>
                        <p style={{ 'color': 'aliceblue'}}> - Previous Edition Winners - </p>
                        <div className="row" style={{ 'padding-top': '20px' }}>
                            { this.populateLeaderBoard() }
                        </div>

                    </div>
                    {/*End Leaderboard*/}


                    {/*</div>*/}
                </div>
                <Footer/>
            </div>
        );
    }

}

UserDashboard.propTypes = {
    userInfo: PropTypes.oneOfType([
        PropTypes.shape({
            userName: PropTypes.string,
            date: PropTypes.string,
            bookedNumbers: PropTypes.array,
            dimesPurchaseHistory: PropTypes.string,
        }),
    ]),
    winningInfo: PropTypes.oneOfType([
        PropTypes.shape({
            edition: PropTypes.number,
            editionFrom: PropTypes.string,
            editionTo: PropTypes.string,
            winningNumber: PropTypes.string,
            winner: PropTypes.oneOfType([
                PropTypes.shape({
                    name: PropTypes.string,
                    userName: PropTypes.string,
                }),
            ]),
        }),
    ]),
    dashboard: PropTypes.oneOfType([
        PropTypes.shape({
            name: PropTypes.string,
            winningNumber: PropTypes.string,
            winningDate: PropTypes.string,
            edition: PropTypes.oneOfType([
                PropTypes.shape({
                    edition: PropTypes.number,
                    editionFrom: PropTypes.string,
                    editionTo: PropTypes.string,
                }),
            ]),
        }),
    ]),
    draw: PropTypes.oneOfType([
        PropTypes.shape({
            nextDraw: PropTypes.string,
            edition: PropTypes.oneOfType([
                PropTypes.shape({
                    edition: PropTypes.number,
                    editionFrom: PropTypes.string,
                    editionTo: PropTypes.string,
                }),
            ]),
        }),
    ]),
    edition: PropTypes.oneOfType([
        PropTypes.shape({
            edition: PropTypes.number,
            editionFrom: PropTypes.string,
            editionTo: PropTypes.string
        }),
    ]),
    tempBookedNumbersForAllUsers: PropTypes.array.isRequired,
    fetchUserBookedNumbers: PropTypes.func,
    fetchLastEditionWinningNumber: PropTypes.func,
    fetchPrevWinnersForDashboard: PropTypes.func,
    fetchNextDrawTime: PropTypes.func,
    fetchCurrentEdition: PropTypes.func,
    fetchTempBookedNumbersFromCache: PropTypes.func,
};

UserDashboard.defaultProps = {
    userInfo: {
        userName: '',
        date: '',
        bookedNumbers: [],
        dimesPurchaseHistory: '0',
    },
    winningInfo: {
        edition: '',
        editionFrom: '',
        editionTo: '',
        winningNumber: '',
        winner: {
            name: '',
            userName: ''
        }
    },
    dashboard: [
        {
            name: '',
            winningNumber: '',
            winningDate: '',
            edition: {
                editionFrom: '',
                editionTo: '',
                edition: 0
            }
        }
    ],
    draw: {
        nextDraw: '',
        edition: {
            editionFrom: '',
            editionTo: '',
            edition: 0
        }
    },
    edition: {
        editionFrom: '',
        editionTo: '',
        edition: 0
    },
    tempBookedNumbersForAllUsers: [],
};

export default connect(
    (state) => (
        {
            userInfo: state.get('userInfo'),
            winningInfo: state.get('winningInfo'),
            dashboard: state.get('dashboard'),
            draw: state.get('draw'),
            edition: state.get('edition'),
            tempBookedNumbersForAllUsers: state.get('tempBookedNumbersForAllUsers'),
        }),
    {
        fetchUserBookedNumbers,
        fetchLastEditionWinningNumber,
        fetchPrevWinnersForDashboard,
        fetchNextDrawTime,
        fetchCurrentEdition,
        fetchTempBookedNumbersFromCache,
    }
)(withRouter(UserDashboard));
