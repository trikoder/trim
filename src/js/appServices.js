import MainNavigation from './components/mainNavigation.vue';
import BaseResourceController from './controllers/baseResource.vue';

import TextListItem from './listElements/text.vue';
import LinkListItem from './listElements/link.vue';
import DateListItem from './listElements/date.vue';
import DateTimeListItem from './listElements/dateTime.vue';
import BlipListItem from './listElements/blip.vue';
import ButtonListItem from './listElements/button.vue';
import ContextMenuListItem from './listElements/contextMenu.vue';

import TextFormElement from './formElements/text.vue';
import TextareaFormElement from './formElements/textarea.vue';
import CheckboxFormElement from './formElements/checkbox.vue';
import SelectFormElement from './formElements/select.vue';
import ExternalAdminFormElement from './formElements/externalAdmin.vue';
import IncludedAdminFormElement from './formElements/includedAdmin.vue';

export default {

    // Common components
    MainNavigation: () => MainNavigation,
    BaseMainNavigation: () => MainNavigation,
    AppSearch: () => import('./components/appSearch.vue'),

    // Controllers
    BaseResourceController: () => BaseResourceController,
    BaseResourceEditController: () => import('./controllers/baseResourceEdit.vue'),
    BaseMediaResourceController: () => import('./controllers/baseMediaResource.vue'),
    BaseNestedResourceController: () => import('./controllers/baseNestedResource.vue'),
    ErrorController: () => import('./controllers/error.vue'),
    AuthController: () => import('./controllers/auth.vue'),

    // List items
    TextListItem: () => TextListItem,
    LinkListItem: () => LinkListItem,
    DateListItem: () => DateListItem,
    DateTimeListItem: () => DateTimeListItem,
    BlipListItem: () => BlipListItem,
    ButtonListItem: () => ButtonListItem,
    MediaListItem: () => import('./listElements/media.vue'),
    ContextMenuListItem: () => ContextMenuListItem,

    // Form elements
    TextFormElement: () => TextFormElement,
    NumberFormElement: () => import('./formElements/number.vue'),
    TextareaFormElement: () => TextareaFormElement,
    CheckboxFormElement: () => CheckboxFormElement,
    SelectFormElement: () => SelectFormElement,
    ExternalAdminFormElement: () => ExternalAdminFormElement,
    IncludedAdminFormElement: () => IncludedAdminFormElement,
    StateSelectFormElement: () => import('./formElements/stateSelect.vue'),
    DateFormElement: () => import('./formElements/date.vue'),
    DateTimeFormElement: () => import('./formElements/dateTime.vue'),
    HiddenFormElement: () => import('./formElements/hidden.vue'),
    HtmlFormElement: () => import('./formElements/html.vue'),
    HtmlComponentsFormElement: () => import('./formElements/htmlComponents/index.vue'),
    MapFormElement: () => import('./formElements/map.vue'),
    MultipleSelectFormElement: () => import('./formElements/multipleSelect.vue'),
    FileAttachmentFormElement: () => import('./formElements/fileAttachment.vue'),
    MediaPreviewFormElement: () => import('./formElements/mediaPreview.vue'),
    MediaFormElement: () => import('./formElements/media.vue'),
    NestedSelectFormElement: () => import('./formElements/nestedSelect/index.vue'),
    CodeFormElement: () => import('./formElements/code.vue'),
    ColorFormElement: () => import('./formElements/color.vue')

};
