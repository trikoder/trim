<template>
       <div class="image"></div>
</template>

<script>

export default {

    props: {
        imageId: String,
        clientId: String,
        type: String
    },

    componentType: 'image',

    insertCaption: 'Image',

    prepareDataModel(done) {

        done({
            type: 'image',
            imageId: '12345'
        });

    }

};
</script>

<style lang="scss" scoped>

    .image {
        min-height: em(100);
        border: 1px solid $colorGrayLight1; border-radius: 5px;
    }

</style>
