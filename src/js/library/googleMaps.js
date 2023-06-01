import bootData from '../library/bootData.js';
import app from '../app.js';

let loadApiPromise;

export function loadApi() {

    if (loadApiPromise) {
        return loadApiPromise;
    }

    loadApiPromise = import('google-maps').then(({Loader}) => {

        const loader = new Loader(bootData('googleMapsApiKey'), {
            libraries: ['places'],
            language: app.getLocale()
        });

        return loader.load().then((googleLib) => googleLib);

    });

    return loadApiPromise;

};
