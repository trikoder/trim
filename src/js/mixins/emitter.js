import mitt from 'mitt';

export default {

    beforeCreate() {
        const emitter = mitt();
        this.$emitter = {
            emit: emitter.emit.bind(emitter),
            on: emitter.on.bind(emitter),
            off: emitter.off.bind(emitter),
            once: (type, handler) => {
                const fn = (...args) => {
                    emitter.off(type, fn);
                    handler(args);
                };
                emitter.on(type, fn);
            },
            clear: () => {
                emitter.all.clear();
            }
        };
    },

    unmounted() {
        this.$emitter.clear();
        delete this.$emitter;
    }

};
