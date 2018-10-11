import {format as formatDate} from 'fecha';

export default function(dateInput, format) {

    try {

        return dateInput ? formatDate(dateInput instanceof Date ? dateInput : new Date(dateInput), format) : '';

    } catch (error) {

        console.log('Date value "' + dateInput + '" is not in correct format!'); // eslint-disable-line no-console

    }

};
