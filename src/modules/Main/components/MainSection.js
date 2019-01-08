import React from 'react';
import PropTypes from 'prop-types';
import { faSearch, faShoppingCart, faAward, faTrophy, faLightbulb, faSpinner, faHandHoldingUsd, faFeatherAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchNextDrawTime, fetchCurrentEdition, fetchTempBookedNumbersFromCache } from '../../effects';
import '../../../style/bootstrap/css/bootstrap.min.css'
import '../../../style/style.css'
import NavBar from './NavBar';
import Footer from './Footer';
import moment from 'moment';
import CountdownTimer from './CountdownTimer';

export class MainSection extends React.Component {

    componentDidMount(){
        this.props.fetchNextDrawTime();
        this.props.fetchCurrentEdition();
        this.props.fetchTempBookedNumbersFromCache();
    }

    countDownTimer = () => {
        const { draw } = this.props;
        return (
            <CountdownTimer endDate={moment.utc(draw.nextDraw, 'YYYY-MM-DD hh:mm:ss')}/>
        );
    };

    getDigits = (n) => {
        return Array.from(String(n), Number);
    };

    populateNumber = (number, fontSize) => {
        let digits = this.getDigits(number);

        return digits.map( (e, i) =>
            <button
                key={i}
                type="button"
                className="btn"
                style={{ 'background-color': '#34495E', 'color': 'aliceblue', 'border-bottom-style': 'solid', 'border-bottom': '2px solid aliceblue', 'font-size': fontSize, 'margin-right': '2px' }}
            >
                {e}
            </button>
        )
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

    populateSign = (sign) => {
        return (
            <button
                type="button"
                className="btn"
                style={{ 'background-color': '#34495E', 'color': 'aliceblue', 'font-size': '25px', 'margin-right': '2px' }}
            >
                {sign}
            </button>
        );
    };

    render () {

        return (
            <div>
                <NavBar/>
                {/*Main section Container*/}
                <div classNameName="container-fluid">
                    {/*Main intro section*/}
                    <div className="row text-center" style={{ 'height': '500px', 'max-height': '500px', 'padding-top': '40px','padding-bottom': '10px', 'margin-bottom': '10px', 'margin-right': '0px' }}>
                        <div className="col-12">
                            <h1 className="display-4" style={{'color': '#336e7b'}}>Deep<strong style={{ 'color': '#cce5ff'}}>POCKET</strong></h1>
                            <p className="lead" style={{'color': '#336e7b'}}>Strategic, Persistence, Luck</p>


                            <div className="container" style={{ 'margin-top': '30px' }}>

                                <div className="container text-center">
                                    <div className="btn" style={{ 'border-radius': '100%', 'width': '200px', 'height': '200px', 'margin-right': '2em', 'margin-top': '10px' }}>

                                        <div id="step1">
                                            <button className="btn btn-outline-info" style={{ 'width': '40px',  'height': '40px', 'border-radius': '100%', 'border': '2px dotted #34495E', 'color': '#34495E' }}>1</button>
                                        </div>
                                        <div>
                                            <span style={{ 'font-size': '70px', 'color': '#34495E' }}>
                                                <FontAwesomeIcon icon={faSearch} />
                                            </span>
                                        </div>
                                        <div>
                                            <p style={{ 'color': '#34495E' }}>SEARCH</p>
                                        </div>

                                    </div>

                                    <div className="btn" style={{ 'border-radius': '100%', 'width': '200px', 'height': '200px', 'margin-right': '2em' }}>

                                        <div id="step2">
                                            <button className="btn btn-outline-info" style={{ 'width': '40px',  'height': '40px', 'border-radius': '100%', 'border': '2px dotted #34495E', 'color': '#34495E' }}>2</button>
                                        </div>
                                        <div>
                                            <span style={{ 'font-size': '70px', 'color': '#34495E' }}>
                                                <FontAwesomeIcon icon={faShoppingCart} />
                                            </span>
                                        </div>
                                        <div>
                                            <p style={{ 'color': '#34495E' }}>BOOK</p>
                                        </div>
                                    </div>

                                    <div className="btn" style={{ 'border-radius': '100%', 'width': '200px', 'height': '200px' }}>
                                        <div id="step3">
                                            <button className="btn btn-outline-info" style={{ 'width': '40px',  'height': '40px', 'border-radius': '100%', 'border': '2px dotted #34495E', 'color': '#34495E' }}>3</button>
                                        </div>
                                        <div>
                                            <span style={{ 'font-size': '70px', 'color': '#34495E' }}>
                                                <FontAwesomeIcon icon={faAward} />
                                            </span>
                                        </div>
                                        <div>
                                            <p style={{ 'color': '#34495E' }}>WIN</p>
                                        </div>
                                    </div>

                                </div>

                            </div>

                            <div className="container" style={{ 'float': 'none', 'margin': '25px auto 0' }}>
                                <div id="main-search-button" style= {{ 'margin-top': '25px' }}>
                                    <Link className="btn btn-info btn-lg" to="/book">
                                        Go for It
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*End Main intro section**/}

                    {/*Main description section*/}
                    <div className="container-fluid text-center" style={{ 'padding-top': '30px', 'padding-bottom': '10px', 'background-color': '#34495E' }}>
                        <div className="row">
                            <div className="col-12 text-center">
                                <h4 className="display-4" style={{ 'color': '#336e7b', 'font-size': '25px' }}>
                                    What is Deep <strong style={{ 'color': '#cce5ff'}}>POCKET</strong>
                                </h4>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-6" style={{ 'border-right': '2px dotted aliceblue', 'height': '40px', 'margin-left': '2px', 'margin-top': '5px', 'margin-bottom': '5px' }}>
                            </div>
                        </div>

                        <div className="row text-center">
                            <div className="col-12 text-center">
                                <h5 style={{ 'color': 'aliceblue' }}>Search</h5>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-6" style={{ 'border-right': '2px dotted aliceblue', 'height': '40px', 'margin-top': '5px', 'margin-bottom': '5px', 'margin-left': '2px' }}>
                            </div>
                        </div>

                        <div className="row">
                            <div className="card col-4 text-center" style={{ 'border': '1px solid rgba(0,0,0,.125)', 'border-radius': '3%', 'background-color': '#34495E' }}>
                                <div className="text-center" style={{ 'padding-top': '5px', 'padding-bottom': '5px', 'background-color': '#34495E' }}>
                                    <button className="btn btn-outline-info" style={{ 'width': '40px',  'height': '40px', 'border-radius': '100%', 'border': '2px dotted aliceblue' }}>1</button>
                                </div>

                                <div className="card-body" style={{ 'padding': '10px' }}>
                                    <div className="col-12 text-center" style={{ 'padding-bottom': '5px', 'padding-top': '5px' }}>
                                        <h4 className="display-4" style={{ 'color': '#336e7b', 'font-size': '20px', 'padding-bottom': '10px' }}>
                                            Search a <strong style={{ 'color': '#cce5ff'}}>DIME</strong>
                                        </h4>
                                        <p style={{ 'color': 'aliceblue', 'text-align': 'left' }}>Search a single DIME by typing the desired value</p>
                                        <p style={{ 'color': 'aliceblue', 'margin-bottom': '1px' }}>A DIME is between</p>
                                        <div style={{ 'padding-bottom': '10px', 'margin-bottom': '20px' }}>
                                            { this.populateNumber('0000', '15px') } <span style={{ 'color': 'aliceblue' }}>-</span> { this.populateNumber('9999', '15px') }
                                        </div>
                                        <p style={{ 'color': 'aliceblue', 'text-align': 'left' }}>Can book up to <span class="badge badge-secondary">10</span> DIMES in an Edition</p>
                                    </div>
                                </div>
                                <div className="card-footer" style={{ 'text-align': 'right', 'padding-top': '6px' }}>
                                    <small className="text-muted">A DIME is a <span class="badge badge-secondary">4</span> digit number, eg: { this.populateNumber('9438', '10px') }</small>
                                </div>
                            </div>
                            <div className="card col-4 text-center" style={{ 'border': '1px solid rgba(0,0,0,.125)', 'border-radius': '3%', 'background-color': '#34495E' }}>
                                <div className="text-center" style={{ 'padding-top': '5px', 'padding-bottom': '5px', 'background-color': '#34495E' }}>
                                    <button className="btn btn-outline-info" style={{ 'width': '40px',  'height': '40px', 'border-radius': '100%', 'border': '2px dotted aliceblue' }}>2</button>
                                </div>

                                <div className="card-body" style={{ 'padding': '10px' }}>
                                    <div className="col-12 text-center" style={{ 'padding-bottom': '5px', 'padding-top': '5px' }}>
                                        <h4 className="display-4" style={{ 'color': '#336e7b', 'font-size': '20px', 'padding-bottom': '10px' }}>
                                            Fast <strong style={{ 'color': '#cce5ff'}}>TRACK</strong>
                                        </h4>
                                        <p style={{ 'color': 'aliceblue', 'text-align': 'justify' }}>Selecting up to <span class="badge badge-secondary">10</span> DIMES by searching individually can be a tedious task, as some DIMES are already booked</p>
                                        <p style={{ 'color': 'aliceblue', 'text-align': 'justify', 'margin-bottom': '10px' }}>Fast track, randomly picks up <span class="badge badge-secondary">10</span> DIMES for you.</p>
                                        <p style={{ 'color': 'aliceblue', 'text-align': 'justify' }}>You can decide whether to book all <span class="badge badge-secondary">10</span> DIMES or reduce the count by removing from My <strong style={{ 'color': '#336e7b'}}>POCKET</strong></p>
                                    </div>
                                </div>
                                <div className="card-footer" style={{ 'text-align': 'right' }}>
                                    <small className="text-muted">My Pocket is the DIME cart</small>
                                </div>
                            </div>
                            <div className="card col-4 text-center" style={{ 'border': '1px solid rgba(0,0,0,.125)', 'border-radius': '3%', 'background-color': '#34495E' }}>
                                <div className="text-center" style={{ 'padding-top': '5px', 'padding-bottom': '5px', 'background-color': '#34495E' }}>
                                    <button className="btn btn-outline-info" style={{ 'width': '40px',  'height': '40px', 'border-radius': '100%', 'border': '2px dotted aliceblue' }}>3</button>
                                </div>

                                <div className="card-body" style={{ 'padding': '10px' }}>
                                    <div className="col-12 text-center" style={{ 'padding-bottom': '5px', 'padding-top': '5px' }}>
                                        <h4 className="display-4" style={{ 'color': '#336e7b', 'font-size': '20px', 'padding-bottom': '10px' }}>
                                            Click a <strong style={{ 'color': '#cce5ff'}}>DIME</strong>
                                        </h4>
                                        <p style={{ 'color': 'aliceblue', 'text-align': 'justify' }}>Sometimes you want to add DIMES to My <strong style={{ 'color': '#336e7b'}}>POCKET</strong> fast, but doesn't want to go with randomly selected DIMES</p>
                                        <p style={{ 'color': 'aliceblue', 'text-align': 'justify' }}>DIME pool is a convenient and fast way to select DIMES, the nav bar shows the preceding digit of a DIME.</p>
                                        <p style={{ 'color': 'aliceblue', 'text-align': 'justify', 'margin-bottom': '10px' }}>So if you want to book { this.populateNumber('7019', '10px') }, click <span class="badge badge-secondary">7</span> on the nav bar and scroll down until you find the desired DIME</p>
                                        <p style={{ 'color': 'aliceblue', 'text-align': 'left' }}>Already booked DIMES will be displayed in <span style={{ 'color':'#c0392b' }}>RED</span></p>
                                    </div>
                                </div>
                                <div className="card-footer" style={{ 'text-align': 'right' }}>
                                    <small className="text-muted">DIME pool is a DIME display to easily navigate and book DIMES</small>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-6" style={{ 'border-right': '2px dotted aliceblue', 'height': '40px', 'margin-top': '5px', 'margin-bottom': '5px', 'margin-left': '2px' }}>
                            </div>
                        </div>

                        <div className="row text-center">
                            <div className="col-12 text-center">
                                <h5 style={{ 'color': 'aliceblue' }}>Book</h5>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-6" style={{ 'border-right': '2px dotted aliceblue', 'height': '40px', 'margin-top': '5px', 'margin-bottom': '5px', 'margin-left': '2px' }}>
                            </div>
                        </div>

                        <div className="row">
                            <div className="card col-6 text-center" style={{ 'border': '1px solid rgba(0,0,0,.125)', 'border-radius': '3%', 'background-color': '#34495E' }}>
                                <div className="text-center" style={{ 'padding-top': '5px', 'padding-bottom': '5px', 'background-color': '#34495E' }}>
                                    <button className="btn btn-outline-info" style={{ 'width': '40px',  'height': '40px', 'border-radius': '100%', 'border': '2px dotted aliceblue' }}>3</button>
                                </div>

                                <div className="card-body" style={{ 'padding': '10px' }}>
                                    <div className="col-12 text-center" style={{ 'padding-bottom': '5px', 'padding-top': '5px' }}>
                                        <h4 className="display-4" style={{ 'color': '#336e7b', 'font-size': '20px', 'padding-bottom': '10px' }}>
                                            Edition <strong style={{ 'color': '#cce5ff'}}>RANGE</strong>
                                        </h4>
                                        <p style={{ 'color': 'aliceblue', 'text-align': 'left' }}>Booking commences from <span class="badge badge-secondary">17:30:00</span> hrs in <span class="badge badge-secondary">UTC</span> time and ends in <span class="badge badge-secondary">2<sup>nd</sup></span> evening at <span class="badge badge-secondary">16:45:00</span> hrs in <span class="badge badge-secondary">UTC</span></p>
                                        <p style={{ 'color': 'aliceblue', 'margin-bottom': '1px' }}>Eg: Edition Time interval</p>
                                        <span class="badge badge-secondary">2019-01-15 17:30:00 UTC</span> <span style={{ 'color': 'aliceblue' }}>-</span> <span class="badge badge-secondary">2019-01-17 16:45:00 UTC</span>
                                        <p style={{ 'color': 'aliceblue', 'text-align': 'left', 'margin-top': '20px' }}>No booking is allowed during <span class="badge badge-secondary">16:45:00</span> hrs in <span class="badge badge-secondary">UTC</span> to <span class="badge badge-secondary">17:30:00</span> hrs in <span class="badge badge-secondary">UTC</span> at the end of an Edition till the next Edition commences</p>
                                        <p style={{ 'color': 'aliceblue', 'margin-bottom': '1px' }}>Eg: Booking not allowed time interval</p>
                                        <span class="badge badge-secondary">2019-01-17 16:45:00 UTC</span> <span style={{ 'color': 'aliceblue' }}>-</span> <span class="badge badge-secondary">2019-01-17 17:30:00 UTC</span>
                                    </div>
                                </div>
                                <div className="card-footer" style={{ 'text-align': 'right', 'padding-top': '6px' }}>
                                    <small className="text-muted">The sooner the better</small>
                                </div>
                            </div>
                            <div className="card col-6 text-center" style={{ 'border': '1px solid rgba(0,0,0,.125)', 'border-radius': '3%', 'background-color': '#34495E' }}>
                                <div className="text-center" style={{ 'padding-top': '5px', 'padding-bottom': '5px', 'background-color': '#34495E' }}>
                                    <button className="btn btn-outline-info" style={{ 'width': '40px',  'height': '40px', 'border-radius': '100%', 'border': '2px dotted aliceblue' }}>4</button>
                                </div>

                                <div className="card-body" style={{ 'padding': '10px' }}>
                                    <div className="col-12 text-center" style={{ 'padding-bottom': '5px', 'padding-top': '5px' }}>
                                        <h4 className="display-4" style={{ 'color': '#336e7b', 'font-size': '20px', 'padding-bottom': '10px' }}>
                                            Draw <strong style={{ 'color': '#cce5ff'}}>TIME</strong>
                                        </h4>
                                        <p style={{ 'color': 'aliceblue', 'text-align': 'justify' }}>Winning DIME and the Winner will be announced at <span class="badge badge-secondary">17:00:00</span> hrs in <span class="badge badge-secondary">UTC</span> at the end of an Edition</p>
                                        <p style={{ 'color': 'aliceblue', 'margin-bottom': '1px' }}>Eg: Winner Selection time</p>
                                        <span class="badge badge-secondary">2019-01-17 17:00:00 UTC</span>
                                        <p style={{ 'color': 'aliceblue', 'margin-top': '20px', 'margin-bottom': '0px' }}>DIMES can be booked via</p>
                                        <p style={{ 'margin-top': '2px', 'font-size': '30px' }}><span style={{ 'color': '#222d65'}}>Pay</span><span style={{ 'color': '#169bd7'}}>Pal</span></p>
                                    </div>
                                </div>
                                <div className="card-footer" style={{ 'text-align': 'right', 'padding-top': '6px' }}>
                                    <small className="text-muted"><span style={{ 'color': '#222d65'}}>Pay</span><span style={{ 'color': '#169bd7'}}>Pal</span> is a secure, hassle free payment option</small>
                                </div>
                            </div>

                        </div>

                        <div className="row">
                            <div className="col-6" style={{ 'border-right': '2px dotted aliceblue', 'height': '40px', 'margin-top': '5px', 'margin-bottom': '5px', 'margin-left': '2px' }}>
                            </div>
                        </div>

                        <div className="row text-center">
                            <div className="col-12 text-center">
                                <h5 style={{ 'color': 'aliceblue' }}>Win</h5>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-6" style={{ 'border-right': '2px dotted aliceblue', 'height': '40px', 'margin-top': '5px', 'margin-bottom': '5px', 'margin-left': '2px' }}>
                            </div>
                        </div>

                        <div className="row">
                            <div className="card col-4 text-center" style={{ 'background-color': '#34495E' }}></div>
                            <div className="card col-4 text-center" style={{ 'border': '1px solid rgba(0,0,0,.125)', 'border-radius': '3%', 'background-color': '#34495E' }}>
                                <div className="text-center" style={{ 'padding-top': '5px', 'padding-bottom': '5px', 'background-color': '#34495E' }}>
                                    <button className="btn btn-info" style={{ 'width': '40px',  'height': '40px', 'border-radius': '100%', 'border': '2px dotted aliceblue' }}>5</button>
                                </div>

                                <div className="card-body" style={{ 'padding': '10px' }}>
                                    <div className="col-12 text-center" style={{ 'padding-bottom': '5px', 'padding-top': '5px' }}>
                                        <h4 className="display-4" style={{ 'color': '#336e7b', 'font-size': '20px', 'padding-bottom': '10px' }}>
                                            Become a <strong style={{ 'color': '#cce5ff'}}>WINNER</strong>
                                        </h4>

                                        <p style={{ 'color': 'aliceblue', 'padding-top': '10px' }}>Win upto</p>
                                        { this.populateSign('$') } { this.populateTotalWinningAmount('40') }{ this.populateSign(',') } { this.populateTotalWinningAmount('000') }
                                    </div>
                                </div>
                                <div className="card-footer" style={{ 'text-align': 'right' }}>
                                    <small className="text-muted">Winner Winner Chicken Dinner</small>
                                </div>
                            </div>
                            <div className="card col-4 text-center" style={{ 'background-color': '#34495E' }}></div>
                        </div>

                    </div>
                    {/*End Main description section*/}

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
                                <span class="badge badge-secondary">{ this.props.edition.editionFrom }</span> <span style={{ 'color': 'aliceblue' }}>-</span> <span class="badge badge-secondary">{ this.props.edition.editionTo }</span>
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
                                        {/*{ this.populateSign(',') } */}
                                        {/*{ this.populateTotalWinningAmount('050') }*/}
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
                                        {/*{ this.populateSign(',') }*/}
                                        {/*{ this.populateTotalWinningAmount('200') }*/}
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

                    {/*Main description section*/}
                    <div className="container-fluid" style={{ 'padding-top': '30px', 'padding-bottom': '10px', 'background-color': '#34495E' }}>

                        <div className="row">
                            <div className="col-12 text-center">
                                <h4 className="display-4" style={{ 'color': '#336e7b', 'font-size': '25px', 'margin-bottom': '20px' }}>
                                    Why Deep <strong style={{ 'color': '#cce5ff'}}>POCKET</strong>
                                </h4>
                            </div>
                        </div>

                        <div className="row">

                            <div className="card col-4 text-center" style={{ 'border': '1px solid rgba(0,0,0,.125)', 'border-radius': '3%', 'background-color': '#34495E' }}>
                                <div className="text-center" style={{ 'padding-top': '5px', 'padding-bottom': '5px', 'background-color': '#34495E' }}>
                                    <span style={{ 'font-size': '30px', 'color': '#336e7b' }}>
                                        <FontAwesomeIcon icon={faFeatherAlt} />
                                    </span>
                                </div>

                                <div className="card-body" style={{ 'padding': '10px' }}>
                                    <div className="col-12 text-center" style={{ 'padding-bottom': '5px', 'padding-top': '5px' }}>
                                        <h4 className="display-4" style={{ 'color': '#336e7b', 'font-size': '20px', 'padding-bottom': '10px' }}>
                                            Lu<strong style={{ 'color': '#cce5ff'}}>ck</strong>
                                        </h4>
                                        <p style={{ 'color': '#cce5ff' }}>In order to increase your winning potential, use the same account for a longer period and
                                            get as many DIMES as possible</p>
                                    </div>
                                </div>
                            </div>
                            <div className="card col-4 text-center" style={{ 'border': '1px solid rgba(0,0,0,.125)', 'border-radius': '3%', 'background-color': '#34495E' }}>
                                <div className="text-center" style={{ 'padding-top': '5px', 'padding-bottom': '5px', 'background-color': '#34495E' }}>
                                    <span style={{ 'font-size': '30px', 'color': '#336e7b' }}>
                                        <FontAwesomeIcon icon={faLightbulb} />
                                    </span>
                                </div>

                                <div className="card-body" style={{ 'padding': '10px' }}>
                                    <div className="col-12 text-center" style={{ 'padding-bottom': '5px', 'padding-top': '5px' }}>
                                        <h4 className="display-4" style={{ 'color': '#336e7b', 'font-size': '20px', 'padding-bottom': '10px' }}>
                                            Str<strong style={{ 'color': '#cce5ff'}}>ategic</strong>
                                        </h4>
                                        <p style={{ 'color': '#cce5ff' }}>We want people to win. Instead of randomly picking a winner, our intention is to create a platform
                                            that will provide a higher chance of succeeding instead of just been lucky</p>
                                    </div>
                                </div>
                            </div>
                            <div className="card col-4 text-center" style={{ 'border': '1px solid rgba(0,0,0,.125)', 'border-radius': '3%', 'background-color': '#34495E' }}>
                                <div className="text-center" style={{ 'padding-top': '5px', 'padding-bottom': '5px', 'background-color': '#34495E' }}>
                                    <span style={{ 'font-size': '30px', 'color': '#336e7b' }}>
                                        <FontAwesomeIcon icon={faTrophy} />
                                    </span>
                                </div>

                                <div className="card-body" style={{ 'padding': '10px' }}>
                                    <div className="col-12 text-center" style={{ 'padding-bottom': '5px', 'padding-top': '5px' }}>
                                        <h4 className="display-4" style={{ 'color': '#336e7b', 'font-size': '20px', 'padding-bottom': '10px' }}>
                                            Per<strong style={{ 'color': '#cce5ff'}}>sistence</strong>
                                        </h4>
                                        <p style={{ 'color': '#cce5ff' }}>Be Persistent and be Successful</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*End Main description section*/}

                </div>
                {/*End main section container*/}

                <Footer/>

            </div>
        );
    }

}

MainSection.propTypes = {
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
    fetchNextDrawTime: PropTypes.func,
    fetchCurrentEdition: PropTypes.func,
    fetchTempBookedNumbersFromCache: PropTypes.func,
};

MainSection.defaultProps = {
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
            draw: state.get('draw'),
            edition: state.get('edition'),
            tempBookedNumbersForAllUsers: state.get('tempBookedNumbersForAllUsers'),
        }),
    {
        fetchNextDrawTime,
        fetchCurrentEdition,
        fetchTempBookedNumbersFromCache,
    }
)(MainSection);