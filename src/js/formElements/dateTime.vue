<script>

import {assign} from '../library/toolkit';
import formatDate from '../library/formatDate';
import DateFormElement from './date';

const Component = DateFormElement.extend({

    props: {
        format: {type: String, default: 'ISOString'},
        displayFormat: {type: String, default: 'DD.MM.YYYY HH:mm'},
        pickTime: {type: Boolean, default: true},
        pickMinutes: {type: Boolean, default: true},
        pickSeconds: {type: Boolean, default: false},
        formatDate: {
            type: Function,
            default: (date, dateFormat) => {
                return dateFormat === 'ISOString'
                    ? date.toISOString()
                    : formatDate(date, dateFormat)
                ;
            }
        }
    }

});

assign(Component, {

    getElementType() {

        return 'dateTime';

    },

    getDefaultValue: (options = {}) => options.value || ''

});

export default Component;

</script>
