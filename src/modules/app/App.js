// import React from 'react';
// import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
// import NumberCollection from './modules/booking/components/NumberCollection';
// import MainSection from './modules/Main/components/MainSection';
// import Callback from './modules/auth/Callback';
// import UserDashboard from './modules/Main/components/UserDashboard';
// import SecuredRoute from './modules/auth/securedRoutes/SecuredRoute';
// import auth0Client from './modules/auth/Auth';
//
// class App extends React.Component {
//
//     // constructor(props) {
//     //     super(props);
//     //     this.state = {
//     //         checkingSession: true,
//     //     }
//     // }
//
//     // async componentDidMount() {
//     //
//     //     if (this.props.location.pathname === '/callback') {
//     //         this.setState({checkingSession:false});
//     //         return;
//     //     }
//     //
//     //     if (this.props.location.pathname === '/callback') return;
//     //     try {
//     //         await auth0Client.silentAuth();
//     //         this.forceUpdate();
//     //     } catch (err) {
//     //         if (err.error !== 'login_required') console.log(err.error);
//     //     }
//     //
//     //     this.setState({checkingSession:false});
//     // }
//
//     // async silentAuth() {
//     //
//     //     if (this.props.location.pathname === '/callback') {
//     //         this.setState({checkingSession:false});
//     //         return;
//     //     }
//     //
//     //     if (this.props.location.pathname === '/callback') return;
//     //     try {
//     //         await auth0Client.silentAuth();
//     //         this.forceUpdate();
//     //     } catch (err) {
//     //         if (err.error !== 'login_required') console.log(err.error);
//     //     }
//     //
//     //     this.setState({checkingSession:false});
//     // }
//
//     // componentDidMount(){
//     //     console.log('APP');
//     //     this.silentAuth();
//     //     this.setState({ isAuthenticated: auth0Client.isAuthenticated() })
//     // }
//
//     render () {
//         return (
//             <div>
//                 <Route exact path="/" component={MainSection} />
//                 <Route exact path="/book" component={NumberCollection} />
//                 <Route exact path='/callback' component={Callback}/>
//                 <SecuredRoute path='/dashboard'
//                               component={UserDashboard}
//                               checkingSession={this.state.checkingSession} />
//                 {/*<SecuredRoute path='/dashboard'*/}
//                 {/*component={UserDashboard}*/}
//                 {/*checkingSession={this.state.isAuthenticated} />*/}
//             </div>
//         );
//     }
// }
//
// export default withRouter(App);
//
