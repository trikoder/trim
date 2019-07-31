import Vue from 'vue';
import Router from 'vue-router';
import AdminDefault from '../layouts/adminDefault';
import {assign, isPlainObject} from './toolkit';
import bootData from './bootData';
import {slug as slugcase, pascal as pascalcase} from 'to-case';

let routerInstance;

Vue.use(Router);

assign(Router.prototype, {

    controller(path, name, params) {

        this.addRoutes([{
            path: '/' + path,
            name: name,
            component: AdminDefault,
            meta: {requiresAuth: true},
            props: route => {

                let controllerString = typeof params === 'string' ? params : params.uses;

                const parts = controllerString.split('@');
                const controllerName = parts[0];
                const method = parts.length > 1 ? parts[1] : undefined;

                return {
                    controller: {
                        name: controllerName,
                        method: method,
                        params: route.params,
                        query: route.query
                    }
                };

            }
        }]);

        return this;

    },

    url(name, params, query) {

        let data = this.resolve(isPlainObject(name) ? name : {name, params, query});
        return data.href;

    },

    resource(name) {

        if (Array.isArray(name)) {
            name.forEach(item => this.resource(item));
            return this;
        }

        let params = assign({
            hasIndexRoute: true,
            hasCreateRoute: true,
            hasEditRoute: true
        }, typeof name === 'string' ? {
            name: name,
            urlFragment: slugcase(name),
            controller: pascalcase(name)
        } : assign({
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

});

export function getInstance() {

    return routerInstance;

};

export function create() {

    routerInstance = new Router({
        mode: bootData('usesPushState', true) ? 'history' : 'hash',
        base: bootData('baseUrl', '/')
    });

    return routerInstance;

};
