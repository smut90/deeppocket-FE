import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import swal from 'sweetalert2';
import auth0Client from '../../auth/Auth';
import { setSearchValue, bookTempNumbers } from '../../actions';
import { isBookingAllowedForUser, fetchTempBookedNumbersFromCache } from '../../effects';
import '../../../style/bootstrap/css/bootstrap.min.css';
import '../../../style/style.css';

const inputStyle = {
    'background-color': 'transparent',
    'border': '0px solid',
    'text-align':'center',
    'height': '40px',
    'width': '40px',
    'border-bottom': '2px dotted #000',
    'margin-left':'2em',
};

export class SearchNumbers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchDigitOne: '',
            searchDigitTwo: '',
            searchDigitThree: '',
            searchDigitFour: '',
        };
    }

    componentDidMount(){
        const { isBookingAllowedInfoOfUser } = this.props;

        if (auth0Client.profile !== undefined && isBookingAllowedInfoOfUser) {

            if (isBookingAllowedInfoOfUser.isBookingAllowed) {
                // sessionStorage.setItem('isBookingAllowed', JSON.stringify(true));
                this.props.isBookingAllowedForUser(auth0Client.profile);

            }
        }
    }

    updateInputValueDigitOne(evt) {
        this.setState({
            searchDigitOne: evt.target.value
        });
    }

    updateInputValueDigitTwo(evt) {
        this.setState({
            searchDigitTwo: evt.target.value
        });
    }

    updateInputValueDigitThree(evt) {
        this.setState({
            searchDigitThree: evt.target.value
        });
    }

    updateInputValueDigitFour(evt) {
        this.setState(
            { searchDigitFour: evt.target.value }, () => { this.props.fetchTempBookedNumbersFromCache(); }
        );
    }

    checkSearchValueAvailability = (searchValue) => {
        //check on state or call to backend service
        const { tempBookedNumbersForAllUsers } = this.props;
        if (tempBookedNumbersForAllUsers !== null && tempBookedNumbersForAllUsers !== undefined) {
            return !tempBookedNumbersForAllUsers.includes(searchValue);
        }
        return true;
    };

    handleSearchNotification = (searchValue) => {
        const { tempNumbers, isBookingAllowedInfoOfUser } = this.props;
        if (!isBookingAllowedInfoOfUser.isBookingAllowed) {

            swal({
                type: 'error',
                title: 'Oops...',
                text: 'You have already booked DIMES for Edition - ' + isBookingAllowedInfoOfUser.edition,
            })

        } else if (isBookingAllowedInfoOfUser.numbersAllowedToBook === tempNumbers.length) {
            //notification for no number selection
            swal({
                type: 'error',
                title: 'Oops...',
                text: 'You have already selected the max allowed DIMES for Edition - ' + isBookingAllowedInfoOfUser.edition,
            })
        } else if (!searchValue) {
            //notification for no number selection
            swal({
                type: 'error',
                title: 'Oops...',
                text: 'Please enter a value to search',
            })
        }  else if (tempNumbers.includes(searchValue)) {
            swal({
                type: 'error',
                title: 'Oops...',
                text: 'Dime ' + searchValue + ' is already in my pocket',
            })
        } else {
            swal.queue([{
                title: 'Add Searched Dime',
                text: 'Add ' + searchValue + ' dime to my pocket?',
                showLoaderOnConfirm: true,
                showCancelButton: true,
                confirmButtonText: 'Add',
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                preConfirm: () => {
                    const available = this.checkSearchValueAvailability(searchValue);
                    if (available) {
                        const temp = tempNumbers.concat(searchValue);
                        this.props.bookTempNumbers(temp);
                        swal.insertQueueStep({
                            type: 'success',
                            title: 'Added!',
                            text: 'Dime ' + searchValue + ' has been added to my pocket'
                        })
                    } else {
                        swal.insertQueueStep({
                            type: 'error',
                            title: 'Dime ' + searchValue + ' already Booked!',
                            text: 'Search another dime'
                        })
                    }
                }
            }])
        }


    };

    validateDigit = (digit) => {
        const REGEX = new RegExp('[0-9]{1}');
        const match = REGEX.exec(digit);
        return match !== null && match.length > 0;
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

    handleSearchValue = () => {
        const { isBookingAllowedInfoOfUser } = this.props;
        const { searchDigitOne, searchDigitTwo, searchDigitThree, searchDigitFour } = this.state;
        const value = `${searchDigitOne}${searchDigitTwo}${searchDigitThree}${searchDigitFour}`;

        if (auth0Client.profile !== undefined && isBookingAllowedInfoOfUser) {

            if (isBookingAllowedInfoOfUser.isBookingAllowed) {
                // sessionStorage.setItem('isBookingAllowed', JSON.stringify(true));
                this.props.isBookingAllowedForUser(auth0Client.profile);
            }

        } else {
            this.setState({
                searchDigitOne: '', searchDigitTwo: '', searchDigitThree: '', searchDigitFour: ''
            });
            return this.redirectToLogin();
        }

        const searchValue = {
                one: searchDigitOne,
                two: searchDigitTwo,
                three: searchDigitThree,
                four: searchDigitFour,
                value: value,
        };

        //validate digits
        if (isNaN(searchValue.one)
            || isNaN(searchValue.two)
            || isNaN(searchValue.three)
            || isNaN(searchValue.four)) {
            //notification for search value not include numbers
            swal({
                type: 'error',
                title: 'Oops...',
                text: 'Searched DIME should only include numbers',
                showConfirmButton: false,
                showCancelButton: true,
                cancelButtonText: 'GOT IT'
            });
            this.setState({
                searchDigitOne: '', searchDigitTwo: '', searchDigitThree: '', searchDigitFour: ''
            });

        } else if(!this.validateDigit(searchValue.one)
            || !this.validateDigit(searchValue.two)
            || !this.validateDigit(searchValue.three)
            || !this.validateDigit(searchValue.four)) {

            swal({
                type: 'error',
                title: 'Oops...',
                text: 'Searched DIME should contain 4 digits ',
            });
            this.setState({
                searchDigitOne: '', searchDigitTwo: '', searchDigitThree: '', searchDigitFour: ''
            });

        } else {

            this.props.setSearchValue(searchValue);
            //check search value already booked
            this.handleSearchNotification(searchValue.value);

            this.setState({
                searchDigitOne: '', searchDigitTwo: '', searchDigitThree: '', searchDigitFour: ''
            });
        }
    };

    disableSearchButton = () => {
        const { tempNumbers } = this.props;

        return tempNumbers.length == 10

    };

    render() {
        return (

            // Search Numbers
            <div className="container">

                <div className="container text-center" style={{ 'padding-top': '10px', 'margin-top': '10px', 'margin-bottom': '10px', 'padding-bottom': '10px' }}>
                    <h4 className="display-4" style={{ 'color': '#336e7b', 'font-size': '30px' }}>
                        Search <strong style={{ 'color': '#cce5ff'}}>DIMES</strong>
                    </h4>
                    <span className="badge badge-secondary">SEARCH and add to My POCKET</span>
                </div>

                <div className="row">
                    <div id="wrapper-input-group" style={{ 'float': 'none', 'margin': '0 auto' }}>
                        <div className="input-group" >
                            <input
                                value={this.state.searchDigitOne}
                                onChange={evt => this.updateInputValueDigitOne(evt)}
                                type="text"
                                maxlength="1"
                                className="form-control"
                                placeholder="0"
                                size="1"
                                style={{ 'border': '0px solid', 'border-bottom': '2px dotted #000', 'background-color': 'transparent', 'text-align': 'center', 'margin-left':'2em', 'height': '40px', 'width': '40px', 'max-width': '40px', 'max-height': '40px' }}
                            />
                            <input
                                value={this.state.searchDigitTwo}
                                onChange={evt => this.updateInputValueDigitTwo(evt)}
                                type="text"
                                maxlength="1"
                                className="form-control"
                                placeholder="0"
                                size="1"
                                style={{ 'border': '0px solid', 'border-bottom': '2px dotted #000', 'background-color': 'transparent', 'text-align': 'center', 'margin-left':'2em', 'height': '40px', 'width': '40px', 'max-width': '40px', 'max-height': '40px' }}
                            />
                            <input
                                value={this.state.searchDigitThree}
                                onChange={evt => this.updateInputValueDigitThree(evt)}
                                type="text"
                                maxlength="1"
                                className="form-control"
                                placeholder="0"
                                size="1"
                                style={{ 'border': '0px solid', 'border-bottom': '2px dotted #000', 'background-color': 'transparent', 'text-align': 'center', 'margin-left':'2em', 'height': '40px', 'width': '40px', 'max-width': '40px', 'max-height': '40px' }}
                            />
                            <input
                                value={this.state.searchDigitFour}
                                onChange={evt => this.updateInputValueDigitFour(evt)}
                                type="text"
                                maxlength="1"
                                className="form-control"
                                placeholder="0"
                                size="1"
                                style={{ 'border': '0px solid', 'border-bottom': '2px dotted #000', 'background-color': 'transparent', 'text-align': 'center', 'margin-left':'2em', 'height': '40px', 'width': '40px', 'max-width': '40px', 'max-height': '40px' }}
                            />
                            <button
                                disabled={this.disableSearchButton()}
                                type="button"
                                className="btn btn-outline-dark"
                                style={{ 'margin-left': '1em' }}
                                onClick={this.handleSearchValue}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

SearchNumbers.propTypes = {
    searchValue: PropTypes.oneOfType([
        PropTypes.shape({
            one: PropTypes.number,
            two: PropTypes.number,
            three: PropTypes.number,
            four: PropTypes.number,
            value: PropTypes.string,
        }),
    ]),
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
    setSearchValue: PropTypes.func,
    tempNumbers: PropTypes.array.isRequired,
    tempBookedNumbersForAllUsers: PropTypes.array.isRequired,
    bookTempNumbers: PropTypes.func,
    fetchTempBookedNumbersFromCache: PropTypes.func,
};

SearchNumbers.defaultProps = {
    tempNumbers: [],
    tempBookedNumbersForAllUsers: [],
    searchValue: {
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        value: "0000",
    },
    isBookingAllowedInfoOfUser: {
        userName: '',
        edition: '',
        editionFrom: '',
        editionTo: '',
        isBookingAllowed: true,
        numbersAllowedToBook: 10,
    },
};

export default connect(
    (state) => (
        {
            searchValue: state.get('searchValue'),
            tempNumbers: state.get('tempBookedNumbers'),
            tempBookedNumbersForAllUsers: state.get('tempBookedNumbersForAllUsers'),
            isBookingAllowedInfoOfUser: state.get('userAlreadyBookedInfo'),
        }),
    {
        setSearchValue,
        bookTempNumbers,
        isBookingAllowedForUser,
        fetchTempBookedNumbersFromCache,
    }
)(SearchNumbers);
