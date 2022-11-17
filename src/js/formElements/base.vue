<script>
import {clientId, each, assign} from '../library/toolkit.js';

export default {

    props: {
        label: String,
        name: {type: String},
        id: String,
        resourceModel: Object,
        relation: Object,
        errorMessage: String,
        hint: String,
        readOnly: {type: Boolean, default: false},
        disabled: {type: Boolean, default: false},
        editable: {type: Boolean, default: true},
        saveEmptyValue: {type: Boolean, default: true},
        attributes: {type: Object, default: () => ({})},
        layoutReference: String,
        visible: {type: Boolean, default: true}
    },

    computed: {

        wrapperAttributes() {

            const attributes = this.normalizeAttributes(this.attributes.wrapper);

            if (this.errorMessage) {
                this.addToAttribute(attributes, 'class', 'formElementWithError');
            }

            return attributes;

        },

        labelAttributes() {
            return this.normalizeAttributes(this.attributes.label);
        },

        hintAttributes() {
            return this.normalizeAttributes(this.attributes.hint);
        },

        inputWrapperAttributes() {
            return this.normalizeAttributes(this.attributes.inputWrapper);
        },

        inputAttributes() {

            const attributes = this.normalizeAttributes(this.attributes.input);

            if (this.id || !attributes.id) {
                attributes.id = this.id || ('formElement-' + clientId());
            }

            if (this.name) {
                attributes.name = this.name;
            }

            if (this.readOnly || !this.editable) {
                attributes.readonly = 'readonly';
            }

            if (this.disabled) {
                attributes.disabled = 'disabled';
            }

            return attributes;
        },

        elementWrapperProps() {

            return [
                'wrapperAttributes',
                'labelAttributes',
                'inputWrapperAttributes',
                'hintAttributes',
                'label',
                'hint',
                'errorMessage',
                'visible'
            ].reduce((obj, key) => {
                obj[key] = this[key];
                return obj;
            }, {
                elementId: this.inputAttributes.id
            });

        },

        isInteractive() {
            return !this.readOnly && !this.disabled && this.editable;
        }

    },

    methods: {

        processInputEvent(e) {

            this.$emit('input', e.target.value);

        },

        addToAttribute(obj, key, value) {

            if (obj[key]) {
                obj[key] += ' ' + value;
            } else {
                obj[key] = value;
            }

            return this;

        },

        normalizeAttributes(...attributes) {

            const normalizedAttributes = assign.apply(null, [{}].concat(attributes));

            each(normalizedAttributes, (value, key) => {

                if (typeof value === 'function') {
                    normalizedAttributes[key] = value(this);
                }

            });

            return normalizedAttributes;

        }

    }

};

</script>
