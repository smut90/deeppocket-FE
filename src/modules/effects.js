import {
    requestCreateAccount,
    requestNumbers,
    receiveNumbers,
    requestFastTrackNumbersForUser,
    receiveFastTrackNumbersForUser,
    requestIsBookingAllowedForUser,
    receiveIsBookingAllowedForUser,
    requestBookNumbers,
    receiveBookNumbers,
    requestUserBookedNumbers,
    receiveUserBookedNumbers,
    requestLastEditionWinningNumber,
    receiveLastEditionWinningNumber,
    requestPrevWinners,
    receivePrevWinners,
    requestNextDrawTime,
    receiveNextDrawTime,
    requestCurrentEdition,
    receiveCurrentEdition,
    requestTempBookedNumbersFromCache,
    receiveTempBookedNumbersFromCache,
} from './actions'

const SERVER_URL = process.env.REACT_APP_DP_SERVER;

export const fetchNumbers = () => {
    return function (dispatch) {
        dispatch(requestNumbers());
        let url = SERVER_URL + '/numbers?digits=4';
        return fetch(url)
            .then(response => response.json())
            .then((json) => {
                dispatch(receiveNumbers(json));
            });
    };
};

export const fetchTempBookedNumbersFromCache = () => {
    return function (dispatch) {
        dispatch(requestTempBookedNumbersFromCache());
        let url = SERVER_URL + '/numbers/lock/cache';
        return fetch(url)
            .then(response => response.json())
            .then((json) => {
                dispatch(receiveTempBookedNumbersFromCache(json));
            });
    };
};

export const fetchBookedNumbers = () => {
    return function (dispatch) {
        dispatch(requestBookNumbers());
        let url = SERVER_URL + '/numbers/lock';
        return fetch(url)
            .then(response => response.json())
            .then((json) => {
                dispatch(receiveBookNumbers(json));
            });
    };
};

export const isBookingAllowedForUser = (profile) => {
    return function (dispatch) {
        const jsonRequest = {
            "userName": profile.nickname,
        };
        dispatch(requestIsBookingAllowedForUser());
        let url = SERVER_URL + '/numbers/lock/allowed?userName=' + jsonRequest.userName;
        return fetch(url)
            .then(response => response.json())
            .then((json) => {
                dispatch(receiveIsBookingAllowedForUser(json));
            });
    };
};


export const fetchFastTrackNumbers = (profile, numbersToGenerate) => {
    return function (dispatch) {
        const jsonRequest = {
            "userName": profile.nickname,
            "numbersToGenerate": numbersToGenerate
        };
        dispatch(requestFastTrackNumbersForUser());
        let url = SERVER_URL + '/numbers/fasttrack/?numbersToGenerate=' + jsonRequest.numbersToGenerate + '&userName=' + jsonRequest.userName;
        return fetch(url)
            .then(response => response.json())
            .then((json) => {
                dispatch(receiveFastTrackNumbersForUser(json));
            });
    };
};

export const fetchUserBookedNumbers = (profile) => {
    return function (dispatch) {
        const jsonRequest = {
            "userName": profile.nickname,
            "name": profile.name,
        };
        dispatch(requestUserBookedNumbers());
        let url = SERVER_URL + '/numbers/lock?userName=' + jsonRequest.userName;
        return fetch(url)
            .then(response => response.json())
            .then((json) => {
                dispatch(receiveUserBookedNumbers(json));
            });
    };
};

export const fetchLastEditionWinningNumber = () => {
    return function (dispatch) {
        dispatch(requestLastEditionWinningNumber());
        let url = SERVER_URL + '/numbers/winners/prev';
        return fetch(url)
            .then(response => response.json())
            .then((json) => {
                dispatch(receiveLastEditionWinningNumber(json));
            });
    };
};

export const fetchPrevWinnersForDashboard = () => {
    return function (dispatch) {
        dispatch(requestPrevWinners());
        let url = SERVER_URL + '/numbers/winners/history/dashboard';
        return fetch(url)
            .then(response => response.json())
            .then((json) => {
                dispatch(receivePrevWinners(json.dashboard));
            });
    };
};

export const fetchNextDrawTime = () => {
    return function (dispatch) {
        dispatch(requestNextDrawTime());
        let url = SERVER_URL + '/numbers/winners/draw';
        return fetch(url)
            .then(response => response.json())
            .then((json) => {
                dispatch(receiveNextDrawTime(json));
            });
    };
};

export const fetchCurrentEdition = () => {
    return function (dispatch) {
        dispatch(requestCurrentEdition());
        let url = SERVER_URL + '/numbers/edition';
        return fetch(url)
            .then(response => response.json())
            .then((json) => {
                dispatch(receiveCurrentEdition(json));
            });
    };
};

export const bookNumbers = (paymentReceipt) => {
    return function (dispatch) {
        dispatch(requestBookNumbers());
        let url = SERVER_URL + '/numbers/lock';
        return fetch(url, {
            method: 'POST',
            body: JSON.stringify(paymentReceipt),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
        })
            .then(response => response.json())
            .then((json) => {
                dispatch(receiveBookNumbers(json));
            });

    };
};

export const creatAccount = (profile) => {
    return function (dispatch) {
        const jsonRequest = {
            "userName": profile.nickname,
            "name": profile.name,
        };
        dispatch(requestCreateAccount());
        let url = SERVER_URL + '/accounts';
        return fetch(url, {
            method: 'post',
            body: jsonRequest
        })
            .then(response => response.json());
    };
};
