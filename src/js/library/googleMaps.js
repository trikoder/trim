import bootData from '../library/bootData.js';
import app from '../app.js';

let loadApiPromise;

export function loadApi() {

    if (loadApiPromise) {
        return loadApiPromise;
    }

    loadApiPromise = import('google-maps').then(({default: GoogleMapsLoader}) => {

        GoogleMapsLoader.KEY = bootData('googleMapsApiKey');
        GoogleMapsLoader.LIBRARIES = ['places'];
        GoogleMapsLoader.LANGUAGE = app.getLocale();

        return new Promise(resolve => {
            GoogleMapsLoader.load(googleLib => resolve(googleLib));
        });

    });

    return loadApiPromise;

};
