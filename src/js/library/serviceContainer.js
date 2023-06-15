import {each} from './toolkit.js';

const registry = {};

function getOne(serviceName, options) {

    if (typeof registry[serviceName] === 'undefined') {
        throw new Error('Service "' + serviceName + '" is not defined');
    }

    const service = Promise.resolve(registry[serviceName]());

    return options && options.fullExport
        ? service
        : service.then(
            importedModule => isEsModule(importedModule) ? importedModule.default : importedModule
        );

}

function isEsModule(_module) {
    return _module.__esModule || _module[Symbol.toStringTag] === 'Module';
}

export default {

    get: function(serviceName, options) {

        return Array.isArray(serviceName)
            ? Promise.all(serviceName.map(singleService => getOne(singleService, options)))
            : getOne(serviceName, options);

    },

    register: function(serviceName, handler) {

        if (handler) {
            registry[serviceName] = handler;
        } else {
            each(serviceName, function(serviceHandler, serviceKey) {
                registry[serviceKey] = serviceHandler;
            });
        }

    }

};
