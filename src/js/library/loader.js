import {assign} from './toolkit.js';

let actions = null;
let timeouts = [];
let loaderActive = false;

function Loader() {

    if (!(this instanceof Loader)) {
        return new Loader();
    }

}

function activate() {

    if (!loaderActive) {
        loaderActive = true;
        actions.onActivate();
    }

}

function deactivate() {

    if (loaderActive) {
        loaderActive = false;
        actions.onDeactivate();
    }

}

assign(Loader.prototype, {

    on() {

        if (actions) {

            this.off();
            this.timeout = setTimeout(activate, 50);
            timeouts.push(this.timeout);

        }

        return this;

    },

    off() {

        if (actions && this.timeout) {

            clearTimeout(this.timeout);
            timeouts = timeouts.filter(timeout => timeout !== this.timeout);
            delete this.timeout;

            if (timeouts.length === 0) {
                deactivate();
            }

        }

        return this;

    }
});

assign(Loader, {

    on() {

        return new Loader().on();

    },

    off() {

        if (actions) {

            timeouts.forEach(timeout => clearTimeout(timeout));
            timeouts = [];

            deactivate();

        }

        return this;

    },

    setActions(userActions) {
        actions = userActions;
        return this;
    }

});

export default Loader;
