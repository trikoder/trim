import {assign} from './toolkit';

function DataBag(data) {
    this.store = assign({}, data);
}

assign(DataBag.prototype, {

    get(key, defaultValue) {

        var pieces = key.split('.');
        var haystack = this.store;

        for (var i in pieces) {

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
