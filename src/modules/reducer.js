import { fromJS } from 'immutable';

import {
    FETCH_NUMBERS,
    REQUEST_NUMBERS,
    RECEIVE_NUMBERS,
    REQUEST_FASTTRACK_NUMBERS,
    RECEIVE_FASTTRACK_NUMBERS,
    SET_FASTTRACK_NUMBERS,
    REQUEST_IS_BOOKING_ALLOWED_FOR_USER,
    RECEIVE_IS_BOOKING_ALLOWED_FOR_USER,
    TEMP_BOOK_NUMBERS,
    REQUEST_BOOK_NUMBERS,
    RECEIVE_BOOK_NUMBERS,
    REQUEST_USER_BOOK_NUMBERS,
    RECEIVE_USER_BOOK_NUMBERS,
    REQUEST_LAST_EDITION_WINNING_NUMBER,
    RECEIVE_LAST_EDITION_WINNING_NUMBER,
    REQUEST_TEMP_BOOK_NUMBERS_FROM_CACHE,
    RECEIVE_TEMP_BOOK_NUMBERS_FROM_CACHE,
    SET_SEARCH_VALUE,
    REQUEST_LOGIN,
    RECEIVE_AUTHENTICATED_INFO,
    SESSION_VALIDATION_COMPLETE,
    REQUEST_PREV_WINNERS,
    RECEIVE_PREV_WINNERS,
    REQUEST_NEXT_DRAW_DATE,
    RECEIVE_NEXT_DRAW_DATE,
    REQUEST_CURRENT_EDITION,
    RECEIVE_CURRENT_EDITION
} from './constants';

const stateParams = {
    numbers: {},
    bookedNumbers: [],
    loading: false,
};

const initialState = fromJS(stateParams);

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case SESSION_VALIDATION_COMPLETE:
            return state.set('isSessionValidationComplete', 'done');
        case REQUEST_NUMBERS:
            return state.set('loading', true);
        case RECEIVE_NUMBERS:
            return state.set('numbers', action.payload.numbers).setIn(['loading'], false);
        case REQUEST_IS_BOOKING_ALLOWED_FOR_USER:
            return state.set('loading', true);
        case RECEIVE_IS_BOOKING_ALLOWED_FOR_USER:
            return state.set('userAlreadyBookedInfo', action.payload).set('loading', false);
        case REQUEST_FASTTRACK_NUMBERS:
            return state.set('loading', true);
        case RECEIVE_FASTTRACK_NUMBERS:
            return state.set('fastTrackNumberInfo', action.payload).set('loading', false);
        case SET_FASTTRACK_NUMBERS:
            return state.set('fastTrackNumberInfo', action.payload);
        case REQUEST_BOOK_NUMBERS:
            return state.set('loading', true);
        case RECEIVE_BOOK_NUMBERS:
            return state.set('bookedNumbers', action.payload).set('loading', false);
        case REQUEST_USER_BOOK_NUMBERS:
            return state.set('loading', true);
        case RECEIVE_USER_BOOK_NUMBERS:
            return state.set('userInfo', action.payload).set('loading', false);
        case REQUEST_TEMP_BOOK_NUMBERS_FROM_CACHE:
            return state.set('loading', true);
        case RECEIVE_TEMP_BOOK_NUMBERS_FROM_CACHE:
            return state.set('tempBookedNumbersForAllUsers', action.payload).set('loading', false);
        case REQUEST_LAST_EDITION_WINNING_NUMBER:
            return state.set('loading', true);
        case RECEIVE_LAST_EDITION_WINNING_NUMBER:
            return state.set('winningInfo', action.payload).set('loading', false);
        case TEMP_BOOK_NUMBERS:
            return state.set('tempBookedNumbers', action.payload);
        case SET_SEARCH_VALUE:
            return state.set('searchValue', action.payload);
        case REQUEST_LOGIN:
            return state.set('isAuthenticated', false).set('isPendingAuthentication', true);
        case REQUEST_PREV_WINNERS:
            return state.set('loading', true);
        case RECEIVE_PREV_WINNERS:
            return state.set('dashboard', action.payload).set('loading', false);
        case REQUEST_NEXT_DRAW_DATE:
            return state.set('loading', true);
        case RECEIVE_NEXT_DRAW_DATE:
            return state.set('draw', action.payload).set('loading', false);
        case REQUEST_CURRENT_EDITION:
            return state.set('loading', true);
        case RECEIVE_CURRENT_EDITION:
            return state.set('edition', action.payload).set('loading', false);

        case RECEIVE_AUTHENTICATED_INFO:
            return state.set('userInfo', action.payload)
                .set('isAuthenticated', true)
                .set('isPendingAuthentication', false);

        default:
            return state;
    }
};

export default rootReducer;
