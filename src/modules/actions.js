import {
    CREATE_ACCOUNT,
    FETCH_NUMBERS,
    REQUEST_NUMBERS,
    RECEIVE_NUMBERS,
    TEMP_BOOK_NUMBERS,
    REQUEST_FASTTRACK_NUMBERS,
    RECEIVE_FASTTRACK_NUMBERS,
    SET_FASTTRACK_NUMBERS,
    REQUEST_IS_BOOKING_ALLOWED_FOR_USER,
    RECEIVE_IS_BOOKING_ALLOWED_FOR_USER,
    REQUEST_BOOK_NUMBERS,
    RECEIVE_BOOK_NUMBERS,
    REQUEST_USER_BOOK_NUMBERS,
    RECEIVE_USER_BOOK_NUMBERS,
    REQUEST_LAST_EDITION_WINNING_NUMBER,
    RECEIVE_LAST_EDITION_WINNING_NUMBER,
    REQUEST_PREV_WINNERS,
    RECEIVE_PREV_WINNERS,
    REQUEST_NEXT_DRAW_DATE,
    RECEIVE_NEXT_DRAW_DATE,
    REQUEST_TEMP_BOOK_NUMBERS_FROM_CACHE,
    RECEIVE_TEMP_BOOK_NUMBERS_FROM_CACHE,
    SET_SEARCH_VALUE,
    REQUEST_LOGIN,
    RECEIVE_AUTHENTICATED_INFO,
    SESSION_VALIDATION_COMPLETE,
    REQUEST_CURRENT_EDITION,
    RECEIVE_CURRENT_EDITION,
} from './constants'

export const notifySystemStart = () => ({ type: SESSION_VALIDATION_COMPLETE });

export const requestCreateAccount = () => ({ type: CREATE_ACCOUNT });

export const requestLogin = () => ({ type: REQUEST_LOGIN });
export const receiveAuthenticatedInfo = userInfo => ({ type: RECEIVE_AUTHENTICATED_INFO, payload: userInfo });

export const fetchNumbers = numbers => ({ type: FETCH_NUMBERS, payload: numbers });

export const requestFastTrackNumbersForUser = () => ({ type: REQUEST_FASTTRACK_NUMBERS });
export const receiveFastTrackNumbersForUser = payload => ({ type: RECEIVE_FASTTRACK_NUMBERS, payload: payload });
export const setFastTrackNumbersForUser = payload => ({ type: SET_FASTTRACK_NUMBERS, payload: payload });

export const requestNumbers = () => ({ type: REQUEST_NUMBERS });
export const receiveNumbers = numbers => ({ type: RECEIVE_NUMBERS, payload: numbers });

export const requestIsBookingAllowedForUser = () => ({ type: REQUEST_IS_BOOKING_ALLOWED_FOR_USER });
export const receiveIsBookingAllowedForUser = payload => ({ type: RECEIVE_IS_BOOKING_ALLOWED_FOR_USER, payload: payload });

export const bookTempNumbers = numbers => ({ type: TEMP_BOOK_NUMBERS, payload: numbers });
export const requestBookNumbers = () => ({ type: REQUEST_BOOK_NUMBERS });
export const receiveBookNumbers = profile => ({ type: RECEIVE_BOOK_NUMBERS, payload: profile });

export const setSearchValue = searchValue => ({ type: SET_SEARCH_VALUE, payload: searchValue });

export const requestTempBookedNumbersFromCache = () => ({ type: REQUEST_TEMP_BOOK_NUMBERS_FROM_CACHE });
export const receiveTempBookedNumbersFromCache = numbers => ({ type: RECEIVE_TEMP_BOOK_NUMBERS_FROM_CACHE, payload: numbers });

export const requestUserBookedNumbers = () => ({ type: REQUEST_USER_BOOK_NUMBERS });
export const receiveUserBookedNumbers = userInfo => ({ type: RECEIVE_USER_BOOK_NUMBERS, payload: userInfo });

export const requestLastEditionWinningNumber = () => ({ type: REQUEST_LAST_EDITION_WINNING_NUMBER });
export const receiveLastEditionWinningNumber = winningInfo => ({ type: RECEIVE_LAST_EDITION_WINNING_NUMBER, payload: winningInfo });

export const requestPrevWinners = () => ({ type: REQUEST_PREV_WINNERS });
export const receivePrevWinners = dashboard => ({ type: RECEIVE_PREV_WINNERS, payload: dashboard });

export const requestNextDrawTime = () => ({ type: REQUEST_NEXT_DRAW_DATE });
export const receiveNextDrawTime = draw => ({ type: RECEIVE_NEXT_DRAW_DATE, payload: draw });

export const requestCurrentEdition = () => ({ type: REQUEST_CURRENT_EDITION });
export const receiveCurrentEdition = edition => ({ type: RECEIVE_CURRENT_EDITION, payload: edition });