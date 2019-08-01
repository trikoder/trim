import Vue from 'vue';

const eventBus = new Vue();

export function publish(eventName, data) {
    eventBus.$emit(eventName, data);
}

export function subscribe(eventName, listener) {
    eventBus.$on(eventName, listener);
}

export function unsubscribe(eventName, listener) {
    eventBus.$off(eventName, listener);
}
