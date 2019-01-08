import { css } from 'styled-components';

const styles = {};

styles.gridStyles = css`
  width: 100%;
  height: 100%;

  .react-grid-Main {
    outline: 0;
    border-radius: 3px;
    overflow: hidden;
  }

  .react-grid-Grid {
    border: 0;
    min-height: 550px;
  }

  .react-grid-Cell {
    background: rgb(255, 255, 255);
    border-top: 0px solid rgb(228, 229, 230);
    border-bottom: 0;
    border-left: 0;
    border-right: 0;
    padding: 16px;
    transition: border-top 0.3s, background-color 0.3s;
  }

  .react-grid-Cell:focus {
    outline: 0;
  }

  .react-grid-Row:hover .react-grid-Cell,
  .react-grid-Row:hover + .react-grid-Row .react-grid-Cell {
    border-top-color: transparent;
  }

  .react-grid-Canvas {
    overflow: auto!important;
  }

  .react-grid-Header {
    display:none !important;
    // box-shadow: none;
    // background-color: transparent;
    // height: 0px!important;
    // visibility: hidden;
    //
    + div > .react-grid-Viewport > .react-grid-Canvas > div > .react-grid-row-group:first-child > div{
      border-top: 0!important;
    }
  }
  
  .react-grid-Viewport {
    top: 0px !important;
  }

  .react-grid-HeaderCell {
    background: rgb(255, 255, 255);
    color: rgb(161, 161, 161);
    border-bottom: 1px solid rgb(228, 229, 230);
    border-left: 0;
    border-right: 0;
    font-size: 0.875em;
    padding: 16px;
  }

  .react-grid-HeaderCell-sortable span {
    display: none;
  }

  .react-grid-HeaderCell-sortable {
    position: relative;
    margin-right: -12px;
    padding-right: 12px;
  }

  .react-grid-HeaderCell-sortable:after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    width: 8px;
    height: 5px;
    background-position: right center;
  }

  .react-grid-HeaderCell-sortable.react-grid-HeaderCell-sortable--ascending:after {
    display: block;
    opacity: 1;
    transform: rotate(180deg);
  }

  .react-grid-HeaderCell-sortable.react-grid-HeaderCell-sortable--descending:after {
    display: block;
    opacity: 1;
    transform: rotate(0deg);
  }

  .react-grid-row-group {
    position: static!important;

    + .react-grid-row-group > div {
      border-top: 0!important;
    }
  }

  .react-grid-row-group:focus {
    outline: 0;
  }

  .react-grid-row-group > div {
    border: 0!important;
    outline: 0;
    border-bottom: 0px solid rgb(228, 229, 230)!important;
  }

  .react-grid-row-group > div strong {
    font-weight: normal;
    color: rgb(161, 161, 161);
  }

  .react-grid-row-group + .react-grid-Row > .react-grid-Cell {
    border-top: 0!important;
  }

  .rdg-row-actions-cell {
    padding-left: 0;
    padding-right: 25px;
    text-align: right;
    width: 76px!important;
  }

  .react-grid-HeaderCell.rdg-row-actions-cell .react-grid-checkbox-container {
    text-align: right;
    padding: 0;
  }

  .rdg-actions-checkbox {
    display: inline-block!important;
    vertical-align: middle;
  }

  .rdg-row-index {
    display: none;
  }

  .react-grid-Canvas > div > div {
    position: relative;
  }

  .react-grid-Row {
    transition: 0.3s background-color;
  }

  .react-grid-Row:first-child > .react-grid-Cell {
    border-top: 0;
  }

  .react-grid-Row:last-child > .react-grid-Cell {
    border-bottom: 0px solid rgb(228, 229, 230);
  }

  .react-grid-Row:hover {
    background-color: #f9f9f9;
  }

  .react-grid-Canvas > div > div .react-grid-Row + div {
    height: 18px!important;
    position: absolute!important;
    background-color: #fff !important;
    border: 1px solid #fff important;
    border-radius: 0px;
    opacity: 0.4;
    z-index: 999!important;
    top: 0!important;
  }

  .react-grid-Row.row-selected .react-grid-Cell,
  .react-grid-Row.row-selected, .react-grid-Row .row-selected {
    background-color: #eeeeee;
  }

  .react-grid-checkbox-label:hover {
    border-color: rgb(161, 161, 161);
  }

  .react-grid-HeaderCell > .react-grid-checkbox-container {
    padding: 0;
  }

  .react-grid-Cell--locked:last-of-type {
    border-right: 0;
  }

`;

export default styles;
