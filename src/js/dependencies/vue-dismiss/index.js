const elementClickKey = '_vueDismissClick';
const elementKeyupKey = '_vueDismissKeyup';
const elementTimeoutKey = '_vueDismissTimeout';

function setup(el, binding) {

    let callback, shouldBind;

    if (typeof binding.value === 'function') {
        callback = binding.value;
        shouldBind = true;
    } else {
        callback = binding.value.callback;
        shouldBind = Object.prototype.hasOwnProperty.call(binding.value, 'watch')
            ? Boolean(binding.value.watch)
            : true
        ;
    }

    if (shouldBind) {

        if (typeof document !== 'undefined' && !el[elementClickKey]) {

            const handler = function(event) {
                if (event.keyCode) {
                    if (event.keyCode === 27) {
                        callback();
                    }
                } else if (
                    !(event.target === el) &&
                    !el.contains(event.target)
                ) {
                    callback();
                }
            };

            if (el[elementTimeoutKey]) {
                clearTimeout(el[elementTimeoutKey]);
            }

            el[elementTimeoutKey] = setTimeout(function() {
                document.addEventListener('click', handler);
                document.addEventListener('keyup', handler);
            }, 10);

            el[elementClickKey] = el[elementKeyupKey] = handler;

        }

    } else {

        unbind(el);

    }

}

function unbind(el) {

    if (el[elementClickKey] && typeof document !== 'undefined') {
        document.removeEventListener('click', el[elementClickKey]);
        document.removeEventListener('keyup', el[elementKeyupKey]);
        delete el[elementClickKey];
        delete el[elementKeyupKey];
        if (el[elementTimeoutKey]) {
            clearTimeout(el[elementTimeoutKey]);
            delete el[elementTimeoutKey];
        }
    }

}

export default {
    directives: {
        onDismiss: {
            beforeMount: setup,
            updated: setup,
            unmounted: unbind
        }
    }
};
