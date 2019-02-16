import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TempNumbers from './TempBookedNumberCollection';
import { bookNumbers } from '../../effects';

export class BookNumbers extends React.Component {

    calculateTotalAmount = (singleNumberCost) => {
        const { tempNumbers } = this.props;

        if (tempNumbers != null && tempNumbers != undefined) {
            let numbersPurchased = tempNumbers.length;
            return singleNumberCost * numbersPurchased;
        } else {
            return 0;
        }
    };

    render() {
        const singleNumberCost = 5;
        const totalPurchaseValue = this.calculateTotalAmount(singleNumberCost);

        return (
            <TempNumbers totalCost={totalPurchaseValue} />
        );
    }
}

BookNumbers.propTypes = {
    tempNumbers: PropTypes.array.isRequired,
    bookedNumbers: PropTypes.array.isRequired,
    bookNumbers: PropTypes.func,
};

BookNumbers.defaultProps = {
    tempNumbers: [],
    bookedNumbers: [],
};

export default connect(
    (state) => (
        {
            bookedNumbers: state.get('bookedNumbers'),
            tempNumbers: state.get('tempBookedNumbers'),
        }),
    {
        bookNumbers
    }
)(BookNumbers);