<template>
    <header class="headerType1" v-bind:class={hasBottomBorder}>
        <h1 class="projectCaption">{{ projectCaption }}</h1>
        <h2 v-if="breadcrumbs.length" class="title">
            <template v-for="(breadcrumb, index) in breadcrumbs">
                <a
                    v-if="breadcrumb.url"
                    v-bind:key="breadcrumb.caption"
                    v-bind:href="breadcrumb.url"
                    v-bind:class="{iconChevronRight: index + 1 < breadcrumbs.length}"
                    v-on:click.prevent="clickBreadcrumb(breadcrumb)"
                >
                    {{ breadcrumb.caption }}
                </a>
                <span
                    v-else
                    v-bind:key="breadcrumb.caption"
                    v-bind:class="{iconChevronRight: index + 1 < breadcrumbs.length}"
                >
                    {{ breadcrumb.caption }}
                </span>
            </template>
        </h2>
        <slot></slot>
    </header>
</template>

<script>

export default {

    props: {
        breadcrumbs: Array,
        hasBottomBorder: {type: Boolean, default: false}
    },

    computed: {

        projectCaption() {

            return this.$store.state.projectCaption;

        }

    },

    methods: {

        clickBreadcrumb(breadcrumb) {

            if (breadcrumb.action) {
                breadcrumb.action();
            } else if (breadcrumb.url) {
                this.$router.push(breadcrumb.url);
            }

        }

    }

};

</script>

<style lang="scss" scoped>

.headerType1 {

    position: relative;
    background-color: #fff;

    @include mediaMaxWidth($breakpointMedium) {

        background-color: #fff; padding-bottom: 0.4em;
        border-bottom: 1px solid $colorGrayLight2;

    }

    > .projectCaption {

        @include fontSansCondensed;
        font-size: 2em; line-height: em(60,20); position: relative;
        padding: 0 em(60,20); text-align: center;
        // text-align: center;

        > span { @include fontSansCondensed; }

    }

    > .title {

        @include fontSansCondensedBold;
        @include ellipsis;
        font-size: 1.2em; padding: em(15,12) em(40,12) em(10,12) em(15,12); box-sizing: border-box; display: block;
        color: $colorGrayDark2; text-transform: uppercase; letter-spacing: 0.04em;

        > a, > span {

            animation: slideDownFadeIn 0.2s;

            color: $colorGrayDark2; padding: 0; padding-right: em(20,12); position: relative; display: inline-block;

            &:before {

                font-size: 0.8em; left: auto; right: em(4,8); top: 47%; text-align: right;
                color: $colorGrayDark2;

            }

            &:last-child { padding-right: 0; }

        }

        > a:hover {

            color: $colorMain1;

        }

        @include mediaMaxWidth($breakpointMedium) {

            padding: em(15,12) em(45,12) em(15,12) em(20,12);

        }

    }

    @include mediaMaxWidth($breakpointMedium) {

        .popupType1 & .projectCaption {

            padding-left: em(50,18);

        }

    }

    @include mediaMinWidth($breakpointMedium) {

        position: fixed; left: 5em; top: 0; right: 0; height: 5em; z-index: $zIndexHeader;
        border-bottom: 1px solid transparent;

        > .projectCaption { display: none; }

        > .title {

            font-size: 1.4em; line-height: em(50,14); padding: 0 em(20,14); display: inline-block;

        }

        &.hasBottomBorder {

            border-bottom-color: $colorGrayLight1;

        }

        .popupType1 & {

            position: absolute; left: 0; right: 0;

        }

        .popupType1 & > .title {

            margin-left: em(30,14);

        }

    }

}

</style>
