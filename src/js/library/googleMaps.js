import * as pkg from '@googlemaps/js-api-loader';
import bootData from '../library/bootData.js';
import app from '../app.js';

const __default = 'default';
const Loader = pkg.Loader || pkg[__default].Loader;

let loadApiPromise;

export function loadApi() {

    if (loadApiPromise) {
        return loadApiPromise;
    }

    const loader = new Loader({
        apiKey: bootData('googleMapsApiKey'),
        libraries: ['places'],
        language: app.getLocale()
    });

    loadApiPromise = loader.load().then((googleLib) => googleLib);

    return loadApiPromise;

};
