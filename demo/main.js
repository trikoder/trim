import app from 'trim/js/app.js';
import translations from 'trim/js/lang/english.js';
import routes from './routes.js';
import services from './services.js';
import DummyComponent from './dummy.vue';
// import auth from './auth';
import 'apiServer';

import './scss/main.scss';

app
    .setBootData({
        // usePatchForUpdate: false,
        // apiPagination: {
        //     strategy: 'offsetBased',
        //     offsetKey: 'offset',
        //     limitKey: 'limit',
        //     limitOptions: [50, 100, 200, 300, 500],
        //     itemsPerPage: 100
        // }
        // resourceToApiMap: {
        //     article: 'article'
        //     user: 'user'
        // }
        toggleColumnsVisibility: true,
        validationErrorField: 'detail',
        itemsPerPage: process.env.NODE_ENV !== 'production' ? 15 : 10,
        usesPushState: process.env.NODE_ENV !== 'production',
        googleMapsApiKey: 'AIzaSyBVqg9EqOqARXVIaKRSC7pJpVeHKDRoU2I',
        baseUrl: process.env.BASE_URL,
        baseApiUrl: process.env.BASE_API_URL
    })
    .loadTranslations(translations, 'en')
    .registerServices(services)
    .registerRoutes(routes)
    .beforeAdminEnter(() => {})
    .appendAppComponent(DummyComponent)
    // .useAuth(auth)
    .start();
