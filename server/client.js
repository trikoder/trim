import FakeServer from 'fake-json-api-server';
import fakeServerConfig from './fakeServerConfig';

var server = new FakeServer(fakeServerConfig);

// mock media api endpoint
server.pretender.post(process.env.BASE_API_URL + 'media/upload', () => {
    return [200, {
        'content-type': 'application/javascript',
        Location: 'media/1'
    }, ''];
});

if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    server.on('request', request => console.log(decodeURIComponent(request.url), request.requestBody));
    // eslint-disable-next-line no-console
    server.on('response', response => console.log(response));
}
