export default {

    extendsController: 'BaseResourceEdit',

    getModel: Model => Model.getFromApi({type: 'user', id: 1}),

    setupEdit({edit}) {

        this.setPageTitle('My settings');

        if (this.screenIsLarge) {
            this.addControl({
                caption: 'Documentation',
                action: () => window.open('https://trikoder.github.io/trim/', '_blank')
            });
        }

        this.addSaveControl();

        edit.addField('TextFormElement', {
            label: 'Email',
            name: 'email',
            attributes: {input: {class: 'inputType2 size2'}}
        });

    }

};
