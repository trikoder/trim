import {each} from './toolkit.js';

const storageKey = 'userPreferences';
const storageData = localStorage.getItem(storageKey);
const preferenceData = storageData ? JSON.parse(storageData) : {};

export default {

    get(key, defaultValue) {

        var data = preferenceData[key];
        return typeof data !== 'undefined' ? data : defaultValue;

    },

    set(key, value) {

        each(arguments.length === 1 ? key : {
            [key]: value
        }, (paramValue, paramKey) => {
            preferenceData[paramKey] = paramValue;
        });

        localStorage.setItem(storageKey, JSON.stringify(preferenceData));

        return this;

    },

    unset(key) {

        delete preferenceData[key];
        localStorage.setItem(storageKey, JSON.stringify(preferenceData));

        return this;

    }

};
