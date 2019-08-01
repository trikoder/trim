<template>
    <nav class="mainNavigation" v-bind:class="{active: isOpened}" v-on-dismiss="{callback: close, watch: isOpened}">
        <div class="overlay" v-if="isOpened" v-on:click="close"></div>
        <button v-on:click="toggle" class="nBtn toggleBtn iconMenu icr">
            {{ getProjectCaption() }}
        </button>
        <div class="inner">
            <button v-on:click="toggle" class="nBtn toggleBtn iconMenu">
                {{ getProjectCaption() }}
            </button>
            <div class="scrollWrapper">
                <div class="scroller" v-bar>
                    <ul class="menu">
                        <li
                            v-for="item in navigationItems"
                            v-bind:class="{opened: item.opened}"
                            v-bind:key="item.key"
                        >
                            <template v-if="!item.subItems">
                                <a
                                    v-bind:href="item.url"
                                    v-bind:class="['item', item.icon ? 'icon' + item.icon : '', {selected: item.selected}]"
                                    v-bind:title="item.caption"
                                    v-on:click.prevent="openItem(item)"
                                >
                                    {{ item.caption }}
                                    <span v-if="!item.icon" class="initials">{{ item.initials }}</span>
                                </a>
                            </template>
                            <template v-else>
                                <button
                                    type="button"
                                    v-bind:class="['nBtn itemToggle', item.icon ? 'icon' + item.icon : '', {selected: item.selected}]"
                                    v-bind:title="item.caption"
                                    v-on:click="toggleGroup(item.key)"
                                >
                                    {{ item.caption }}
                                    <span v-if="!item.icon" class="initials">{{ item.initials }}</span>
                                </button>
                                <ul class="subMenu">
                                    <li v-for="subItem in item.subItems" v-bind:key="subItem.key">
                                        <a
                                            v-bind:href="subItem.url"
                                            v-bind:class="['item', {selected: subItem.selected}]"
                                            v-bind:title="subItem.caption"
                                            v-on:click.prevent="openItem(subItem)"
                                        >
                                            {{ subItem.caption }}
                                        </a>
                                    </li>
                                </ul>
                            </template>
                        </li>
                    </ul>
                </div>
            </div>
            <div
                class="userPanel"
                v-bind:class="{active: isUserPanelOpened}"
                v-on-dismiss="{callback: closeUserPanel, watch: isUserPanelOpened}"
            >
                <button v-on:click="toggleUserPanel" type="button" class="nBtn toggleBtn iconArrowUpCircle">
                    {{ getUserCaption() }}
                </button>
                <ul>
                    <li v-for="item in userNavigationItems" v-bind:key="item.key">
                        <a
                            v-if="item.url"
                            class="item"
                            v-bind:href="item.url"
                            v-html="item.caption"
                            v-on:click.prevent="openUserItem(item)"
                        ></a>
                        <button
                            v-else
                            class="nBtn item"
                            v-html="item.caption"
                            v-on:click="openUserItem(item)"
                        ></button>
                    </li>
                </ul>
                <component
                    v-if="hasAdditionalComponent('userPanel')"
                    :is="getAdditionalComponent('userPanel')"
                ></component>
            </div>
        </div>
        <global-events
            :filter="(event, handler, eventName) => { return ['INPUT', 'TEXTAREA'].indexOf(event.target.tagName) < 0; }"
            v-on:keyup.shift.76.exact="showSearch"
        />
    </nav>
</template>

<script>
import Vue from 'vue';
import {pickTo} from '../library/toolkit';
import vueDismiss from 'vue-dismiss';
import serviceContainer from '../library/serviceContainer';
import GlobalEvents from 'vue-global-events';
import Vuebar from 'vuebar';
import {pascal as pascalCase} from 'to-case';

Vue.use(Vuebar);

export default Vue.extend({

    mixins: [vueDismiss],

    components: {GlobalEvents},

    data() {
        return {
            isOpened: false,
            isUserPanelOpened: false,
            userNavigationItems: this.gleanItems(
                this.getUserNavigationItems(this.$router)
            ),
            navigationItems: this.gleanItems(
                this.getNavigationItems(this.$router)
            )
        };
    },

    computed: {

        selectedNavKey() {
            return this.$store.state.selectedNavKey;
        }

    },

    created() {

        if (this.getAdditionalComponents) {
            this.additionalComponents = this.getAdditionalComponents();
        }

        if (this.selectedNavKey) {
            this.selectItem(this.selectedNavKey);
        }

        this.addStoreData();

    },

    destroyed() {

        this.removeStoreData();

    },

    watch: {

        selectedNavKey(key) {

            this.selectItem(this.selectedNavKey);

        }
    },

    methods: {

        addStoreData() {

            this.$store.commit('setProjectCaption', this.getProjectCaption());
            this.$store.commit('setBreadcrumbs', this.getBreadcrumbs());

            this.$emit('storeUpdated');

            return this;

        },

        removeStoreData() {

            this.$store.commit('setNavSelected', undefined);
            this.$store.commit('setProjectCaption', undefined);
            this.$store.commit('setBreadcrumbs', undefined);

            return this;

        },

        open() {

            this.isOpened = true;
            return this;

        },

        close() {

            this.isOpened = false;
            this.isUserPanelOpened = false;
            return this;

        },

        toggle() {

            return this.isOpened ? this.close() : this.open();

        },

        openUserPanel() {

            this.open();
            this.isUserPanelOpened = true;
            return this;

        },

        closeUserPanel() {

            this.isUserPanelOpened = false;
            return this;

        },

        toggleUserPanel() {

            return this.isUserPanelOpened ? this.closeUserPanel() : this.openUserPanel();

        },

        openItem(item) {

            this.selectItem(item.key);
            this.$router.push(item.url);
            this.close();

        },

        selectItem(key) {

            this.navigationItems.forEach(item => {

                item.selected = item.key === key;

                if (item.subItems) {

                    item.opened = false;

                    item.subItems.forEach(subItem => {
                        subItem.selected = subItem.key === key;
                        if (subItem.selected) {
                            item.selected = item.opened = true;
                        }
                    });

                }

            });

        },

        toggleGroup(key) {

            this.navigationItems.forEach(item => {
                if (item.subItems) {

                    const navIsOpened = this.isOpened;
                    const isCurrentlyOpened = item.opened;
                    const isSearchItem = item.key === key;

                    item.opened = isSearchItem ? (!navIsOpened ? true : !isCurrentlyOpened) : false;
                }
            });

            this.open();

        },

        openUserItem(item) {

            if (item.action) {
                item.action(this);
            } else if (item.appLink) {
                this.$router.push(item.url);
            } else {
                window.open(item.url, '_blank');
            }

            this.close();

            return this;

        },

        gleanItems(items) {

            return items.map(item => this.gleanItem(item)).reduce((filteredItems, navItem) => {

                if (navItem.subItems) {

                    navItem.subItems = navItem.subItems.filter(subItem => {
                        let showIf = subItem.showIf;
                        delete subItem.showIf;
                        return showIf;
                    });

                    if (navItem.subItems.length) {
                        filteredItems.push(navItem);
                    }

                } else {

                    if (navItem.showIf) {
                        filteredItems.push(navItem);
                    }

                }

                delete navItem.showIf;

                return filteredItems;

            }, []);

        },

        gleanItem(item) {

            const caption = item.caption || item.name;
            const key = item.key || item.alias || caption;

            const data = {
                caption,
                key,
                appLink: typeof item.appLink !== 'undefined' ? Boolean(item.appLink) : true,
                showIf: typeof item.showIf !== 'undefined' ? Boolean(item.showIf) : true,
                url: item.url ? item.url : (item.routeName ? this.$router.url(item.routeName) : undefined),
                icon: item.icon || item.iconClass,
                initials: this.getInitials(caption),
                action: item.action,
                selected: false,
                opened: false
            };

            if (data.icon) {
                data.icon = pascalCase(data.icon);
            }

            if (item.subItems) {
                data.subItems = item.subItems.map(subItem => this.gleanItem(subItem));
            }

            return data;

        },

        getFlattenedNavigationItems() {

            return this.navigationItems.reduce((acc, item) => {

                item.subItems ? item.subItems.forEach(subItem => {
                    acc.push(subItem);
                }) : acc.push(item);

                return acc;

            }, []).filter(item => item.appLink).map(item => ({
                key: item.key,
                caption: item.caption,
                url: item.url
            }));

        },

        getNavigationItems() {

            return [];

        },

        getUserNavigationItems() {

            return [];

        },

        getProjectCaption() {

            return 'Trikoder cms';

        },

        getUserCaption() {

            return 'Username';

        },

        getInitials(item) {

            return item.substring(0, 2).toUpperCase();

        },

        getBreadcrumbs() {

            const breadcrumbKeys = ['caption', 'key', 'url'];

            return this.navigationItems.reduce((breadcrumbs, item) => {

                if (item.subItems) {
                    item.subItems.forEach(subItem => {
                        breadcrumbs[subItem.key] = [
                            pickTo({}, item, breadcrumbKeys),
                            pickTo({}, subItem, breadcrumbKeys)
                        ];
                    });
                } else {
                    breadcrumbs[item.key] = [pickTo({}, item, breadcrumbKeys)];
                }

                return breadcrumbs;

            }, {});

        },

        getAdditionalComponent(key) {

            return this.additionalComponents && this.additionalComponents[key];

        },

        hasAdditionalComponent(key) {

            return Boolean(this.getAdditionalComponent(key));

        },

        showSearch() {

            serviceContainer.get('AppSearch').then(AppSearch => {

                if (!this.appSearch) {
                    this.appSearch = new AppSearch({
                        propsData: {dataset: this.getFlattenedNavigationItems()},
                        parent: this
                    });
                }

                this.appSearch.open();

            });

            return this;

        }

    }

});

</script>

<style lang="scss" scoped>

    .mainNavigation {

        position: absolute; left: 0; top: 0; bottom: 0; z-index: $zIndexHeader + 10;

        > .toggleBtn {

            width: 5.8em; height: 6em; position: absolute; left: 0; top: 0;

            &:before {

                font-size: 2.2em; color: $colorGrayDark1;

            }

        }

        > .inner {

            transition: transform 0.3s;
            transform: translate3d(0, 0, 0);

            position: fixed; top: 0; bottom: 0; left: -22em; width: 22em;
            background-color: $colorNavigation;

            @include mediaMinWidth($breakpointMedium) {
                position: absolute;
            }

        }

        &.active > .inner {

            transform: translate3d(22em, 0, 0);

        }

        > .inner > .toggleBtn {

            @include fontSansCondensedBold;

            font-size: 2em; height: em(50,20); display: none; width: 100%;
            padding: 0 em(15,20); box-sizing: border-box;
            color: #fff; background-color: $colorMain1; text-align: left;

            > span {

                @include fontSansCondensed;

            }

            &:before {

                font-size: em(19,20); width: em(50,19); left: auto; right: 0;

            }

        }

        .scrollWrapper {

            position: absolute; top: 0; left: 0; right: 0; bottom: 5.1em;
            overflow: auto;

            > .scroller {

                height: 100%;

            }

        }

        .menu {

            .initials {

                @include fontSansCondensedBold;
                font-size: em(16,14); width: em(50,16); line-height: em(48,16); position: absolute; right: 0; top: 0;
                text-align: center; letter-spacing: 0.07em;

            }

            .item,
            .itemToggle {

                @include fontSans;
                transition: color 0.25s, background 0.35s;

                font-size: em(14,10); line-height: (20/14); display: block; width: 100%; box-sizing: border-box;
                position: relative; padding: em(15,14) em(50,14) em(15,14) em(15,14);
                color: rgba(#fff, 0.6); text-align: left;

                &:before {

                    font-size: em(20,14);
                    left: auto; right: 0; width: em(50,20);

                }

                &:hover {

                    color: #fff; background: $colorMain1;

                }

                &.selected {

                    color: #fff; background: darken($colorNavigation, 3.5%);

                    &:after {

                        content: ""; position: absolute; top: 0; bottom: 0; right: 0;
                        width: 3px; background: $colorMain1;

                    }

                }

            }

            .subMenu {

                display: none; padding-bottom: 2em;
                background: darken($colorNavigation, 3.5%);

                .item { padding: em(8,14) em(50,14) em(8,14) em(30,14) }

                .item.selected:after {

                    display: none;

                }

            }

            .opened {

                .itemToggle {

                    color: #fff; background: darken($colorNavigation, 3.5%);

                }

                .item {

                    text-transform: none;

                }

            }

        }

        &.active .menu .opened .subMenu {

            display: block;

        }

        .userPanel {

            position: absolute; bottom: 0; left: 0; right: 0;
            background: darken($colorNavigation, 3.5%);

            > .toggleBtn {

                @include ellipsis;
                @include fontSansCondensedBold;

                font-size: em(12,10); display: block; width: 100%; line-height: (50/12); padding: 0 em(55,12) 0 em(15,12);
                position: relative; z-index: 10; text-align: left;
                color: rgba(#fff, 0.8); text-transform: uppercase; border-top: 1px solid rgba(#fff, 0.2);

                 &:before {

                    font-size: em(19,12); left: auto; right: 0; width: em(50,19);
                    opacity: 0.8;

                }

            }

            > ul {

                position: absolute; bottom: 100%; left: 0; right: 0; padding: 0.5em 0;
                background: darken($colorNavigation, 3.5%); border-top: 1px solid rgba(#fff, 0.2);
                display: none;

            }

            .item {

                @include fontSansCondensedBold;

                font-size: em(12,10); display: block; padding: em(10,12) em(50,12) em(10,12) em(15,12);
                width: 100%; box-sizing: border-box;
                color: rgba(#fff, 0.8); text-transform: uppercase; text-align: left;

                &:hover { color: #fff; }

            }

        }

        &.active .userPanel.active {

            > .toggleBtn { color: #fff; }

            > ul {

                animation: slideUpFadeIn 0.3s;
                display: block;

            }

        }

        @include mediaMaxWidth($breakpointMedium) {

            .overlay {

                animation: fadeIn 0.5s;
                position: fixed; left: 0; right: 0; top: 0; bottom: 0;
                background-color: rgba($colorNavigation, 0.5);

            }

        }

        @include mediaMinWidth($breakpointMedium) {

            > .inner { left: -17em; }

            &.active > .inner {

                transform: translate3d(17em, 0, 0);

            }

            > .toggleBtn { display: none; }
            > .inner > .toggleBtn { display: block; }

            position: fixed;

            .scrollWrapper { top: 5em; }

        }

    }

</style>

<style lang="scss">

    .vb > .vb-dragger {

        transition: opacity 0.2s;
        z-index: 5; width: 10px; right: 0; box-sizing: border-box; padding: 0.2em;
        opacity: 0;
    }

    .vb:hover > .vb-dragger {
        opacity: 1;
    }

    .vb > .vb-dragger > .vb-dragger-styler {
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        -webkit-transform: rotate3d(0,0,0,0);
        transform: rotate3d(0,0,0,0);
        background-color: rgba(#fff, 0.15);
        border-radius: 20px;
        height: 100%;
    }

    ::-webkit-scrollbar {
        width: 0; height: 0;
    }

</style>
