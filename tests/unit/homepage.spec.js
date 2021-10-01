import { mount } from '@vue/test-utils';
import HomePage from '../../src/views/Home.vue';

test('displays LOGO', () => {
    const wrapper = mount(HomePage);

    expect(wrapper.text()).toContain('TERTIS');
});
