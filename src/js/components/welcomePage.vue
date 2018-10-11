<template>
    <div class="welcomePage">
        <resource-header
            v-bind:breadcrumbs="[{caption: 'Start page'}]"
            v-bind:hasBottomBorder="true"
        ></resource-header>
        <div class="info">
            <h1>Hello!</h1>
            <p>Your new CMS is up and ready for development!</p>
        </div>
    </div>
</template>

<script>
import ResourceHeader from './resourceHeader';

export default {

    components: {ResourceHeader},

    created() {

        this.$store.commit('setNavSelected', 'startPage');

    }

};
</script>

<style lang="scss" scoped>

    .info {

        @include fontSans;
        animation: slideDownFadeIn 0.5s;
        padding: 20em 0 3em; display: block;
        text-align: center;

    }

    .welcomePage {

        h1  {

            @include fontSansBold; display: inline-block;
            font-size: 8em; margin-bottom: em(20,80); padding-bottom: em(10,80);
            border-bottom: 1px solid $colorGrayLight1; letter-spacing: -0.03em;
            opacity: 0.7;

        }

        p {

            @include fontSans; font-size: 1.7em;
            opacity: 0.9;

        }

    }

</style>
