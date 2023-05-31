<template>
   <div class="galleryComponent">
        <textarea-form-element
            :value="title" :attributes="{input: {
                class: 'inputType2 fontBold',
                style: {fontSize: '20px', border: 0},
                placeholder: 'Gallery title',
                spellcheck: false
            }}"
            @input="updateComponent({title: $event})"
        ></textarea-form-element>
        <ul class="galleryItems" ref="galleryItems">
            <li
                v-for="item in items" :key="item.mediaId"
                class="galleryItem" :ref="'galleryItem-' + item.mediaId"
            >
                <img
                    class="galleryImage"
                    :src="'http://picsum.photos/200/150?random=' + item.mediaId"
                >
                <textarea-form-element class="galleryCaption"
                    :value="item.caption" :attributes="{input: {
                        class: 'inputType2',
                        style: {border: 0},
                        placeholder: 'Enter caption',
                        spellcheck: false
                    }}"
                    @input="updateItemCaption(item, $event)"
                ></textarea-form-element>
                <div class="itemControls">
                    <button
                        type="button" data-gallery-move-handle="true"
                        class="itemControl nBtn icr iconMove"
                    >Move</button>
                    <button
                        type="button" @click="removeItem(item)"
                        class="itemControl nBtn icr iconTrash"
                    >Remove</button>
                </div>
            </li>
        </ul>
        <div class="bottomControls">
            <button type="button" class="nBtn" @click="addItems">
                Add new items
            </button>
            <select-form-element
                :value="template" class="templateSelect"
                :selectOptions="[
                    {caption: 'Default template', value: 'default'},
                    {caption: 'Fullscreen template', value: 'fullscreen'}
                ]"
                :attributes="{
                    inputWrapper: {class: 'selectType2 fullWidth'}
                }"
                @input="updateComponent({template: $event})"
            ></select-form-element>
        </div>
        <component-controls
            :controls="defaultControls"
        ></component-controls>
   </div>
</template>

<script>
import TextareaFormElement from 'trim/formElements/textarea.vue';
import SelectFormElement from 'trim/formElements/select.vue';
import baseComponent from 'trim/formElements/htmlComponents/baseComponent.vue';
import ExternalAdmin from 'trim/formElements/externalAdmin.vue';
import {elementIndex} from 'trim/library/toolkit.js';

export default {

    mixins: [baseComponent],

    components: {
        TextareaFormElement,
        SelectFormElement
    },

    componentType: 'gallery',

    insertCaption: 'Gallery',

    props: {
        type: String,
        title: String,
        template: String,
        items: Array
    },

    mounted() {

        this.setupReordering();

    },

    beforeUnmount() {

        if (this.drake) {
            this.drake.destroy();
        }

    },

    methods: {

        updateItemCaption(updatedItem, caption) {

            this.updateComponent({
                items: this.items.map(item => {
                    return updatedItem === item
                        ? Object.assign({}, item, {caption})
                        : item
                    ;
                })
            });

        },

        removeItem(itemToRemove) {

            this.confirmRemove(() => {

                this.updateComponent({
                    items: this.items.filter(item => item !== itemToRemove)
                });

            });

        },

        addItems() {

            this.$options.prepareDataModel(data => {

                const currentIds = this.items.map(item => item.mediaId);
                const newItems = data.items.filter(
                    item => currentIds.indexOf(item.mediaId) < 0
                );

                this.updateComponent({
                    items: this.items.concat(newItems)
                });

            });

        },

        setupReordering() {

            const galleryItems = this.$refs.galleryItems;

            import('dragula').then(({default: dragula}) => {

                this.drake = dragula([galleryItems], {
                    moves: (el, source, handle, sibling) => {
                        return Boolean(handle.getAttribute('data-gallery-move-handle'));
                    },
                    mirrorContainer: galleryItems,
                    direction: 'vertical'
                });

                this.drake.on('drop', () => {

                    /* eslint-disable vue/no-mutating-props */
                    this.updateComponent({
                        items: this.items.sort((item1, item2) => {

                            return elementIndex(
                                this.$refs['galleryItem-' + item1.mediaId][0]
                            ) - elementIndex(
                                this.$refs['galleryItem-' + item2.mediaId][0]
                            );

                        })
                    });

                });

            });

        }

    },

    prepareDataModel(done) {

        ExternalAdmin.selectMany('media', models => {

            done({
                title: '',
                template: 'default',
                items: models.filter(
                    model => model.get('mediaType') === 'image'
                ).map(model => ({
                    mediaId: model.get('id'),
                    caption: model.get('title')
                }))
            });

        }, {
            controllerMethodParams: [{}, {mediaType: 'image'}]
        });

    }

};
</script>

<style lang="scss" scoped>

.galleryComponent {
    position: relative;
    border-radius: 5px; box-sizing: border-box;
    margin: 2em 0; padding: 1.3em 6em 0 2em;
    border: 1px solid $colorGrayLight1;
    background: #fff;
}

.componentControls {
    border: 0; background: transparent;
}

.galleryItems {
    padding: 1.3em 0 0;
    border-bottom: 1px solid $colorGrayLight1;

    @include mediaMaxWidth($breakpointMedium) {
        margin-right: -4em;
    }
}

.galleryItem {
    position: relative; box-sizing: border-box;
    padding: 0.5em 6em 0.5em 8em;
    border-top: 1px solid $colorGrayLight1;
    background: #fff;
}

.galleryImage {
    position: absolute; left: 0; top: 0.5em; width: 7em;
    border-radius: 2px; overflow: hidden;
}

.galleryCaption {
    box-sizing: border-box; padding: 0.5em 0;
}

.itemControls {
    position: absolute; right: -1em; top: 1.1em;
}

.itemControl {
    color: darken($colorGrayLight2, 15%);
    width: 3em;

    &:hover {
        color: darken($colorGrayLight2, 30%);
    }

    &:before {
        font-size: 1.4em;
    }

    &[data-gallery-move-handle] {
        cursor: move;
    }
}

.bottomControls {
    @include fontSans;
    padding: 1em 0;

    button {
        font-size: 1.2em; padding: em(10,12) 0;
        color: $colorGrayDark3; transition: color 0.2s;

        &:hover, &:focus {
            color: $colorGrayDark1;
        }
    }

    @include mediaMaxWidth($breakpointMedium) {
        margin-right: -4em;
    }
}

.templateSelect {
    float: right;

    :deep() .selectType2 {
        border: 0;
    }

    :deep() .buttonControl {
        font-size: 0.75em; padding-right: em(25,12);
        color: $colorGrayDark3;
    }
}

</style>
