import serviceContainer from './serviceContainer';
import {assign} from './toolkit';

export default {

    component: () => serviceContainer.get('AuthController'),

    loginRoute: {path: '/login', name: 'login'},

    afterLoginRoute: {path: '/'},

    setup({router, beforeAdminEnter}) {

        this.router = router;
        this.beforeAdminEnter = beforeAdminEnter;

        router.addRoutes([{
            path: this.loginRoute.path,
            name: this.loginRoute.name,
            component: this.component,
            props: {authApi: this}
        }]);

        router.beforeEach((to, from, next) => {

            if (to.meta.requiresAuth) {
                Promise.resolve(this.isUserLogged()).then(isUserLoggedIn => {
                    if (isUserLoggedIn) {
                        this.bootstrapEnvironment().then(() => next());
                    } else {
                        next({name: this.loginRoute.name});
                    }
                });
            } else {
                next();
            }

        });

    },

    bootstrapEnvironment() {

        if (!this.onAuthorization.promise) {
            this.onAuthorization.promise = Promise.resolve(this.onAuthorization());
        }

        return this.onAuthorization.promise.then(() => {

            if (!this.beforeAdminEnter.promise) {
                this.beforeAdminEnter.promise = Promise.resolve(this.beforeAdminEnter());
            }

            return this.beforeAdminEnter.promise;

        });

    },

    teardownEnvironment() {

        delete this.beforeAdminEnter.promise;
        delete this.onAuthorization.promise;

        return Promise.resolve(this.onDeauthorization());

    },

    isUserLogged() {

        throw new Error('Method "isUserLogged" not implemented on auth api');

    },

    loginWithCredentials(credentials) {

        throw new Error('Method "loginWithCredentials" not implemented on auth api');

    },

    logout() {

        return this.teardownEnvironment().then(() => {
            this.router.push({name: this.loginRoute.name});
        });

    },

    onAuthorization() {},

    onDeauthorization() {},

    extend(params) {

        assign(this, params);
        return this;

    }

};
