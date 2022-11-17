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
    AppSearch: () => import('./components/appSearch'),

    // Controllers
    BaseResourceController: () => BaseResourceController,
    BaseResourceEditController: () => import('./controllers/baseResourceEdit'),
    BaseMediaResourceController: () => import('./controllers/baseMediaResource'),
    BaseNestedResourceController: () => import('./controllers/baseNestedResource'),
    ErrorController: () => import('./controllers/error'),
    AuthController: () => import('./controllers/auth'),

    // List items
    TextListItem: () => TextListItem,
    LinkListItem: () => LinkListItem,
    DateListItem: () => DateListItem,
    DateTimeListItem: () => DateTimeListItem,
    BlipListItem: () => BlipListItem,
    ButtonListItem: () => ButtonListItem,
    MediaListItem: () => import('./listElements/media'),
    ContextMenuListItem: () => ContextMenuListItem,

    // Form elements
    TextFormElement: () => TextFormElement,
    NumberFormElement: () => import('./formElements/number'),
    TextareaFormElement: () => TextareaFormElement,
    CheckboxFormElement: () => CheckboxFormElement,
    SelectFormElement: () => SelectFormElement,
    ExternalAdminFormElement: () => ExternalAdminFormElement,
    IncludedAdminFormElement: () => IncludedAdminFormElement,
    StateSelectFormElement: () => import('./formElements/stateSelect'),
    DateFormElement: () => import('./formElements/date'),
    DateTimeFormElement: () => import('./formElements/dateTime'),
    HiddenFormElement: () => import('./formElements/hidden'),
    HtmlFormElement: () => import('./formElements/html'),
    HtmlComponentsFormElement: () => import('./formElements/htmlComponents'),
    MapFormElement: () => import('./formElements/map'),
    MultipleSelectFormElement: () => import('./formElements/multipleSelect'),
    FileAttachmentFormElement: () => import('./formElements/fileAttachment'),
    MediaPreviewFormElement: () => import('./formElements/mediaPreview'),
    MediaFormElement: () => import('./formElements/media'),
    NestedSelectFormElement: () => import('./formElements/nestedSelect'),
    CodeFormElement: () => import('./formElements/code'),
    ColorFormElement: () => import('./formElements/color')

};
