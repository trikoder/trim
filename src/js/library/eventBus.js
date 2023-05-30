import mitt from 'mitt';

const emitter = mitt();

function publish(eventName, data) {
    emitter.emit(eventName, data);
}

function subscribe(eventName, callback) {
    emitter.on(eventName, callback);
}

function unsubscribe(eventName, callback) {
    emitter.off(eventName, callback);
}

export {publish, subscribe, unsubscribe};
