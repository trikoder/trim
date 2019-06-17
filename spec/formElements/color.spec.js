import {assert} from 'chai';
import {mount} from '@vue/test-utils';
import FormElement from 'trim/formElements/color';

describe('Color form element', () => {

    it('renders input tag', () => {

        const wrapper = mount(FormElement);
        assert.isTrue(wrapper.contains('input'));

    });

    it('renders color preview element', () => {

        const wrapper = mount(FormElement);

        assert.isTrue(wrapper.find('.colorPreview').exists());
        assert.isFalse(wrapper.vm.isValidColor);

        wrapper.setProps({value: '#000'});
        assert.isTrue(wrapper.vm.isValidColor);

    });

    it('emits input event for v-model directives', () => {

        const wrapper = mount(FormElement);
        const input = wrapper.find('input');

        input.setValue('value1');
        assert.deepEqual(wrapper.emitted().input, [['value1']]);

    });

    it('binds value prop to input element', () => {

        const wrapper = mount(FormElement);
        const input = wrapper.find('input');

        wrapper.setProps({value: 'test'});
        assert.equal(input.element.value, 'test');

    });

});
