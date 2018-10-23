import {assert} from 'chai';
import {mount} from '@vue/test-utils';
import Text from 'cmf/js/formElements/text';

describe('Text form element', () => {

    it('renders input tag', () => {

        const wrapper = mount(Text);
        assert.isTrue(wrapper.contains('input'));

    });

    it('emmits input event for v-model directives', () => {

        const wrapper = mount(Text);
        const input = wrapper.find('input');

        input.setValue('value1');
        input.setValue('value2');

        assert.deepEqual(wrapper.emitted().input, [['value1'], ['value2']]);

    });

    it('has "inputWrapperEnd" slot', () => {

        const wrapper = mount(Text, {
            slots: {
                inputWrapperEnd: '<p class="testTarget">Test</p>'
            }
        });

        assert.isTrue(wrapper.contains('.testTarget'));

    });

});
