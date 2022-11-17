import {Model, Collection} from 'json-api-resource';
import httpMixin from 'json-api-resource/lib/httpMixin.js';
import bootData from './bootData.js';
import {publish} from './eventBus.js';
import api from './api.js';

httpMixin({
    Model,
    Collection,
    baseUrl: '',
    http: api
});

const oldModelSave = Model.prototype.save;

Model.prototype.save = function() {

    return oldModelSave.apply(this, arguments).then(model => {
        publish('resourceSaved', model);
        return model;
    });

};

Model.getTypeUrlSegment = type => bootData('resourceToApiMap.' + type) || type;

export {Model, Collection};
