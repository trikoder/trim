# Changelog

## 0.76.0
* Addition: hint text on all form elements
* Change: update package dependencies

## 0.75.0
* Addition: allow customization of nested select form element collection and model types
* Change: nested select form element "resourceQuery" prop renamed to "collectionQuery"

## 0.74.0
* Addition: resourceAlias property to enable mutiple controllers for one resource
* Addition: add api includes for base resource edit controllers
* Change: faster nested resource list rendering

## 0.73.0
* Change: disable character encoding in html form element
* Change: fix nested selected form element typo

## 0.72.0
* Addition: allow omitting empty form element values when saving resource
* Change: fix html form element rendering with empty component collection

## 0.71.0
* Addition: context prop in html components form element for passing arbitrary contextual data

## 0.70.2
* Change: update html form elements style

## 0.70.1
* Addition: example gallery and table content components added to demo codebase
* Change: html components form element is editable when no components are defined

## 0.70.0
* Addition: support for position aware rendering in nested resource controlle…
* Change: translate html components form element captions

## 0.69.0
* Addition: media form element can set query params on media controller before media select
* Addition: media list element correctly renders file media types
* Addition: better visualization of expanded state on nested resource controller and form element
* Change: remove html components form element double bottom margin
* Change: mass actions dropdown remains open when deselecting models

## 0.68.1
* Change: html components form element styling

## 0.68.0
* Addition: html components form element

## 0.67.1
* Change: update popup styles

## 0.67.0
* Addition: customize header UI on small screen via scss variables
* Addition: css class option for controllers
* Addition: api for customization of empty list message text
* Change: update pagination rendering
* Change: update package dependencies

## 0.66.0
* Addition: allow main navigation item custom action
* Addition: override after save behavior on resource controller
* Change: update package dependencies
* Change: fix html editor auto inline bugs
* Change: catch errors from new router push api

## 0.65.0
* Addition: add navigation item parent caption to app search results
* Addition: allow custom search engine implemenation

## 0.64.0
* Addition: allow custom translation variable interpolation
* Change: dialog prompt and dropdowns styling

## 0.63.0
* Addition: api for adding locale specific pluralization rules
* Addition: external app links allowed in main navigation and search

## 0.62.1
* Change: fix code form element read-only state on startup

## 0.62.0
* Addition: reasonable defaults for custom form elements
* Change: upgrade toolkit object check and deep assign
* Change: unhandled errors are thrown on resource controllers
* Change: update modal stacking order

## 0.61.0
* Addition: add option to prepend caption on resource list elements
* Addition: support for custom main navigation item component
* Addition: support for 4 and 5 group column layout od resource edit
* Change: update non interactive form elements styling

## 0.60.2
* Change: simplify scss style variables overriding

## 0.60.1
* Change: update router navigation api

## 0.60.0
* Addition: add additional view components in admin and admin navigation layout
* Addition: tabs on resource edit UI are linkable with configurable urls
* Addition: resource controller has extended error handling api
* Addition: app wide pub/sub event bus
* Change: always use api includes when persisting resource model
* Change: fix base url missing from manually generated urls
* Change: simplify scss style variables overriding

## 0.59.0
* Addition: add api for updating resource edit field definitions on the fly
* Addition: allow all form element to be set as not editable
* Change: filter out disabled form elements values when updating resource
* Change: fix select form element styling

## 0.58.0
* Addition: extend resource edit api to disallow resurce saving
* Addition: enable custom download action in file attachment
* Addition: add input like style option for select form element
* Addition: add instance reference to external admin afterControllerMount hook

## 0.57.0
* Addition: column field layout styles on resource edit
* Addition: state select form element supports numeric and boolean states

## 0.56.0
* Addition: allow validation error lookup configuration
* Addition: add api pagination strategies and configuration
* Addition: add support for external login workflow

## 0.55.1
* Change: update project dependencies to latest stable versions

## 0.55.0
* Change: update project dependencies to latest stable versions

## 0.54.9
* Change: update project dependencies

## 0.54.8
* Change: fix #4 tick icon in checkbox form element
* Change: use date time picker and dismiss directive via external packages

## 0.54.7
* Change: computed properties on form elements refactored to simplify rendering logic
* Change: refactored number form element

## 0.54.6
* Change: adjusted file upload UI logic on media form element

## 0.54.5
* Change: media form element will open file upload dialog when thumbnail placeholder is clicked

## 0.54.4
* Change: adjust media form element value handling
* Change: update demo media file upload codebase

## 0.54.3
* Change: adjust color form element UI
* Change: harden included admin row instance retrieval logic

## 0.54.2
* Change: style adjustments for small screens
* Change: adjust resource controls rendering logic on resource controllers
* Change: adjust file upload component / media controller styling
* Change: refactor color form element and add simple color validation

## 0.54.1
* Change: updated user navigation items logic in navigation component

## 0.54.0
* Addition: color form element for visual previews of color entered via text input
* Addition: add validation checks to media and file attachment form elements (accepted files and file size)
* Change: allow form elements to peek outside filter component in contracted state
* Change: allow closing date-time picker on small screens via overlay click
* Change: refactored file attachment form element to libraries already used in project
* Change: simplified media list item api
* Change: updated html form element to disable zooming on mobile safari
* Change: adjusted select form element to set proper value after options are populated
* Change: updated language files
* Change: minor style changes throughout application

## 0.53.1
* Change: code and map form elements render correctly in off-screen scenarios

## 0.53.0
* Addition: code form element for rendering and editing mixed html content with syntax highlighting
* Change: simplified form and list elements component definition

## 0.52.1
* Change: update tab navigation styles on resource edit for small screens

## 0.52.0
* Addition: allow patch method for resource update
