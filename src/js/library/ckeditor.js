import bootData from '../library/bootData';
import app from '../app';

export function load() {

    window.CKEDITOR_BASEPATH = bootData(
        'ckEditorPath',
        'https://cdn.ckeditor.com/4.10.0/standard-all/'
    );

    return import('ckeditor').then(() => {

        const locale = app.getLocale();
        const ckeditor = window.CKEDITOR;

        ckeditor.config.defaultLanguage = locale;
        ckeditor.config.language = locale;
        ckeditor.config.extraPlugins = 'sourcedialog';

        // ckeditor.config.extraPlugins = 'sourcedialog,specialchar,pastetext';

        ckeditor.customStyles = {
            richCombo: `
                .body, html { margin: 0; padding: 0; }
                .cke_panel_block { padding: 5px 0; outline: none !important; }
                .cke_panel_list { list-style:none; padding: 0; margin: 0; }
                .cke_panel_listItem { padding: 0; margin; 0; }
                .cke_panel_listItem a { font-family: Arial; display:block; padding: 5px 10px; text-decoration:none; font-size: 13px; color: #303030; }
                .cke_panel_listItem a:hover { background-color: #ededed; }
            `
        };

        return ckeditor;

    });

};
