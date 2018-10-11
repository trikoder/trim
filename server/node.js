var FakeServer = require('fake-json-api-server/src/nodeServer.js');
var fakeServerConfig = require('./fakeServerConfig');

new FakeServer({
    port: process.env.API_PORT,
    resources: fakeServerConfig.resources,
    beforeServerStart: function(app) {

        app.post('/media/upload', (request, response) => {

            response.set('Content-Type', 'application/javascript');
            response.set('Access-Control-Expose-Headers', 'Location');
            response.set('Location', process.env.BASE_API_URL + 'media/1');
            response.send('');

        });

    }
});
