import api from 'trim/js/library/api.js';
import auth from 'trim/js/library/auth.js';

export default auth.extend({

    isUserLogged() {

        return Boolean(localStorage.getItem('accessToken'));

    },

    loginWithCredentials(credentials) {

        return new Promise((resolve, reject) => {

            if (credentials.username.length && credentials.password.length) {
                localStorage.setItem('accessToken', 'testToken');
                resolve();
            } else {
                reject(new Error('Login failed'));
            }

        });

    },

    onAuthorization() {

        api.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('accessToken');

    },

    onDeauthorization() {

        localStorage.removeItem('accessToken');
        delete api.defaults.headers.common.Authorization;

    }

});
