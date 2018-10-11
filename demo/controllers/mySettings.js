export default {

    extendsController: 'BaseResourceEdit',

    getModel: Model => Model.getFromApi({type: 'user', id: 1}),

    setupEdit({edit}) {

        this.setPageTitle('My settings').addSaveControl();

        edit.addField('TextFormElement', {
            label: 'Email',
            name: 'email',
            attributes: {input: {class: 'inputType2 size2'}}
        });

    }

};
