import DataBag from './dataBag.js';
import {assign} from './toolkit.js';

const store = new DataBag();

export default assign(function(key, defaultValue) {
    return store.get(key, defaultValue);
}, {
    set(data) {
        store.set(data);
        return this;
    }
});
