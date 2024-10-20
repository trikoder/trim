<template>
    <element-wrapper v-bind="elementWrapperProps">
        <div v-once ref="mapContainer" v-bind="inputAttributes" class="container"></div>
        <div class="disableOverlay" v-if="!isInteractive"></div>
    </element-wrapper>
</template>

<script>
import base from './base.vue';
import ElementWrapper from './elementWrapper.vue';
import {assign, elementFromString} from '../library/toolkit.js';
import {loadApi} from '../library/googleMaps.js';
import translate from '../library/translate.js';

export default {

    elementType: 'map',

    components: {ElementWrapper},

    mixins: [base],

    props: {
        modelValue: {type: String, default: ''},
        zoom: {type: Number, default: 12},
        delimiter: {type: String, default: ','},
        initialLat: {type: Number, default: 45.79815157817745},
        initialLng: {type: Number, default: 15.970237255096436},
        search: {type: Boolean, default: true},
        mapOptions: {type: Object}
    },

    data() {
        return {
            shouldDisplayMap: this.visible
        };
    },

    watch: {

        modelValue(newValue) {

            if (this.shouldDisplayMap) {
                newValue
                    ? this.setMarker(this.parseLatLng(newValue))
                    : this.removeMarker()
                ;
            }

        }

    },

    mounted() {

        const unWatch = this.$watch('visible', isVisible => {

            if (isVisible) {
                this.shouldDisplayMap = true;
                this.$nextTick(() => {
                    unWatch();
                    this.bootstrapMap();
                });
            }

        }, {immediate: true});

    },

    methods: {

        parseLatLng(stringValue) {

            const vals = stringValue.split(this.delimiter).map(val => parseFloat(val));
            return {lat: vals[0], lng: vals[1]};

        },

        bootstrapMap() {

            if (this.bootstrapMapPromise) {
                return this.bootstrapMapPromise;
            }

            this.bootstrapMapPromise = loadApi().then(google => {

                const centerLatLng = this.modelValue
                    ? this.parseLatLng(this.modelValue)
                    : {lat: this.initialLat, lng: this.initialLng}
                ;

                const map = this.map = new google.maps.Map(this.$refs.mapContainer, assign({
                    center: centerLatLng,
                    zoom: this.zoom,
                    disableDefaultUI: true
                }, this.mapOptions));

                if (this.modelValue) {
                    this.setMarker(centerLatLng);
                }

                if (this.search) {
                    this.setupSearch(google, map);
                }

                google.maps.event.addListener(map, 'click', e => {
                    this.$emit('update:modelValue', [e.latLng.lat(), e.latLng.lng()].join(this.delimiter));
                });

                return {map, google};

            });

            return this.bootstrapMapPromise;

        },

        setupSearch(google, map) {

            const searchEl = elementFromString(`
                <div class="mapSearch iconSearch">
                    <input placeholder="${translate('formElements.map.searchPlaceholder')}" type="text" />
                </div>
            `);
            const searchInput = searchEl.querySelector('input');

            searchInput.addEventListener('keydown', e => {
                if (e.which === 13) {
                    e.preventDefault();
                    e.stopPropagation();
                }
            });

            map.controls[google.maps.ControlPosition.TOP_LEFT].push(searchEl);

            const searchBox = new google.maps.places.SearchBox(searchInput);

            google.maps.event.addListener(searchBox, 'places_changed', () => {

                const location = searchBox.getPlaces()[0].geometry.location;
                this.$emit('update:modelValue', [location.lat(), location.lng()].join(this.delimiter));

            });

        },

        setMarker: function(latLng) {

            this.bootstrapMap().then(({map, google}) => {

                if (!this.marker) {

                    this.marker = new google.maps.Marker({
                        map,
                        draggable: true,
                        position: latLng
                    });

                    google.maps.event.addListener(this.marker, 'dragend', e => {
                        this.$emit('update:modelValue', [e.latLng.lat(), e.latLng.lng()].join(this.delimiter));
                    });

                    const control = elementFromString(`
                        <button type="button" class="removeMarker nBtn iconX">
                            ${translate('formElements.map.removeMarkerCaption')}
                        </button>
                    `);

                    control.addEventListener('click', () => this.$emit('update:modelValue', ''));

                    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(control);

                }

                this.marker.setPosition(latLng);
                map.panTo(latLng);

            });

        },

        removeMarker() {

            this.bootstrapMap().then(({map, google}) => {

                map.controls[google.maps.ControlPosition.TOP_RIGHT].clear();
                this.marker && this.marker.setMap(null);
                delete this.marker;

            });

        }

    }

};
</script>

<style lang="scss">

    @use '../../scss/library/all' as *;

    .mapElementType1 {

        position: relative; padding: 0.5em; padding-bottom: percentage(divide(1,2));
        background-color: #fff; border: 1px solid $colorGrayLight2; border-radius: 0.3em;

        > .container {

            position: absolute; left: 0.5em; top: 0.5em; right: 0.5em; bottom: 0.5em;

        }

        > .disableOverlay {

            position: absolute; left: 0.5em; top: 0.5em; right: 0.5em; bottom: 0.5em;

        }

        .mapSearch {

            padding: 1em;

            &:before {

                font-size: 1.2em; opacity: 0.5; left: 0.4em;

            }

            > input {

                appearance: none;
                @include fontSansCondensed;
                font-size: 1.6em; min-width: em(200,16); padding: em(5,16); padding-left: em(25,16);
                border: 0; background-color: #fff; box-shadow: 0 0.1em 0.3em rgba(#000, 0.1);
                border-radius: em(3,16);

            }

        }

        .removeMarker {

            @include fontSansCondensed;

            font-size: em(14,11); color: darken(#e9e8e6, 50%);
            display: block; margin: em(10,14); padding: em(5,14) em(22,14) em(5,14) em(10,14);
            background-color: #e9e8e6; border-radius: em(3,14); opacity: 0.9;

            &:hover {

                opacity: 1;

            }

            &:before {

                left: auto; right: 0; font-size: 0.6em; width: 25px;

            }

        }

    }

</style>
