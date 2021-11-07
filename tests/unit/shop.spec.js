import {
    RouterLinkStub,
    shallowMount,
    mount,
    createLocalVue,
    enableAutoDestroy,
    config,
} from '@vue/test-utils';
import VueSweetalert2 from 'vue-sweetalert2';
import VueRouter from 'vue-router';
import shop from '@/views/Shop.vue';
import shopTable from '@/components/shop/ShopTable.vue';
import Vue from 'vue';

Vue.config.silent = true;
config.showDeprecationWarnings = false;
enableAutoDestroy(afterEach);

const router = new VueRouter();
const localVue = createLocalVue();

localVue.use(VueSweetalert2);
localVue.use(VueRouter);

jest.mock('@/store/itemStore', () => {
    return {
        getters: {
            block_shop: {
                1: {
                    created_at: '2021-11-04T08:14:43.000000Z',
                    deleted_at: null,
                    id: 4,
                    item_details: [
                        {
                            created_at: '2021-11-04T08:14:43.000000Z',
                            deleted_at: null,
                            id: 4,
                            image_path: 'storage/4/blockS.jpg',
                            item_id: 4,
                            name: 'blockS',
                            updated_at: '2021-11-04T08:14:43.000000Z',
                        },
                        {
                            created_at: '2021-11-04T08:14:43.000000Z',
                            deleted_at: null,
                            id: 5,
                            image_path: 'storage/4/blockZ.jpg',
                            item_id: 4,
                            name: 'blockZ',
                            updated_at: '2021-11-04T08:14:43.000000Z',
                        },
                        {
                            created_at: '2021-11-04T08:14:43.000000Z',
                            deleted_at: null,
                            id: 6,
                            image_path: 'storage/4/blockL.jpg',
                            item_id: 4,
                            name: 'blockL',
                            updated_at: '2021-11-04T08:14:43.000000Z',
                        },
                        {
                            created_at: '2021-11-04T08:14:43.000000Z',
                            deleted_at: null,
                            id: 7,
                            image_path: 'storage/4/blockJ.jpg',
                            item_id: 4,
                            name: 'blockJ',
                            updated_at: '2021-11-04T08:14:43.000000Z',
                        },
                        {
                            created_at: '2021-11-04T08:14:43.000000Z',
                            deleted_at: null,
                            id: 8,
                            image_path: 'storage/4/blockT.jpg',
                            item_id: 4,
                            name: 'blockT',
                            updated_at: '2021-11-04T08:14:43.000000Z',
                        },
                        {
                            created_at: '2021-11-04T08:14:43.000000Z',
                            deleted_at: null,
                            id: 9,
                            image_path: 'storage/4/blockO.jpg',
                            item_id: 4,
                            name: 'blockO',
                            updated_at: '2021-11-04T08:14:43.000000Z',
                        },
                        {
                            created_at: '2021-11-04T08:14:43.000000Z',
                            deleted_at: null,
                            id: 10,
                            image_path: 'storage/4/blockI.jpg',
                            item_id: 4,
                            name: 'blockI',
                            updated_at: '2021-11-04T08:14:43.000000Z',
                        },
                    ],
                    name: 'Animal Crossing',
                    point: 20,
                    type: 'block',
                    updated_at: '2021-11-04T08:14:43.000000Z',
                },
            },
            back_shop: {
                1: {
                    created_at: '2021-11-04T08:14:00.000000Z',
                    deleted_at: null,
                    id: 3,
                    item_details: [
                        {
                            created_at: '2021-11-04T08:14:00.000000Z',
                            deleted_at: null,
                            id: 3,
                            image_path: 'storage/3/backgroundImage.png',
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
            },
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
        dispatch: () => Promise.resolve(),
    };
});

describe('shop', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(shopTable, {
            localVue,
            router,
        });
    });

    it('render', () => {
        expect(wrapper.exists()).toBe(true);

        wrapper = shallowMount(shop, {
            localVue,
            router,
        });

        expect(wrapper.exists()).toBe(true);
    });

    it('display Shop text', () => {
        expect(wrapper.text()).toContain('Shop');
    });

    it('display 15 points text', () => {
        expect(wrapper.text()).toContain('15');
    });

    it('display Block Theme text', () => {
        expect(wrapper.text()).toContain('Block Theme');
    });

    it('display Background text', () => {
        expect(wrapper.text()).toContain('Background');
    });

    it('display Block Card', async () => {
        await Vue.nextTick();
        expect(wrapper.find('#block-card').text()).toContain('Animal Crossing');
        expect(wrapper.find('#block-card').text()).toContain('20 points');
        expect(wrapper.find('#block-card').text()).toContain('Buy');
    });

    it('display Background Card', async () => {
        await Vue.nextTick();
        await Vue.nextTick();
        expect(wrapper.find('#backshop-card').text()).toContain('Relax');
        expect(wrapper.find('#backshop-card').text()).toContain('20 points');
        expect(wrapper.find('#backshop-card').text()).toContain('Buy');
    });
});
