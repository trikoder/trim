<template>
    <nav :class="[
        'pagination',
        {withLimitOptions: showLimitOptions}
    ]">

        <div v-if="showLimitOptions" class="limitOptions">
            <p>{{ translations.resultsCaption }}:</p>
            <button
                v-for="limitOption in limitOptions"
                :key="limitOption"
                type="button"
                :class="['nBtn limitOption', {selected: limit === limitOption}]"
                @click.prevent="selectLimit(limitOption)"
            >{{ limitOption }}</button>
        </div>

        <p class="totalItems">
            <span class="caption">{{ translations.totalItemsCaption }}</span>
            <span class="count">{{ totalItems }}</span>
        </p>

        <ul v-if="totalPages > 1" class="pages">

            <li class="prev">
                <a
                    v-if="currentPage !== 1"
                    class="iconArrowLeft icon page icr"
                    :href="getUrlForPage(currentPage - 1)"
                    @click.prevent="selectPage(currentPage - 1)"
                >
                    {{ currentPage - 1 }}
                </a>
                <button v-else class="iconArrowLeft disabled icon icr"></button>
            </li>

            <li>
                <a
                    :class="['page', {selected: 1 == currentPage}]"
                    :href="getUrlForPage(1)"
                    @click.prevent="selectPage(1)"
                >1</a>
            </li>

            <template v-if="middlePages">
                <li v-if="middlePages.hasStartSeparator">
                    <span class="separator">...</span>
                </li>

                <li v-for="page in middlePages.range" :key="page">
                    <a
                        :class="['page', {selected: page == currentPage}]"
                        :href="getUrlForPage(page)"
                        @click.prevent="selectPage(page)"
                    >{{ page }}</a>
                </li>

                <li v-if="middlePages.hasEndSeparator">
                    <span class="separator">...</span>
                </li>
            </template>

            <li>
                <a
                    :class="['page', {selected: totalPages === currentPage}]"
                    :href="getUrlForPage(totalPages)"
                    @click.prevent="selectPage(totalPages)"
                >{{ totalPages }}</a>
            </li>

            <li class="next">
                <a
                    v-if="currentPage < totalPages"
                    class="iconArrowRight page icon icr"
                    :href="getUrlForPage(currentPage + 1)"
                    @click.prevent="selectPage(currentPage + 1)"
                >{{ currentPage + 1 }}
                </a>
                <button v-else class="iconArrowRight disabled icon icr"></button>
            </li>

        </ul>

    </nav>
</template>

<script>

import userPreferences from '../library/userPreferences.js';
import translate from '../library/translate.js';
import {range} from '../library/toolkit.js';
import bootData from '../library/bootData.js';
import screenSize from '../mixins/screenSize.js';

const Pagination = {

    mixins: [screenSize],

    props: {
        currentPage: {type: Number, default: 1},
        getUrlForPage: {type: Function, required: true},
        totalItems: {type: Number, required: true},
        limit: {type: Number, required: true},
        limitOptions: {type: Array, default: () => bootData('apiPagination.limitOptions', [10, 15, 30, 60])},
        showLimitOptions: {type: Boolean, default: false}
    },

    data: () => ({
        translations: {
            resultsCaption: translate('pagination.resultsCaption'),
            totalItemsCaption: translate('pagination.totalItemsCaption')
        }
    }),

    computed: {

        totalPages() {

            return Math.ceil(this.totalItems / this.limit);

        },

        middlePages() {

            const current = this.currentPage;
            const total = this.totalPages;
            const lookAheadCount = this.screenIsSmall ? 1 : 2;

            if (total <= 2) {
                return null;
            }

            let end = current + lookAheadCount;
            let start = current - lookAheadCount;

            // constrain interval start
            if (start <= 1) {
                start = 2;
                end = 2 * lookAheadCount + 1;
            }

            // show page number insted of separator on interval start
            if (start === 3) {
                start = 2;
            }

            // constrain interval end
            if (end + 1 >= total) {
                end = total - 1;
            }

            // show page number insted of separator at interval end
            if (end + 1 === total - 1) {
                end++;
            }

            return {
                hasStartSeparator: start > 3,
                hasEndSeparator: total - end > 1,
                range: range(start, end)
            };

        }

    },

    methods: {

        selectLimit(limit) {

            this.$emit('limitRequest', limit);

        },

        selectPage(page) {

            this.$emit('pageRequest', page);

        }

    },

    setLimit(resourceName, limit) {

        userPreferences.set('pagination.' + resourceName + '.itemsPerPage', limit);
        return this;

    },

    getLimit(resourceName = 'default') {

        return userPreferences.get(
            'pagination.' + resourceName + '.itemsPerPage',
            bootData('apiPagination.itemsPerPage', bootData('itemsPerPage', 15))
        );

    },

    getApiParams(resourceName, page = 1) {

        page = parseInt(page, 10);
        page = page <= 0 ? 1 : page;

        const strategy = Pagination.getStrategy();
        const limit = Pagination.getLimit(resourceName);

        if (strategy === 'offsetBased') {

            return {
                [Pagination.getKey('offset', strategy)]: (page - 1) * limit,
                [Pagination.getKey('limit', strategy)]: limit
            };

        } else if (strategy === 'pageBased') {

            return {
                [Pagination.getKey('number', strategy)]: page,
                [Pagination.getKey('limit', strategy)]: limit
            };

        } else {
            throw new Error('Unknown api pagination strategy');
        }

    },

    getPageFromQuery(pageQuery) {

        const strategy = bootData('apiPagination.strategy', 'offsetBased');

        if (strategy === 'offsetBased') {

            const offset = pageQuery[Pagination.getKey('offset', strategy)];
            const limit = pageQuery[Pagination.getKey('limit', strategy)];
            return offset / limit + 1;

        } else if (strategy === 'pageBased') {

            return pageQuery[Pagination.getKey('number', strategy)];

        } else {
            throw new Error('Unknown api pagination strategy');
        }

    },

    getLimitFromQuery(pageQuery) {

        return pageQuery[Pagination.getKey('limit')];

    },

    getStrategy() {

        return bootData('apiPagination.strategy', 'offsetBased');

    },

    getKey(name, strategy) {

        strategy = strategy || Pagination.getStrategy();

        const registry = {
            offsetBased: {
                limit: bootData('apiPagination.limitKey', 'limit'),
                offset: bootData('apiPagination.offsetKey', 'offset')
            },
            pageBased: {
                limit: bootData('apiPagination.limitKey', 'size'),
                number: bootData('apiPagination.numberKey', 'number')
            }
        };

        return registry[strategy][name];

    }

};

export default Pagination;

</script>

<style lang="scss" scoped>

    .pages {

        display: block; position: relative; padding: 0 3.6em; overflow: hidden;

        > li {
            display: inline-block;
        }

    }

    .limitOptions {

        > p, > .limitOption {

            font-size: em(13,10); display: inline-block; line-height: divide(30,13); vertical-align: middle;
            color: $colorGrayDark2; letter-spacing: 0.03em;

        }

        > p {

            margin-right: em(3,13);

        }

        > .limitOption {

            padding: 0 em(10,13);

            &.selected {

                @include fontSansCondensedBold;
                background: rgba(#000, 0.05); border-radius: em(4,13);

            }

        }

    }

    .next, .prev {

        position: absolute; top: 50%; margin-top: -2em;

    }

    .next {

        right: 0;

    }

    .prev {

        left: 0;

    }

    .page {

        @include normalizeButton;

        font-size: 1.4em; display:inline-block; padding: em(8,14) em(10,14); margin: 0 -1px;
        color: $colorGrayDark2;

        @include hover {

            color: $colorMain1;

        }

        &.selected {

            color: $colorMain1;

        }

    }

    .icon {

        @include normalizeButton;

        font-size: 1.4em; width: em(40,14); height: em(40,14); padding: 0;

        &:before { font-size: 0.9em; }

        &.disabled {

            cursor: default; opacity: 0.2;

        }

    }

    .separator {

        font-size: 1.3em;

    }

    .totalItems {

        float: right; font-size: 1.4em; padding: em(8,14) em(15,14);
        color: $colorGrayDark2;

        > .caption {

            opacity: 0.5;
            &:after { content: ": "; }

        }

        > .count {}

    }

    @include mediaMaxWidth($breakpointMedium) {

        .totalItems { display: none; }

        .icon:before { font-size: 1.2em; }

        .limitOptions {

            padding: 0 1.5em 1em; box-sizing: border-box;
            border-bottom: 1px solid $colorGrayLight1;

        }

        .pages {

            display: block; padding: 1em 0.3em; text-align: center;

        }

    }

    @include mediaMinWidth($breakpointMedium) {

        .totalItems { display: block; }

        .withLimitOptions {

            @include clearfix;

            > .pages {

                float: right;

            }

            > .limitOptions {

                float: left;

            }

        }

    }

</style>
