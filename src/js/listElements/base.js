import {stripTags, escapeHtml, limitCharacters, limitWords, result} from '../library/toolkit.js';

export default {

    props: {
        resourceModel: {type: Object, required: true},
        caption: {type: String, required: true},
        prependCaption: {type: Boolean, default: false},
        mapTo: {type: [String, Function], required: true},
        stripTags: {type: Boolean, default: false},
        escapeHtml: {type: Boolean, default: false},
        limitCharacters: {type: [Boolean, Number], default: false},
        limitWords: {type: [Boolean, Number], default: false},
        attributes: {type: Object, default: () => ({})},
        cellClass: {type: String}
    },

    computed: {

        styleAttribute() {

            return this.attributes.style;

        },

        classAttribute() {

            let defaultClass = '';
            if ('defaultClass' in this) {
                defaultClass = this.defaultClass;
            }

            return this.attributes.class || defaultClass;

        }

    },

    methods: {

        getModelValue() {

            if (typeof this.mapTo === 'function') {
                return this.mapTo(this.resourceModel, this);
            } else {
                return this.resourceModel.get(this.mapTo);
            }

        },

        formatModelValue() {

            let value = this.getModelValue();

            if (Array.isArray(value)) {
                value = value.join(this.collectionDelimiter);
            }

            if (value) {

                if (this.stripTags) {
                    value = stripTags(value);
                }

                if (this.escapeHtml) {
                    value = escapeHtml(value);
                }

                if (this.limitCharacters) {
                    value = limitCharacters(value, this.limitCharacters);
                }

                if (this.limitWords) {
                    value = limitWords(value, this.limitWords);
                }

            }

            if (typeof this.ifEmpty !== 'undefined' && (value === null || value === undefined || value === '')) {
                value = result(this.ifEmpty, [this.resourceModel], this);
            }

            if (this.prependCaption) {
                value = this.caption + ': ' + value;
            }

            return value;

        }

    }

};
