import littleLoader from 'little-loader';
import bootData from '../library/bootData.js';
import app from '../app.js';

const ckeditorPath = new URL('../../../node_modules/ckeditor/ckeditor.js', import.meta.url);
let ckeditorImport = null;
function importCkEditor() {
    if (ckeditorImport) {
        return ckeditorImport;
    }
    ckeditorImport = new Promise((resolve, reject) => {
        littleLoader(ckeditorPath.href, (error) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
    return ckeditorImport;
}

export function load() {

    window.CKEDITOR_BASEPATH = bootData(
        'ckEditorPath',
        'https://cdn.ckeditor.com/4.11.4/standard-all/'
    );

    return importCkEditor().then(() => {

        const locale = app.getLocale();
        const ckeditor = window.CKEDITOR;

        ckeditor.disableAutoInline = true;
        ckeditor.config.defaultLanguage = locale;
        ckeditor.config.language = locale;
        ckeditor.config.extraPlugins = 'sourcedialog';
        ckeditor.config.entities = false;

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
