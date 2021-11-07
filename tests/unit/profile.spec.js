import {
    RouterLinkStub,
    shallowMount,
    createLocalVue,
    config,
    enableAutoDestroy,
} from '@vue/test-utils';
import VueSweetalert2 from 'vue-sweetalert2';
import VueRouter from 'vue-router';
import profile from '@/views/Profile.vue';
import profileInfo from '@/components/profile/Profile.vue';
import versuslog from '@/components/profile/VersusLog.vue';
import playlog from '@/components/profile/PlayLog.vue';
import pointlog from '@/components/profile/PointLog.vue';
import Vue from 'vue';

Vue.config.silent = true;
config.showDeprecationWarnings = false;
enableAutoDestroy(afterEach);

const router = new VueRouter();
const localVue = createLocalVue();

localVue.use(VueSweetalert2);
localVue.use(VueRouter);

const mockUser = {
    created_at: '2021-11-07T12:24:12.000000Z',
    email: 'test@test.com',
    email_verified_at: null,
    id: 5,
    image: null,
    name: 'playerName',
    play_histories: [
        {
            created_at: '2021-11-07T12:27:59.000000Z',
            id: 5,
            mode: 'single',
            opponent: null,
            result: 'WIN',
            score: 3500,
            updated_at: '2021-11-07T12:27:59.000000Z',
            user_id: 5,
        },
    ],
    point: 15,
    point_histories: [
        {
            created_at: '2021-11-07T12:27:59.000000Z',
            id: 4,
            point: 35,
            type: 'get',
            updated_at: '2021-11-07T12:27:59.000000Z',
            user_id: 5,
        },
        {
            created_at: '2021-11-07T12:27:59.000000Z',
            id: 5,
            point: 20,
            type: 'use',
            updated_at: '2021-11-07T12:27:59.000000Z',
            user_id: 5,
        },
    ],
};

jest.mock('@/store/pointHistory', () => {
    return {
        getters: {
            transactions: [
                {
                    id: 5,
                    point: 20,
                    type: 'use',
                    created_at: '2021-11-07T12:27:59.000000Z',
                    updated_at: '2021-11-07T12:28:05.000000Z',
                    user_id: 5,
                },
            ],
        },
        dispatch: () => Promise.resolve(),
    };
});

jest.mock('@/store/playHistory', () => {
    return {
        getters: {
            match_single: [
                {
                    id: 1,
                    mode: 'versus',
                    opponent: 'GUEST',
                    result: 'LOST',
                    score: 3500,
                    created_at: '2021-11-07T12:27:59.000000Z',
                    updated_at: '2021-11-07T12:27:59.000000Z',
                    user_id: 5,
                    user: {
                        id: 5,
                        image: null,
                        name: 'playerName',
                    },
                },
            ],
            match_versus: [
                {
                    id: 1,
                    mode: 'single',
                    opponent: null,
                    result: 'WIN',
                    score: 3500,
                    created_at: '2021-11-07T12:27:59.000000Z',
                    updated_at: '2021-11-07T12:27:59.000000Z',
                    user_id: 5,
                    user: {
                        id: 5,
                        image: null,
                        name: 'playerName',
                    },
                },
            ],
        },
        dispatch: () => Promise.resolve(),
    };
});

jest.mock('@/store/authUser', () => {
    return {
        getters: {
            user: {
                created_at: '2021-11-07T12:24:12.000000Z',
                email: 'test@test.com',
                email_verified_at: null,
                id: 5,
                image: null,
                name: 'playerName',
                play_histories: [
                    {
                        created_at: '2021-11-07T12:27:59.000000Z',
                        id: 5,
                        mode: 'single',
                        opponent: null,
                        result: 'WIN',
                        score: 3500,
                        updated_at: '2021-11-07T12:27:59.000000Z',
                        user_id: 5,
                    },
                ],
                point: 15,
                point_histories: [
                    {
                        created_at: '2021-11-07T12:27:59.000000Z',
                        id: 4,
                        point: 35,
                        type: 'get',
                        updated_at: '2021-11-07T12:27:59.000000Z',
                        user_id: 5,
                    },
                    {
                        created_at: '2021-11-07T12:27:59.000000Z',
                        id: 5,
                        point: 20,
                        type: 'use',
                        updated_at: '2021-11-07T12:27:59.000000Z',
                        user_id: 5,
                    },
                ],
            },
            isAuthen: true,
        },
        dispatch: something => {},
    };
});

describe('profile', () => {
    let wrapper;
    it('render', () => {
        wrapper = shallowMount(profile, {
            localVue,
            router,
        });
        expect(wrapper.exists()).toBe(true);

        wrapper = shallowMount(profileInfo, {
            localVue,
            router,
            stubs: {
                RouterLink: RouterLinkStub,
            },
        });
        expect(wrapper.exists()).toBe(true);
    });

    it('proflie show info', () => {
        wrapper = shallowMount(profileInfo, {
            stubs: {
                RouterLink: RouterLinkStub,
            },
            propsData: {
                currentUser: mockUser,
            },
        });

        expect(wrapper.text()).toContain('playerName');
        expect(wrapper.text()).toContain('test@test.com');
        expect(wrapper.text()).toContain('15');
        expect(wrapper.text()).toContain('November 7, 2021');
    });

    it('click edit to show edit page', () => {
        wrapper = shallowMount(profileInfo, {
            stubs: {
                RouterLink: RouterLinkStub,
            },
            propsData: {
                currentUser: mockUser,
            },
        });

        expect(wrapper.findComponent(RouterLinkStub).props().to).toStrictEqual({
            name: 'EditProfile',
        });
    });

    it('show single history date', async () => {
        wrapper = shallowMount(playlog, {
            stubs: {
                RouterLink: RouterLinkStub,
            },
        });

        await wrapper.setData({
            matchs: [
                {
                    id: 1,
                    mode: 'single',
                    opponent: null,
                    result: 'WIN',
                    score: 3500,
                    created_at: '2021-11-07T12:27:59.000000Z',
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

        expect(wrapper.text()).toContain('07/11/2021');
    });

    it('show single history score', async () => {
        wrapper = shallowMount(playlog, {
            stubs: {
                RouterLink: RouterLinkStub,
            },
        });

        await wrapper.setData({
            matchs: [
                {
                    id: 1,
                    mode: 'single',
                    opponent: null,
                    result: 'WIN',
                    score: 3500,
                    created_at: '2021-11-07T12:27:59.000000Z',
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

        expect(wrapper.text()).toContain('3500');
    });

    it('show versus history', async () => {
        wrapper = shallowMount(versuslog, {
            stubs: {
                RouterLink: RouterLinkStub,
            },
        });

        await wrapper.setData({
            matchs: [
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

        expect(wrapper.text()).toContain('3500');
    });

    it('show versus history date', async () => {
        wrapper = shallowMount(versuslog, {
            stubs: {
                RouterLink: RouterLinkStub,
            },
        });

        await wrapper.setData({
            matchs: [
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

        expect(wrapper.text()).toContain('07/11/2021');
    });

    it('show versus history result', async () => {
        wrapper = shallowMount(versuslog, {
            stubs: {
                RouterLink: RouterLinkStub,
            },
        });

        await wrapper.setData({
            matchs: [
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

        expect(wrapper.text()).toContain('WIN');
    });

    it('show versus history score', async () => {
        wrapper = shallowMount(versuslog, {
            stubs: {
                RouterLink: RouterLinkStub,
            },
        });

        await wrapper.setData({
            matchs: [
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

        expect(wrapper.text()).toContain('3500');
    });

    it('show pointlog point', async () => {
        wrapper = shallowMount(pointlog, {
            stubs: {
                RouterLink: RouterLinkStub,
            },
        });

        await wrapper.setData({
            transactions: [
                {
                    id: 5,
                    point: 20,
                    type: 'use',
                    created_at: '2021-11-07T12:27:59.000000Z',
                    updated_at: '2021-11-07T12:28:05.000000Z',
                    user_id: 5,
                },
            ],
        });

        expect(wrapper.text()).toContain('20');
    });

    it('show pointlog type', async () => {
        wrapper = shallowMount(pointlog, {
            stubs: {
                RouterLink: RouterLinkStub,
            },
        });

        await wrapper.setData({
            transactions: [
                {
                    id: 5,
                    point: 20,
                    type: 'use',
                    created_at: '2021-11-07T12:27:59.000000Z',
                    updated_at: '2021-11-07T12:28:05.000000Z',
                    user_id: 5,
                },
            ],
        });

        expect(wrapper.text()).toContain('USE');
    });

    it('show pointlog date', async () => {
        wrapper = shallowMount(pointlog, {
            stubs: {
                RouterLink: RouterLinkStub,
            },
        });

        await wrapper.setData({
            transactions: [
                {
                    id: 5,
                    point: 20,
                    type: 'use',
                    created_at: '2021-11-07T12:27:59.000000Z',
                    updated_at: '2021-11-07T12:28:05.000000Z',
                    user_id: 5,
                },
            ],
        });

        expect(wrapper.text()).toContain('07/11/2021');
    });
});
