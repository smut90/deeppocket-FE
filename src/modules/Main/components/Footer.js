import React from 'react';
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../../../style/bootstrap/css/bootstrap.min.css'
import '../../../style/style.css'

function Footer() {

    return (

        <footer className="site-footer">
            <div className="bottom" style={{ 'background-color': '#22313f' }}>
                <div className="container-fluid">
                    <div className="row">

                        <div className="col-lg-6 col-xs-12 text-lg-left text-center">
                            <p className="copyright-text" style={{ 'color': '#ececec' }}>
                                © DEEP Pocket
                            </p>
                            <div className="credits">
                            </div>
                        </div>

                        <div className="col-lg-6 col-xs-12 text-lg-right text-center">
                            <ul className="list-inline">
                                <li className="list-inline-item">
                                    <a href="/" style={{ 'color': '#ececec' }}>Home</a>
                                </li>

                                <li className="list-inline-item">
                                    <a href="/book" style={{ 'color': '#ececec' }}>Book Dimes</a>
                                </li>

                                <li className="list-inline-item">
                                    <a href="/">
                                        <span style={{ 'font-size': '25px', 'color': '#ececec' }}>
                                            <FontAwesomeIcon icon={faEnvelope} />
                                        </span>
                                        <span style={{ 'color': '#ececec' }}> deeppocket99@gmail.com</span>
                                    </a>
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        </footer>

    );

}

export default Footer;