import {each, assignDeep, omit} from '../library/toolkit.js';

const vueOptions = [
    'props', 'computed', 'watch',
    'template', 'render', 'renderError',
    'beforeCreate', 'created', 'beforeMount', 'mounted',
    'beforeUpdate', 'updated', 'activated', 'deactivated',
    'beforeUnmount', 'unmounted', 'errorCaptured'
];

const deprecatedDataOptions = {
    includeApiData: 'includedRelationships'
};

export default function(params) {

    return function(blueprint) {

        const Parent = params.extends;
        const vueObject = {};
        const data = {};
        const methods = {};

        each(blueprint, (value, key) => {
            if (deprecatedDataOptions[key]) {
                data[deprecatedDataOptions[key]] = value;
            } else if (vueOptions.indexOf(key) >= 0) {
                vueObject[key] = value;
            } else if (params.dataKeys.indexOf(key) >= 0) {
                data[key] = value;
            } else if (typeof value === 'function') {
                methods[key] = value;
            }
        });

        return {
            extends: omit(Parent, 'data'),
            mixins: [vueObject],
            data() {
                const parentData = Parent.data ? Parent.data.call(this) : {};
                return assignDeep({}, parentData, data);
            },
            methods
        };

    };

}
