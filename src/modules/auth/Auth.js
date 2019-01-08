import auth0 from 'auth0-js';

class Auth {
    constructor() {
        this.auth0 = new auth0.WebAuth({
            // the following three lines MUST be updated
            domain: process.env.REACT_APP_AUTH_DOMAIN,
            audience: process.env.REACT_APP_AUTH_AUDIENCE,
            clientID: process.env.REACT_APP_AUTH_CLIENTID,
            redirectUri: process.env.REACT_APP_AUTH_REDIRECT_URI,
            responseType: process.env.REACT_APP_AUTH_RESPONSE_TYPE,
            scope: process.env.REACT_APP_AUTH_SCOPE
        });
        this.getProfile = this.getProfile.bind(this);
        this.handleAuthentication = this.handleAuthentication.bind(this);
        this.isAuthenticated = this.isAuthenticated.bind(this);
        this.signIn = this.signIn.bind(this);
        this.signOut = this.signOut.bind(this);
    }

    getProfile() {
        return this.profile;
    }

    getIdToken() {
        return this.idToken;
    }

    isAuthenticated() {
        return new Date().getTime() < this.expiresAt;
    }

    signIn() {
        this.auth0.authorize();
        sessionStorage.setItem('loggedIn', JSON.stringify(true));
    }

    handleAuthentication() {
        return new Promise((resolve, reject) => {
            this.auth0.parseHash((err, authResult) => {
                if (err) {
                    this.signOut();
                }
                if (!authResult || !authResult.idToken) {
                    sessionStorage.setItem('loggedIn', JSON.stringify(false));
                    this.signOut();
                    // return reject(err);
                }
                this.setSession(authResult);
                sessionStorage.setItem('loggedIn', JSON.stringify(true));
                resolve();
            });
        })
    }

    setSession(authResult) {
        this.idToken = authResult.idToken;
        this.profile = authResult.idTokenPayload;
        // set the time that the id token will expire at
        this.expiresAt = authResult.idTokenPayload.exp * 1000;
    }

    signOut() {
        this.auth0.logout({
            returnTo: process.env.REACT_APP_AUTH_RETURN_TO,
            clientID: process.env.REACT_APP_AUTH_CLIENTID,
        });
        sessionStorage.setItem('loggedIn', JSON.stringify(false));
    }

    silentAuth() {
        return new Promise((resolve, reject) => {
            this.auth0.checkSession({}, (err, authResult) => {
                if (err){
                    sessionStorage.setItem('loggedIn', JSON.stringify(false));
                    return reject(err);
                }
                this.setSession(authResult);
                sessionStorage.setItem('loggedIn', JSON.stringify(true));
                resolve();
            });
        });
    }
}

const auth0Client = new Auth();

export default auth0Client;
