import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { faDollarSign, faCartPlus, faCreditCard, faWallet, faHandHoldingUsd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { bookTempNumbers } from '../../actions';
import { isBookingAllowedForUser, bookNumbers } from '../../effects';
import PaypalExpressBtn from 'react-paypal-express-checkout';
import swal from 'sweetalert2'
import auth0Client from '../../auth/Auth';
import '../../../style/bootstrap/css/bootstrap.min.css'
import '../../../style/style.css'

const spanStyle = {
    'padding-right': '1em'
};

const lineStyleForFastTrack = {
    'border-bottom': '1px dotted #fff'
};

export class TempBookedNumberCollection extends React.Component {

    paymentOnSuccess = (payment) => {
        const { tempBookedNumbers } = this.props;

        const paymentReceipt = {
            user: {
                userName: auth0Client.profile.nickname,
                name: auth0Client.profile.name,
                sub: auth0Client.profile.sub,
            },
            payment: {
                payerEmail: payment.email,
                payerId: payment.payerID,
                paymentId: payment.paymentID,
                paymentSuccess: payment.paid,
                paymentCancelled: payment.cancelled
            },
            purchasedNumbers: tempBookedNumbers,
            purchasedNumberCount: tempBookedNumbers.length,
        };

        this.props.bookNumbers(paymentReceipt);
        this.props.bookTempNumbers([]);
    };

    paymentOnCancel = (data) => {
        console.log('The payment was cancelled!');
    };

    paymentOnError = (err) => {
        console.log("Error!");
    };

    removeSelectedDime = (e) => {
        const { tempBookedNumbers } = this.props;
        const idx = tempBookedNumbers.indexOf(e);
        const reducedNumberArray = tempBookedNumbers.slice();
        reducedNumberArray.splice(idx, 1);
        if (reducedNumberArray){
            this.props.bookTempNumbers(reducedNumberArray);
        }
    };

    getDigits = (n) => {
        return Array.from(String(n), Number);
    };

    formatValue = (number) => {
        let digits = this.getDigits(number);

        return digits.map( (e, i) =>
            <span style={spanStyle} key={i}>
                    <span style={lineStyleForFastTrack}>{e}</span>
            </span>
        );
    };

    displayNumbers = (numbers) => {
        return numbers.map( (e, i) =>
                <button
                    title="Click to REMOVE from My Pocket"
                    onClick={() => this.removeSelectedDime(e)}
                    key={i}
                    type="button"
                    className="btn btn-info"
                    style={{ 'color': 'aliceblue', 'border-radius': '100%', 'width': '110px', 'height': '110px', 'margin-right': '1px', 'margin-left': '1px' }}
                >
                    { this.formatValue(e) }
                </button>
        )
    };

    redirectToLogin = () => {
        swal({
            title: 'Login/Signup',
            text: 'login/signup to proceed with the payments',
            showLoaderOnConfirm: true,
            showCancelButton: true,
            confirmButtonText: 'Login/Signup',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
        }).then((result) => {
            if (result.value) {
                auth0Client.signIn();
            }
        })
    };

    NotifySelectDimes = () => {
        if (auth0Client.lockNumberBooking) {
            return (
                swal({
                    type: 'error',
                    title: 'Oops...',
                    text: 'You have already booked DIMES for Dec-12-2018 edition',
                })
            )
        }
        swal({
            type: 'error',
            title: 'Oops...',
            text: 'Please select DIMES to proceed with the payment',
        })
    };

    paypalModel = () => {
        swal({
            title: 'Login/Signup',
            text: 'login/signup to proceed with the payments',
            showLoaderOnConfirm: true,
            showCancelButton: true,
            confirmButtonText: 'Login/Signup',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
        }).then((result) => {
            if (result.value) {
                this.renderPaypalButton();
            }
        })
    };

    renderPaypalButton = () => {
        const env = process.env.REACT_APP_PAYPAL_ENV;
        const currency = 'USD';
        const singleNumberCost = 5;
        const style = {
                color: 'blue',      // 'gold, 'blue', 'silver', 'black'
                size:  'medium',    // 'medium', 'small', 'large', 'responsive'
                shape: 'rect',      // 'rect', 'pill'
                tagline: false,
                fundingicons: true,
        };
        const funding = {
            allowed: [ 'paypal.FUNDING.CARD' ]
        };
        const client = {
            sandbox: process.env.REACT_APP_PAYPAL_CLIENT_ID_SANDBOX,
            production: process.env.REACT_APP_PAYPAL_CLIENT_ID_PRODUCTION,
        };

        return (
            <PaypalExpressBtn
                env={env}
                client={client}
                currency={currency}
                total={this.props.totalCost}
                shipping={1}
                onError={this.paymentOnError}
                onSuccess={this.paymentOnSuccess}
                onCancel={this.paymentOnCancel}
                style={style}
            />
        );
    };

    render() {

        return (
            <div className="container-fluid" id="wrapper-for-selected-numbers"
                 style={{ 'background-color': '#336e7b', 'padding-top': '5px', 'padding-bottom': '5px', 'margin-top': '10px', 'padding-right': '0px', 'padding-left': '0px' }}>

                <div className="container text-center" style={{ 'padding-top': '10px', 'margin-top': '20px', 'margin-bottom': '20px' }}>
                    {/*<h4 style={{ 'color': 'aliceblue' }}>My Pocket</h4>*/}
                    <h4 className="display-4" style={{ 'color': '#17a2b8', 'font-size': '30px' }}>
                        My <strong style={{ 'color': '#cce5ff'}}>POCKET</strong>
                    </h4>
                </div>

                <div className="container text-center" style={{ 'padding-top': '10px', 'margin-top': '10px', 'margin-bottom': '10px' }}>
                    {this.displayNumbers(this.props.tempBookedNumbers)}
                </div>

                <div className="container-fluid text-center" style={{ 'background-color': '#34495e', 'height': '155px', 'color': 'aliceblue', 'padding-top': '10px' }}>
                    <p style={{ 'color': '#cce5ff', 'margin-bottom': '1px' }}>Total Worth of <strong>DIMES</strong></p>
                    <button
                        type="button"
                        className="btn btn-info"
                        style={{ 'color': 'aliceblue', 'border-radius': '100%', 'width': '70px', 'height': '70px', 'margin-right': '1px', 'margin-left': '1px' }}
                    >
                        <FontAwesomeIcon icon={faDollarSign} /> {this.props.totalCost}
                    </button>
                    <br/>
                    <span style={{ 'font-size': '30px' }}>
                           <FontAwesomeIcon icon={faWallet} /> <FontAwesomeIcon icon={faCreditCard} /> <FontAwesomeIcon icon={faHandHoldingUsd} />
                    </span>

                </div>

                <div className="container text-center" style={{ 'padding-top': '10px', 'margin-top': '10px', 'margin-bottom': '10px' }}>
                    {
                        !auth0Client.isAuthenticated() &&
                            <button onClick={this.redirectToLogin} type="button" className="btn btn-info" data-toggle="modal" data-target="#exampleModal" >
                                Book
                            </button>

                    }
                    {
                        auth0Client.isAuthenticated() && !this.props.isBookingAllowedInfoOfUser.isBookingAllowed &&
                        <button disabled={true} type="button" className="btn btn-info" data-toggle="modal" data-target="#exampleModal" >
                            Already Booked
                        </button>
                    }
                    {
                        auth0Client.isAuthenticated() && this.props.isBookingAllowedInfoOfUser.isBookingAllowed && this.props.totalCost <= 0 &&
                            <button onClick={this.NotifySelectDimes} type="button" className="btn btn-info" data-toggle="modal" data-target="#exampleModal" >
                                Book
                            </button>
                    }
                    {
                        auth0Client.isAuthenticated() && this.props.isBookingAllowedInfoOfUser.isBookingAllowed && this.props.totalCost > 0 &&
                            this.renderPaypalButton()
                    }
                </div>

            </div>
        );
    }

}

TempBookedNumberCollection.propTypes = {
    tempBookedNumbers: PropTypes.array.isRequired,
    bookTempNumbers: PropTypes.func,
    isBookingAllowedForUser: PropTypes.func,
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
    bookNumbers: PropTypes.func,
    totalCost: PropTypes.string.isRequired
};

TempBookedNumberCollection.defaultProps = {
    tempBookedNumbers: [],
    totalCost: 0,
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
            tempBookedNumbers: state.get('tempBookedNumbers'),
            isBookingAllowedInfoOfUser: state.get('userAlreadyBookedInfo'),
        }),
    {
        isBookingAllowedForUser,
        bookTempNumbers,
        bookNumbers
    }
)(TempBookedNumberCollection);
