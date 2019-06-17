import {assert} from 'chai';
import {mount} from '@vue/test-utils';
import FormElement from 'trim/formElements/text';

describe('Text form element', () => {

    it('renders input tag', () => {

        const wrapper = mount(FormElement);
        assert.isTrue(wrapper.contains('input'));

    });

    it('label "for" attribute points to input id', () => {

        const wrapper = mount(FormElement, {propsData: {label: 'test'}});
        const label = wrapper.find('label');
        const input = wrapper.find('input');

        assert.isDefined(label.attributes('for'));
        assert.isDefined(input.attributes('id'));
        assert.equal(label.attributes('for'), input.attributes('id'));

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

    it('renders "inputWrapperEnd" slot', () => {

        const wrapper = mount(FormElement, {
            slots: {
                inputWrapperEnd: '<p class="testTarget"></p>'
            }
        });

        assert.isTrue(wrapper.contains('.testTarget'));

    });

});
