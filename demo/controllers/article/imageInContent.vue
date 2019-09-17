<template>
       <figure class="image" :class="alignment + 'Aligned'">
            <img src="http://picsum.photos/1200/900?random=1">
            <component-controls :controls="imageControls"></component-controls>
            <input
                class="caption" type="text" placeholder="Enter image caption"
                :value="caption" @input="updateComponent({
                    caption: $event.target.value
                })">
       </figure>
</template>

<script>
import baseComponent from 'trim/formElements/htmlComponents/baseComponent';
import ExternalAdmin from 'trim/formElements/externalAdmin';

export default {

    mixins: [baseComponent],

    componentType: 'image',

    insertCaption: 'Image component',

    props: {
        type: String,
        clientId: String,
        imageId: String,
        alignment: String,
        caption: String
    },

    computed: {

        imageControls() {

            return [{
                icon: 'move',
                isSortHandle:true
            }, this.alignment === 'central' ? {
                icon: 'arrowLeft',
                action: () => this.updateComponent({alignment: 'left'})
            } : {
                icon: 'arrowRight',
                action: () => this.updateComponent({alignment: 'central'})
            }, {
                icon: 'trash',
                action: () => this.removeComponent()
            }];

        }
    },

    prepareDataModel(done) {

        ExternalAdmin.select('media', model => {

            done({
                type: 'image',
                imageId: model.get('id'),
                alignment: 'central'
            });

        });

    }

};
</script>

<style lang="scss" scoped>

.image {
    min-height: em(100); position: relative;
    border-radius: 5px; overflow: hidden;
    margin: 2em 0;
}

.leftAligned {
    float: left; width: 50%; margin: 2em 2em 2em -2em;
}

img {
    display: block; width: 100%;
}

.caption {
    @include fontSans;
    font-size: em(13,10);
    display: block; padding: em(8,13) 0; width: 100%;
    border: 0; border-bottom: 1px solid $colorGrayLight1;
    color: $colorGrayDark2; background: #fff;
}

.componentControls {
    right: 1em; top: 1em;
    border: 0;
}

</style>
