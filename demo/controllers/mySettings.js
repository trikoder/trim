export default {

    extendsController: 'BaseResourceEdit',
    cssClass: 'mySettingsController',

    getModel: Model => Model.getFromApi({type: 'user', id: 1}),

    setupEdit({edit}) {

        this.setPageTitle('My settings');

        this.addControl({
            caption: 'Documentation',
            action: () => window.open('/trim/', '_blank')
        });

        this.addSaveControl();

        edit.addField('TextFormElement', {
            label: 'Email',
            name: 'email',
            attributes: {input: {class: 'inputType2 size2'}}
        });

    }

};
