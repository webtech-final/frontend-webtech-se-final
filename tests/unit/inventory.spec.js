import {
    RouterLinkStub,
    shallowMount,
    mount,
    createLocalVue,
    enableAutoDestroy,
    config,
} from '@vue/test-utils';
import inventory from '@/views/Inventory.vue';
import inventoryTable from '@/components/inventory/InventoryTable.vue';
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

describe('inventory', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(inventoryTable, {
            localVue,
            router,
        });
    });

    it('render', () => {
        expect(wrapper.exists()).toBe(true);

        wrapper = shallowMount(inventory, {
            localVue,
            router,
        });

        expect(wrapper.exists()).toBe(true);
    });

    it('display Your Inventory text', async () => {
        await Vue.nextTick();
        expect(wrapper.text()).toContain('Your Inventory');
    });

    it('display 15 points text', async () => {
        await Vue.nextTick();
        expect(wrapper.text()).toContain('15 points');
    });

    it('display BLock Theme text', async () => {
        await Vue.nextTick();
        expect(wrapper.text()).toContain('Block Theme >');
    });

    it('display Background text', async () => {
        await Vue.nextTick();
        expect(wrapper.text()).toContain('Background >');
    });

    it('display Block Card', async () => {
        await Vue.nextTick();
        expect(wrapper.find('#inven-card').text()).toContain('Default Block');
        expect(wrapper.find('#inven-card').text()).toContain('Equipped');
    });

    it('display Background Card', async () => {
        await Vue.nextTick();
        await Vue.nextTick();
        expect(
            wrapper
                .findAll('#back-card')
                .at(0)
                .text(),
        ).toContain('Default Background');
        expect(
            wrapper
                .findAll('#back-card')
                .at(0)
                .text(),
        ).toContain('Equip');
    });

    it('display Relax Background Card', async () => {
        await Vue.nextTick();
        await Vue.nextTick();
        expect(
            wrapper
                .findAll('#back-card')
                .at(1)
                .text(),
        ).toContain('Relax');
        expect(
            wrapper
                .findAll('#back-card')
                .at(1)
                .text(),
        ).toContain('Equipped');
    });

    it('can equip defult background', async () => {
        await Vue.nextTick();
        await Vue.nextTick();
        await wrapper
            .findAll('#back-card')
            .at(0)
            .trigger('click');
        expect(wrapper.vm.$data.equipped_back[0].name === 'Relax').toBe(true);
    });
});
