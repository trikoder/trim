import {Model, Collection} from 'json-api-resource';
import httpMixin from 'json-api-resource/lib/httpMixin';
import bootData from './bootData';
import api from './api';

httpMixin({
    Model,
    Collection,
    baseUrl: '',
    http: api
});

Model.getTypeUrlSegment = type => bootData('resourceToApiMap.' + type) || type;

export {Model, Collection};
