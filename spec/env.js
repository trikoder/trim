import FakeServer from 'fake-json-api-server';
import fakeServerConfig from '../server/fakeServerConfig';
import bootData from 'cmf/js/library/bootData';

const apiUrl = window.location.href + '/api/';
let currentserver;

fakeServerConfig.baseApiUrl = apiUrl;
fakeServerConfig.storageKey = undefined;

bootData.set({baseApiUrl: apiUrl});

export const api = {

    url: apiUrl,

    start() {

        currentserver && currentserver.stop();
        currentserver = new FakeServer(fakeServerConfig);

    },

    stop() {

        currentserver && currentserver.stop();
        currentserver = null;

    }

};

export function wait(time = 50) {

    return new Promise(resolve => {
        setTimeout(() => resolve(), time);
    });

}
