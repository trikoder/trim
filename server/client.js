import BrowserServer from 'json-api-shop/servers/browser.js';
import MemoryAdapter from 'json-api-shop/adapters/memory.js';
import resources from './resources.js';

const isDevelopment = process.env.NODE_ENV !== 'production';
const currentDataVersion = process.env.PACKAGE_VERSION;

const LocalStorageAdapter = MemoryAdapter.extend({

    seed() {

        try {
            const rawStoredDataset = localStorage.getItem('trimDataset');
            const storedDataset = JSON.parse(rawStoredDataset);

            if (storedDataset.version !== currentDataVersion) {
                throw new Error('Dataset version mismatch');
            } else {
                this.dataset = storedDataset.dataset;
            }

        } catch (error) {
            this.resetData();
        }

    },

    resetData() {

        MemoryAdapter.prototype.seed.call(this);
        this.persistToStorage();

    },

    persistToStorage() {

        try {
            localStorage.setItem('trimDataset', JSON.stringify({
                version: currentDataVersion,
                dataset: this.dataset
            }));
        } catch (error) {
            if (isDevelopment) {
                console.log(error);
            }
        }
        return Promise.resolve();

    }

});
const Server = BrowserServer.extend({

    resetData() {

        this.database.resetData();
        return this;

    },

    setupRoutes(app) {

        app.post(process.env.BASE_API_URL + 'media/upload', (request, response) => {
            response.set('Content-Type', 'application/javascript');
            response.set('Access-Control-Expose-Headers', 'Location');
            response.set('Location', 'https://trikoder.github.io' + process.env.BASE_API_URL + 'media/1');
            response.send('');
        });

        return BrowserServer.prototype.setupRoutes.call(this, app);

    }

});

export default new Server({
    baseUrl: process.env.BASE_API_URL,
    databaseAdapter: LocalStorageAdapter,
    resources,
    logResponse: isDevelopment
}).start();
