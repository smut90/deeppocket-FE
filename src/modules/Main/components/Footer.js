import React from 'react';
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../../../style/bootstrap/css/bootstrap.min.css'
import '../../../style/style.css'

function Footer() {

    // return (
    //
    //     <footer className="site-footer">
    //         <div className="bottom" style={{ 'background-color': '#22313f' }}>
    //             <div className="container-fluid">
    //                 <div className="row">
    //
    //                     <div className="col-lg-6 col-xs-12 text-lg-left text-center">
    //                         <p className="copyright-text" style={{ 'color': '#ececec' }}>
    //                             © DEEP Pocket
    //                         </p>
    //                         <div className="credits">
    //                         </div>
    //                     </div>
    //
    //                     <div className="col-lg-6 col-xs-12 text-lg-right text-center">
    //                         <ul className="list-inline">
    //                             <li className="list-inline-item">
    //                                 <a href="/" style={{ 'color': '#ececec' }}>Home</a>
    //                             </li>
    //
    //                             <li className="list-inline-item">
    //                                 <a href="/book" style={{ 'color': '#ececec' }}>Book Dimes</a>
    //                             </li>
    //
    //                             <li className="list-inline-item">
    //                                 <a href="/">
    //                                     <span style={{ 'font-size': '25px', 'color': '#ececec' }}>
    //                                         <FontAwesomeIcon icon={faEnvelope} />
    //                                     </span>
    //                                     <span style={{ 'color': '#ececec' }}> deeppocket99@gmail.com</span>
    //                                 </a>
    //                             </li>
    //                         </ul>
    //                     </div>
    //
    //                 </div>
    //             </div>
    //         </div>
    //     </footer>
    //
    // );

    return (

        <footer className="site-footer">
        <div className="footer-bottom-area">
            <div className="container-fluid" style={{ 'background-color': '#22313f', 'color': 'aliceblue', 'padding-top': '10px' }}>
                <div className="row">

                    <div className="col-lg-7 col-md-6 col-12">
                        <div className="single-widget widget-about">
                            <p className="copyright-text" style={{ 'color': '#ececec' }}>
                                © DEEP Pocket
                            </p>
                        </div>
                    </div>

                    <div className="col-lg-1 col-md-6 col-12">
                        <div className="single-widget" style={{ 'font-size': '15px' }}>
                            <p style={{ 'border-bottom': '1px #fff solid', 'width': '50px' }}>RoadMap</p>
                            <ul className="list-unstyled">
                                <li><a href="/" style={{ 'color': '#ececec' }}>Home</a></li>
                                <li><a href="/book" style={{ 'color': '#ececec' }}>Book</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-6 col-12">
                        <div className="single-widget" style={{ 'font-size': '15px' }}>
                            <p style={{ 'border-bottom': '1px #fff solid' }}>Contact Us</p>
                            <ul className="list-unstyled">
                                <li className="email">
                                    <span style={{ 'font-size': '15px', 'color': '#ececec' }}>
                                        <FontAwesomeIcon icon={faEnvelope} />
                                    </span>
                                    <span style={{ 'color': '#ececec' }}> deeppocket99@gmail.com</span>
                                </li>
                                <li className="email">
                                    <span style={{ 'font-size': '15px', 'color': '#ececec' }}>
                                        <FontAwesomeIcon icon={faEnvelope} />
                                    </span>
                                    <span style={{ 'color': '#ececec' }}> deeppocket99@info.com</span>
                                </li>
                                <li className="fb">
                                    <span style={{ 'font-size': '15px', 'color': '#ececec' }}>
                                        <FontAwesomeIcon icon={faFacebookSquare} />
                                    </span>
                                    <span style={{ 'color': '#ececec' }}> https://www.facebook.com/deeppocket99/</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        </footer>

    );

}

export default Footer;