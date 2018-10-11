import Vue from 'vue';
import AppView from './components/appView';
import {create as createRouter} from './library/router';
import translate from './library/translate';
import bootData from './library/bootData';
import browserFeatures from './library/browserFeatures';
import serviceContainer from './library/serviceContainer';
import Loader from './library/loader';
import viewport from './library/viewport';
import appServices from './appServices';
import store from './store';

Vue.config.productionTip = false;

Loader.setActions({
    onActivate: () => store.commit('loading', true),
    onDeactivate: () => store.commit('loading', false)
});

viewport.setBreakpoints({
    ranges: {
        small: [0, 979],
        large: [980, Infinity]
    },
    onMatch: breakpoint => store.commit('setBreakpoint', breakpoint)
}).checkBreakpoints();

let routesProvider;
let beforeAdminEnter = () => {};
let auth = false;

serviceContainer.register(appServices);

const api = {

    start() {

        browserFeatures.runTests();

        const router = createRouter();

        Promise.resolve(auth
            ? auth.setup({router, beforeAdminEnter})
            : beforeAdminEnter()
        ).then(() => {

            routesProvider(router);
            router.controller('*', 'error', 'Error@pageNotFound');

            /* eslint-disable no-new */
            this.rootView = new Vue({
                el: '#app',
                router,
                store,
                components: {AppView},
                render: h => h(AppView)
            });

        });

    },

    setLocale(locale) {

        translate.setLocale(locale);
        return this;

    },

    getLocale() {

        return translate.getLocale();

    },

    loadTranslations(items, locale, prefix) {

        translate.add(items, locale, prefix);
        return this;

    },

    setBootData(data) {

        bootData.set(data);
        return this;

    },

    registerServices: function(services) {

        serviceContainer.register(services);
        return this;

    },

    registerRoutes: function(userRoutesProvider) {

        routesProvider = userRoutesProvider;
        return this;

    },

    useAuth: function(api) {

        auth = api;
        return this;

    },

    beforeAdminEnter(callback) {

        beforeAdminEnter = callback;
        return this;

    }

};

export default api;
