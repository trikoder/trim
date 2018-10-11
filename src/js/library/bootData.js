import DataBag from './dataBag';
import {assign} from './toolkit';

var store = new DataBag();

export default assign(function(key, defaultValue) {
    return store.get(key, defaultValue);
}, {
    set(data) {
        store.set(data);
        return this;
    }
});
