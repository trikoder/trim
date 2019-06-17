import {assert} from 'chai';
import {mount} from '@vue/test-utils';
import FormElement from 'trim/formElements/select';
import {api, wait} from '../env.js';
import Vue from 'vue';

describe('Select form element', () => {

    it('renders select tag', () => {

        const wrapper = mount(FormElement, {propsData: {
            selectOptions: [
                {caption: 'Caption 1', value: 'value1'},
                {caption: 'Caption 2', value: 'value2'}
            ]
        }});

        return Vue.nextTick().then(() => {
            assert.isTrue(wrapper.contains('select'));
            assert.equal(wrapper.findAll('option').length, 2);
        });

    });

    it('emits input event for v-model directives', () => {

        const wrapper = mount(FormElement, {propsData: {
            value: true,
            selectOptions: [
                {caption: 'Caption 1', value: true},
                {caption: 'Caption 2', value: false}
            ]
        }});

        return Vue.nextTick().then(() => {
            wrapper.find('select').setValue('false');
            assert.deepEqual(wrapper.emitted().input, [[false]]);
        });

    });

    it('binds value prop to select element', () => {

        const wrapper = mount(FormElement, {propsData: {
            selectOptions: [
                {caption: 'Caption 1', value: 1},
                {caption: 'Caption 2', value: 2}
            ]
        }});

        return Vue.nextTick().then(() => {
            const select = wrapper.find('select');
            wrapper.setProps({value: 2});
            assert.equal(select.element.value, '2');
        });

    });

    it('renders select tag with options from api', () => {

        api.start();

        const wrapper = mount(FormElement, {propsData: {
            selectOptions: {
                resource: 'user',
                query: {page: {offset: 0, limit: 3}},
                mapCaptionTo: 'email'
            }
        }});

        return wait().then(() => {

            assert.isTrue(wrapper.contains('select'));
            assert.equal(wrapper.findAll('option').length, 3);
            api.stop();

        });

    });

    it('prepends options to options collection', () => {

        api.start();

        const wrapper = mount(FormElement, {propsData: {
            selectOptions: {
                resource: 'user',
                query: {page: {offset: 0, limit: 3}},
                mapCaptionTo: 'email',
                prepend: [{caption: 'All', value: 'all'}]
            }
        }});

        return wait().then(() => {

            assert.equal(wrapper.findAll('option').length, 4);
            api.stop();

        });

    });

    it('emits first retrieved option value if initial value was not provided', () => {

        api.start();

        const wrapper = mount(FormElement, {propsData: {
            selectOptions: {
                url: api.url + 'user',
                mapCaptionTo: 'email',
                mapValueTo: model => 'id' + model.get('id')
            }
        }});

        return wait().then(() => {

            assert.deepEqual(wrapper.emitted().input, [['id1']]);
            api.stop();

        });

    });

    it('properly extracts initial value from options', () => {

        assert.equal(FormElement.getInitialValue({
            selectOptions: [
                {caption: 'Caption 1', value: 'value1'},
                {caption: 'Caption 2', value: 'value2'}
            ]
        }), 'value1');

        assert.equal(FormElement.getInitialValue({value: 'test'}), 'test');

        assert.equal(FormElement.getInitialValue({
            selectOptions: {
                resource: 'user',
                mapCaptionTo: 'email',
                prepend: [{caption: 'All', value: 'all'}]
            }
        }), 'all');

        assert.equal(FormElement.getInitialValue(), '');
        assert.equal(FormElement.getInitialValue({}), '');
        assert.equal(FormElement.getInitialValue({selectOptions: {}}), '');

    });

});
