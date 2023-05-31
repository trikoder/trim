import {assign} from './toolkit.js';

function DataBag(data) {
    this.store = assign({}, data);
}

assign(DataBag.prototype, {

    get(key, defaultValue) {

        const pieces = key.split('.');
        let haystack = this.store;

        for (const i in pieces) {

            haystack = haystack[pieces[i]];

            if (typeof haystack === 'undefined') {
                return defaultValue;
            }
        }

        return haystack;

    },

    set(data) {

        assign(this.store, data);
        return this;

    }

});

export default DataBag;
