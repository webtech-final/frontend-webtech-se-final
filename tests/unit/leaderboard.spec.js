import { shallowMount, createLocalVue, config, enableAutoDestroy } from '@vue/test-utils';
import Leaderboard from '@/components/leaderboard/Leaderboard.vue';
import VueSweetalert2 from 'vue-sweetalert2';
import Vue from 'vue';

Vue.config.silent = true;
config.showDeprecationWarnings = false;
enableAutoDestroy(afterEach);

const localVue = createLocalVue();
localVue.use(VueSweetalert2);

describe('leaderboard', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(Leaderboard, {
            localVue,
        });
    });

    it('render', () => {
        expect(wrapper.exists()).toBe(true);
    });

    it('display SINGLEPLAYER', () => {
        expect(wrapper.find('#single').text()).toBe('(SINGLEPLAYER)');
    });

    it('display VERSUS', () => {
        expect(wrapper.find('#versus').text()).toBe('(VERSUS)');
    });

    it('display player singleplay', async () => {
        await wrapper.setData({
            single: [
                {
                    id: 1,
                    mode: 'single',
                    opponent: null,
                    result: 'WIN',
                    score: 3500,
                    updated_at: '2021-11-07T12:27:59.000000Z',
                    user_id: 5,
                    user: {
                        id: 5,
                        image: null,
                        name: 'playerName',
                    },
                },
            ],
        });

        expect(wrapper.text()).toContain('1');
        expect(wrapper.text()).toContain('playerName');
        expect(wrapper.text()).toContain('3500');
    });

    it('display player versus', async () => {
        await wrapper.setData({
            versus: [
                {
                    id: 1,
                    mode: 'versus',
                    opponent: 'GUEST',
                    result: 'LOST',
                    score: 3500,
                    updated_at: '2021-11-07T12:27:59.000000Z',
                    user_id: 5,
                    user: {
                        id: 5,
                        image: null,
                        name: 'playerName',
                    },
                },
            ],
        });

        expect(wrapper.text()).toContain('1');
        expect(wrapper.text()).toContain('playerName');
        expect(wrapper.text()).toContain('3500');
    });
});
