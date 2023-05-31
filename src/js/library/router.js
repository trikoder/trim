import {createRouter, createWebHistory, createWebHashHistory} from 'vue-router';
import AdminDefault from '../layouts/adminDefault.vue';
import {assign} from './toolkit.js';
import bootData from './bootData.js';
import {slug as slugcase, pascal as pascalcase} from 'to-case';

let routerInstance;

const routerParams = {

    controller(path, name, params) {

        this.addRoute({
            path: ('/' + path).replace('//', '/'),
            name,
            component: AdminDefault,
            meta: {requiresAuth: true},
            props: route => {

                const controllerString = typeof params === 'string' ? params : params.uses;

                const parts = controllerString.split('@');
                const controllerName = parts[0];
                const method = parts.length > 1 ? parts[1] : undefined;

                return {
                    controller: {
                        name: controllerName,
                        method,
                        params: route.params,
                        query: route.query
                    }
                };

            }
        });

        return this;

    },

    url(name, params, query) {

        return this.resolve(typeof name === 'string'
            ? {name, params, query}
            : name
        ).href;

    },

    navigateTo(params) {

        let navigateCall;

        if (typeof params === 'string') {
            const baseUrlRE = new RegExp('^' + bootData('baseUrl') + '(#/)?');
            navigateCall = this.push(params.replace(baseUrlRE, '/'));
        } else {
            const method = params.useHistoryReplace ? 'replace' : 'push';
            navigateCall = this[method](params);
        }

        // not all vue router implentations throw error
        if (navigateCall && navigateCall.catch) {
            navigateCall.catch(error => {
                if (
                    error.name === 'NavigationDuplicated' ||
                    error.message.indexOf('Avoided redundant navigation') === 0
                ) {
                    // not considered error in trim app
                } else {
                    return Promise.reject(error);
                }
            });
        }
        return navigateCall;
    },

    resource(name) {

        if (Array.isArray(name)) {
            name.forEach(item => this.resource(item));
            return this;
        }

        const params = assign({
            hasIndexRoute: true,
            hasCreateRoute: true,
            hasEditRoute: true
        }, typeof name === 'string'
            ? {
                name,
                urlFragment: slugcase(name),
                controller: pascalcase(name)
            }
            : assign({
                urlFragment: slugcase(name.name),
                controller: pascalcase(name.name)
            }, name));

        if (params.hasIndexRoute) {
            this.controller(
                params.urlFragment,
                `resource.${params.name}.index`,
                params.controller + '@index'
            );
        }

        if (params.hasCreateRoute) {

            if (Array.isArray(params.hasCreateRoute)) {

                params.hasCreateRoute.forEach(resourceType => {

                    const path = params.urlFragment + '/create-' + slugcase(resourceType);
                    const name = 'resource.' + params.name + '.create' + pascalcase(resourceType);
                    const uses = params.controller + '@create' + pascalcase(resourceType);
                    this.controller(path, name, uses);

                });

            } else {

                this.controller(
                    params.urlFragment + '/create',
                    `resource.${params.name}.create`,
                    params.controller + '@create'
                );

            }

        }

        if (params.hasEditRoute) {
            this.controller(
                params.urlFragment + '/:id',
                `resource.${params.name}.edit`,
                params.controller + '@edit'
            );
        }

        return this;

    }

};

export function getInstance() {

    return routerInstance;

};

export function create() {

    const base = bootData('baseUrl', '/');

    routerInstance = createRouter({
        history: bootData('usesPushState', true)
            ? createWebHistory(base)
            : createWebHashHistory(base),
        routes: []
    });

    if (!routerInstance.addRoute) {
        routerInstance.addRoute = function(config) {
            return this.addRoutes([config]);
        };
    }

    routerInstance = assign(routerInstance, routerParams);

    return routerInstance;

};
