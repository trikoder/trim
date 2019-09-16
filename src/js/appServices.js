import MainNavigation from './components/mainNavigation';
import BaseResourceController from './controllers/baseResource';

import TextListItem from './listElements/text';
import LinkListItem from './listElements/link';
import DateListItem from './listElements/date';
import DateTimeListItem from './listElements/dateTime';
import BlipListItem from './listElements/blip';
import ButtonListItem from './listElements/button';
import ContextMenuListItem from './listElements/contextMenu';

import TextFormElement from './formElements/text';
import TextareaFormElement from './formElements/textarea';
import CheckboxFormElement from './formElements/checkbox';
import SelectFormElement from './formElements/select';
import ExternalAdminFormElement from './formElements/externalAdmin';
import IncludedAdminFormElement from './formElements/includedAdmin';

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
