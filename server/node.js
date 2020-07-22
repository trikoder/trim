const ExpressServer = require('json-api-shop/servers/express');
const MemoryAdapter = require('json-api-shop/adapters/memory');
const resources = require('./resources');

const Server = ExpressServer.extend({

    setupRoutes(app) {

        ExpressServer.prototype.setupRoutes.call(this, app);

        app.post('/media/upload', (request, response) => {
            response.set('Content-Type', 'application/javascript');
            response.set('Access-Control-Expose-Headers', 'Location');
            response.set('Location', process.env.BASE_API_URL + 'media/1');
            response.send('');
        });

        return this;

    }

});

module.exports = new Server({
    port: process.env.API_PORT,
    databaseAdapter: MemoryAdapter,
    resources: resources
}).start();
