<template>
       <div class="quote">
            <textarea-form-element
                :value="text" :attributes="{input: {
                    class: 'inputType2',
                    placeholder: 'Enter qoute text',
                    spellcheck: 'false'
                }}"
                @input="updateComponent({text: $event})"
            ></textarea-form-element>
            <input
                class="author" type="text" placeholder="Enter qoute author"
                :value="author" @input="updateComponent({
                    author: $event.target.value
                })">
            <component-controls :controls="defaultControls"></component-controls>
       </div>
</template>

<script>
import TextareaFormElement from 'trim/formElements/textarea';
import baseComponent from 'trim/formElements/htmlComponents/baseComponent';

export default {

    mixins: [baseComponent],

    components: {
        TextareaFormElement
    },

    componentType: 'qoute',

    insertCaption: 'Quote component',

    props: {
        type: String,
        text: String,
        author: String
    },

    prepareDataModel(done) {

        done({
            type: 'qoute',
            text: '',
            author: ''
        });

    }

};
</script>

<style lang="scss" scoped>

.quote {
    min-height: em(100); position: relative;
    margin: 2em 0; padding-right: 6em;
    clear: both;

    ::v-deep .inputType2 {
        font-size: em(24,10); padding: 0;
        border: 0;
    }

    @include mediaMinWidth($breakpointMedium) {
        margin: 2em 0 2em -2em;
    }
}

.author {
    @include fontSans;
    font-size: em(14,10);
    display: block; padding: em(8,14) 0; width: 100%;
    border: 0; color: $colorGrayDark2; background: #fff;
}


</style>
