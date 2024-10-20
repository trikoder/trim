import ExpressServer from 'json-api-shop/servers/express.js';
import MemoryAdapter from 'json-api-shop/adapters/memory.js';
import fkill from 'fkill';
import resources from './resources.js';

const Server = ExpressServer.extend({

    setupRoutes(app) {

        app.post('/media/upload', (request, response) => {
            response.set('Content-Type', 'application/javascript');
            response.set('Access-Control-Expose-Headers', 'Location');
            response.set('Location', process.env.BASE_API_URL + 'media/1');
            response.send('');
        });

        return ExpressServer.prototype.setupRoutes.call(this, app); ;

    }

});

;(async() => {
    try {
        await fkill(`:${process.env.API_PORT}`);
    } catch {
        // Handled
    }
    new Server({
        port: process.env.API_PORT,
        databaseAdapter: MemoryAdapter,
        resources
    }).start();
})();
