import {createStore} from 'vuex';

export default createStore({

    state: {
        breakpoint: undefined,
        selectedNavKey: undefined,
        projectCaption: undefined,
        breadcrumbs: undefined,
        loading: false,
        popupLevel: 0
    },

    mutations: {

        setBreakpoint(state, breakpoint) {
            state.breakpoint = breakpoint;
        },

        setNavSelected(state, key) {
            state.selectedNavKey = key;
        },

        setProjectCaption(state, projectCaption) {
            state.projectCaption = projectCaption;
        },

        setBreadcrumbs(state, breadcrumbs) {
            state.breadcrumbs = breadcrumbs;
        },

        loading(state, isLoading) {
            state.loading = Boolean(isLoading);
        },

        addPopup(state) {

            const maxLevel = 2;
            const currentLevel = state.popupLevel;

            state.popupLevel = currentLevel + 1 > maxLevel ? maxLevel : currentLevel + 1;

        },

        removePopup(state) {

            if (state.popupLevel) {
                state.popupLevel--;
            }

        }

    },

    actions: {}

});
