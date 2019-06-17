import {assert} from 'chai';
import {mount} from '@vue/test-utils';
import FormElement from 'trim/formElements/textarea';

describe('Textarea form element', () => {

    it('renders textarea tag', () => {

        const wrapper = mount(FormElement);
        assert.isTrue(wrapper.contains('textarea'));

    });

    it('label "for" attribute points to textarea id', () => {

        const wrapper = mount(FormElement, {propsData: {label: 'test'}});
        const label = wrapper.find('label');
        const input = wrapper.find('textarea');

        assert.isDefined(label.attributes('for'));
        assert.isDefined(input.attributes('id'));
        assert.equal(label.attributes('for'), input.attributes('id'));

    });

    it('emits input event for v-model directives', () => {

        const wrapper = mount(FormElement);
        const input = wrapper.find('textarea');

        input.setValue('value1');
        assert.deepEqual(wrapper.emitted().input, [['value1']]);

    });

    it('binds value prop to textarea element', () => {

        const wrapper = mount(FormElement);
        const input = wrapper.find('textarea');

        wrapper.setProps({value: 'test'});
        assert.equal(input.element.value, 'test');

    });

});
