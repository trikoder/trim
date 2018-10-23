import {assert} from 'chai';
import {mount} from '@vue/test-utils';
import Text from 'cmf/js/formElements/text';

describe('Text form element', () => {

    it('renders input tag', () => {

        const wrapper = mount(Text);
        assert.isTrue(wrapper.contains('input'));

    });

    it('label "for" attribute points to input id', () => {

        const wrapper = mount(Text, {propsData: {label: 'test'}});
        const label = wrapper.find('label');
        const input = wrapper.find('input');

        assert.isDefined(label.attributes('for'));
        assert.isDefined(input.attributes('id'));
        assert.equal(label.attributes('for'), input.attributes('id'));

    });

    it('emmits input event for v-model directives', () => {

        const wrapper = mount(Text);
        const input = wrapper.find('input');

        input.setValue('value1');
        input.setValue('value2');

        assert.deepEqual(wrapper.emitted().input, [['value1'], ['value2']]);

    });

    it('renders "inputWrapperEnd" slot', () => {

        const wrapper = mount(Text, {
            slots: {
                inputWrapperEnd: '<p class="testTarget"></p>'
            }
        });

        assert.isTrue(wrapper.contains('.testTarget'));

    });

});
