<script>
import formatDate from '../library/formatDate';
import fecha from 'fecha';
import DateFormElement from './date';

export default {

    elementType: 'dateTime',

    extends: DateFormElement,

    props: {
        format: {type: String, default: 'ISOString'},
        displayFormat: {type: String, default: 'DD.MM.YYYY HH:mm'},
        pickTime: {type: Boolean, default: true},
        pickMinutes: {type: Boolean, default: true},
        pickSeconds: {type: Boolean, default: false},
        parseDate: {
            type: Function,
            default: (dateString, dateFormat) => {
                return dateFormat === 'ISOString'
                    ? new Date(dateString)
                    : fecha.parse(dateString, dateFormat)
                ;
            }
        },
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

};
</script>
