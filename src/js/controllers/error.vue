<template>
    <div class="errorPageType1">
        <resource-header :breadcrumbs="[{caption: this.getPageTitle()}]" />
        <div class="box">
            <h1>{{title}}</h1>
            <p>{{message}}</p>
        </div>
    </div>
</template>

<script>

import ResourceHeader from '../components/resourceHeader.vue';
import translate from '../library/translate.js';

export default {

    components: {
        ResourceHeader
    },

    data: () => ({
        title: '',
        message: ''
    }),

    methods: {

        pageNotFound() {

            this.title = translate('errorPages.pageNotFound.title');
            this.message = translate('errorPages.pageNotFound.message');

            window.document.title = this.getPageTitle();

        },

        getPageTitle() {

            return this.title + ' - ' + this.message;

        }

    }

};

</script>

<style lang="scss" scoped>

    .errorPageType1 {

        display: flex; justify-content: center; flex-direction: column; min-height: 50em; min-height: calc(100vh - 50px); position: relative;

        > .box {

            animation: slideDownFadeIn 1s;
            display: inline-block; padding-bottom: 6em; text-align: center;

            > h1 {

                @include fontSansCondensed;
                font-size: 12em;
                color: #C8C8C8;

            }

            > p {

                font-size: 2em; color: darken(#C8C8C8, 10%);

            }

        }

    }

</style>
