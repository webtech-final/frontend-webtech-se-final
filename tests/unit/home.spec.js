import {
    RouterLinkStub,
    shallowMount,
    config,
    enableAutoDestroy,
    createLocalVue,
} from '@vue/test-utils';
import home from '../../src/views/Home.vue';
import Chat from '@/components/chat/Chat.vue';
import EnterRoom from '@/components/home/EnterRoom.vue';
import VueSweetalert2 from 'vue-sweetalert2';
import VueRouter from 'vue-router';
import Vue from 'vue';

Vue.config.silent = true;
config.showDeprecationWarnings = false;
enableAutoDestroy(afterEach);

const router = new VueRouter();
const localVue = createLocalVue();

localVue.use(VueSweetalert2);
localVue.use(VueRouter);

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
        dispatch: () => Promise.resolve(),
    };
});

jest.mock('@/store/itemStore', () => {
    return {
        getters: {
            block_inven: [
                {
                    created_at: '2021-10-30T21:35:27.000000Z',
                    deleted_at: null,
                    id: 1,
                    item_details: [
                        {
                            created_at: '2021-10-30T21:35:27.000000Z',
                            deleted_at: null,
                            id: 1,
                            image_path: null,
                            item_id: 1,
                            name: 'Default Block',
                            updated_at: '2021-10-30T21:35:27.000000Z',
                        },
                    ],
                    name: 'Default Block',
                    point: 0,
                    type: 'block',
                    updated_at: '2021-10-30T21:35:27.000000Z',
                },
            ],
            back_inven: [
                {
                    created_at: '2021-10-30T21:35:27.000000Z',
                    deleted_at: null,
                    id: 2,
                    item_details: [
                        {
                            created_at: '2021-10-30T21:35:27.000000Z',
                            deleted_at: null,
                            id: 2,
                            image_path: null,
                            item_id: 2,
                            name: 'Default Background',
                            updated_at: '2021-10-30T21:35:27.000000Z',
                        },
                    ],
                    name: 'Default Background',
                    point: 0,
                    type: 'background',
                    updated_at: '2021-10-30T21:35:27.000000Z',
                },
                {
                    created_at: '2021-11-04T08:14:00.000000Z',
                    deleted_at: null,
                    id: 3,
                    item_details: [
                        {
                            created_at: '2021-11-04T08:14:00.000000Z',
                            deleted_at: null,
                            id: 3,
                            image_path: null,
                            item_id: 3,
                            name: 'backgroundImage',
                            updated_at: '2021-11-04T08:14:00.000000Z',
                        },
                    ],
                    name: 'Relax',
                    point: 20,
                    type: 'background',
                    updated_at: '2021-11-04T08:14:00.000000Z',
                },
            ],
            block_equipped: [
                {
                    created_at: '2021-10-30T21:35:27.000000Z',
                    deleted_at: null,
                    id: 1,
                    image_details: [
                        {
                            created_at: '2021-10-30T21:35:27.000000Z',
                            deleted_at: null,
                            id: 1,
                            image_path: 'storage/default/theme-default.jpg',
                            item_id: 1,
                            name: 'Default Block',
                            updated_at: '2021-10-30T21:35:27.000000Z',
                        },
                    ],
                    name: 'Default Block',
                    point: 0,
                    type: 'block',
                    updated_at: '2021-10-30T21:35:27.000000Z',
                },
            ],
            back_equipped: [
                {
                    created_at: '2021-11-04T08:14:00.000000Z',
                    deleted_at: null,
                    id: 3,
                    item_details: [
                        {
                            created_at: '2021-11-04T08:14:00.000000Z',
                            deleted_at: null,
                            id: 3,
                            image_path: null,
                            item_id: 3,
                            name: 'backgroundImage',
                            updated_at: '2021-11-04T08:14:00.000000Z',
                        },
                    ],
                    name: 'Relax',
                    point: 20,
                    type: 'background',
                    updated_at: '2021-11-04T08:14:00.000000Z',
                },
            ],
        },
        dispatch: () => Promise.resolve(),
    };
});

describe('HomePage.', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(home, {
            router,
            localVue,
            stubs: {
                RouterLink: RouterLinkStub,
            },
            methods: {
                setBackgoundImage: () => {},
                isAuthen: () => true,
            },
        });
    });

    it('renders', () => {
        expect(wrapper.exists()).toBe(true);
    });

    it('display text', () => {
        expect(wrapper.text()).toContain('TETRIS');
        expect(wrapper.text()).toContain('.VS');
        expect(wrapper.text()).toContain('PLAY');
        expect(wrapper.text()).toContain('JOIN');
        expect(wrapper.text()).toContain('CREATE');
        expect(wrapper.text()).toContain('score/point');
    });

    it('see Chat if loggin', () => {
        const chat = wrapper.findComponent(Chat);
        expect(chat.exists()).toBe(true);
    });

    it('dont see Chat if not loggin', () => {
        const chat = wrapper.findComponent(Chat);
        wrapper.setMethods({ isAuthen: () => false });
        expect(chat.exists()).toBe(false);
    });

    it('click play to play singleplayer mode', () => {
        expect(wrapper.findComponent(RouterLinkStub).props().to).toBe('/single');
    });

    it('show enter room when click join', async () => {
        await wrapper.find('#join').trigger('click');
        const enterRoom = wrapper.findComponent(EnterRoom);
        expect(enterRoom.exists()).toBe(true);
    });

    it('show enter room when click create', async () => {
        await wrapper.find('#create').trigger('click');
        const enterRoom = wrapper.findComponent(EnterRoom);
        expect(enterRoom.exists()).toBe(true);
    });

    it('show enter room when click join', async () => {
        await wrapper.find('#join').trigger('click');
        const enterRoom = wrapper.findComponent(EnterRoom);
        expect(enterRoom.exists()).toBe(true);
    });

    it('show enter room when click create', async () => {
        await wrapper.find('#create').trigger('click');
        const enterRoom = wrapper.findComponent(EnterRoom);
        expect(enterRoom.exists()).toBe(true);
    });

    it('show pointRate', async () => {
        await wrapper.setData({ rate: 100 });
        expect(wrapper.find('#pointRate').text()).toBe('100 score/point');
    });
});
