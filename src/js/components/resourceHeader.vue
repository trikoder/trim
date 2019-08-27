<template>
    <header class="headerType1" :class={hasBottomBorder}>
        <h1 class="projectCaption">{{ projectCaption }}</h1>
        <h2 v-if="breadcrumbs.length" class="title">
            <template v-for="(breadcrumb, index) in breadcrumbs">
                <a
                    v-if="breadcrumb.url"
                    :key="breadcrumb.caption"
                    :href="breadcrumb.url"
                    :class="{iconChevronRight: index + 1 < breadcrumbs.length}"
                    @click.prevent="clickBreadcrumb(breadcrumb)"
                >
                    {{ breadcrumb.caption }}
                </a>
                <span
                    v-else
                    :key="breadcrumb.caption"
                    :class="{iconChevronRight: index + 1 < breadcrumbs.length}"
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
                this.$router.navigateTo(breadcrumb.url);
            }

        }

    }

};

</script>

<style lang="scss">

.headerType1 {

    position: relative;
    background-color: #fff;

    @include mediaMaxWidth($breakpointMedium) {

        padding-bottom: 0.4em;
        background-color: $colorHeaderSmallScreen;
        border-bottom: 1px solid $colorGrayLight2;

    }

    > .projectCaption {

        @include fontSansCondensed;
        font-size: 2em; line-height: em(60,20); position: relative;
        padding: 0 em(60,20); text-align: center;

        @include mediaMaxWidth($breakpointMedium) {
            color: $colorHeaderTextSmallScreen;
        }

    }

    > .title {

        @include fontSansCondensedBold;
        @include ellipsis;
        font-size: 1.2em; box-sizing: border-box; display: block;
        padding: em(15,12) em(40,12) em(10,12) em(15,12);
        color: $colorGrayDark2;  text-transform: uppercase;
        letter-spacing: 0.04em;

        > a, > span {

            animation: slideDownFadeIn 0.2s;
            padding: 0; padding-right: em(20,12);
            position: relative; display: inline-block;
            color: $colorGrayDark2;

            &:before {

                font-size: 0.8em; left: auto; right: em(4,8); top: 47%; text-align: right;
                color: $colorGrayDark2;

            }

            &:last-child { padding-right: 0; }

        }

        @include mediaMinWidth($breakpointMedium) {

            > a:hover {

                color: $colorMain1;

            }

        }

        @include mediaMaxWidth($breakpointMedium) {

            padding: em(15,12) em(45,12) em(15,12) em(20,12);

            &, > a,  > a:before, > span, > span:before {
                color: $colorHeaderTextSmallScreen;
            }

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

            font-size: 1.45em; line-height: em(50,14.5); padding: 0 em(20,14.5); display: inline-block;

        }

        &.hasBottomBorder {

            border-bottom-color: $colorGrayLight1;

        }

        .popupType1 & {

            position: absolute; left: 0; right: 0;

        }

        .popupType1 & > .title {

            margin-left: em(30,14.5);

        }

    }

}

</style>
