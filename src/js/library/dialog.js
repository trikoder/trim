import {assign, isPlainObject} from '../library/toolkit.js';
import DialogModal from '../components/dialogModal.vue';

export function confirm(message, onAccept, config) {

    let params;

    if (isPlainObject(message)) {
        params = message;
    } else if (typeof message === 'function') {
        params = {onAccept: message};
    } else {
        params = assign({}, config, {message, onAccept});
    }

    return DialogModal.open(params);

}
