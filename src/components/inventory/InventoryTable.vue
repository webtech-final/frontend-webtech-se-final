<template>
    <div class="inventory-page pb-16">
        <div class="head grid-cols-2 grid font-serif">
            <h1 class="font-semibold">Your Inventory</h1>
            <div class="mr-16 grid justify-items-end text-blue-400">{{ user.point }} points</div>
        </div>
        <div class="inventory-table mt-3">
            <div class="table-head">
                <div class="font-serif font-medium">Block Theme ></div>
                <div class="grid grid-cols-4 font-mono">
                    <div v-for="(block, index) in blocks" :key="index">
                        <div v-if="block.id == 1" class="card">
                            <div class="card-image">
                                <img
                                    src="../../assets/theme-default.png"
                                    alt="default-block"
                                    class="img"
                                />
                            </div>
                            <div class="card-text">
                                <h2>{{ block.name }}</h2>
                            </div>
                            <div v-if="block.id == equipped_block[0].id">
                                <button
                                    class="
                    px-4
                    py-2
                    text-white
                    rounded-lg
                    bg-blue-300
                    mt-1
                    text-3xl
                  "
                                >
                                    Equipped
                                </button>
                            </div>
                            <div class="py-2"></div>
                            <div v-if="block.id != equipped_block[0].id">
                                <button
                                    class="
                    px-4
                    py-2
                    text-white
                    rounded-lg
                    bg-blue-500
                    mt-1
                    text-3xl
                  "
                                    @click="equipItem(block)"
                                >
                                    Equip
                                </button>
                            </div>
                            <div class="py-2"></div>
                        </div>
                        <div v-if="block.id != 1" class="card">
                            <div class="card-image">
                                <img
                                    :src="getApi() + '/' + block.item_details[0].image_path"
                                    alt="block"
                                    class="img"
                                />
                            </div>
                            <div class="card-text">
                                <h2>{{ block.name }}</h2>
                            </div>
                            <div v-if="block.id == equipped_block[0].id">
                                <button
                                    class="
                    px-4
                    py-2
                    text-white
                    rounded-lg
                    bg-blue-300
                    mt-1
                    text-3xl
                  "
                                >
                                    Equipped
                                </button>
                            </div>
                            <div class="py-2"></div>
                            <div v-if="block.id != equipped_block[0].id">
                                <button
                                    class="
                    px-4
                    py-2
                    text-white
                    rounded-lg
                    bg-blue-500
                    mt-1
                    text-3xl
                  "
                                    @click="equipItem(block)"
                                >
                                    Equip
                                </button>
                            </div>
                            <div class="py-2"></div>
                        </div>
                    </div>
                </div>
                <div class="font-serif font-medium">Background ></div>
                <div class="grid grid-cols-4 font-mono">
                    <div v-for="(background, index) in backgrounds" :key="index">
                        <div v-if="background.id == 2" class="card">
                            <div class="card-image">
                                <img
                                    src="../../assets/background-default.jpg"
                                    alt="default-back"
                                    class="img"
                                />
                            </div>
                            <div class="card-text">
                                <h2>{{ background.name }}</h2>
                            </div>
                            <div v-if="background.id == equipped_back[0].id">
                                <button
                                    class="
                    px-4
                    py-2
                    text-white
                    rounded-lg
                    bg-blue-300
                    mt-1
                    text-3xl
                  "
                                >
                                    Equipped
                                </button>
                            </div>
                            <div class="py-2"></div>
                            <div v-if="background.id != equipped_back[0].id">
                                <button
                                    class="
                    px-4
                    py-2
                    text-white
                    rounded-lg
                    bg-blue-500
                    mt-1
                    text-3xl
                  "
                                    @click="equipItem(block)"
                                >
                                    Equip
                                </button>
                            </div>
                            <div class="py-2"></div>
                        </div>
                        <div v-if="background.id != 2" class="card">
                            <div class="card-image">
                                <img
                                    :src="getApi() + '/' + background.item_details[0].image_path"
                                    alt="back"
                                    class="img"
                                />
                            </div>
                            <div class="card-text">
                                <h2>{{ background.name }}</h2>
                            </div>
                            <div v-if="background.id == equipped_back[0].id">
                                <button
                                    class="
                    px-4
                    py-2
                    text-white
                    rounded-lg
                    bg-blue-300
                    mt-1
                    text-3xl
                  "
                                >
                                    Equipped
                                </button>
                            </div>
                            <div class="py-2"></div>
                            <div v-if="background.id != equipped_back[0].id">
                                <button
                                    class="
                    px-4
                    py-2
                    text-white
                    rounded-lg
                    bg-blue-500
                    mt-1
                    text-3xl
                  "
                                    @click="equipItem(background)"
                                >
                                    Equip
                                </button>
                            </div>
                            <div class="py-2"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
let api_endpoint = process.env.VUE_APP_ENDPOINT || 'http://localhost:8000';
import ItemStore from '../../store/itemStore';
import AuthUser from '../../store/authUser';
export default {
    data() {
        return {
            blocks: [],
            backgrounds: [],
            equipped_block: {},
            equipped_back: {},
            user: {},
        };
    },
    async created() {
        this.getUser();
        await this.fetchBlockEquipped();
        await this.fetchBackgroundEquipped();

        await this.fetchBlockInventory();
        await this.fetchBackgroundInventory();
    },
    methods: {
        getApi() {
            return api_endpoint;
        },
        async fetchBlockEquipped() {
            await ItemStore.dispatch('fetchBlockEquipped');
            this.equipped_block = ItemStore.getters.block_equipped;
        },
        async fetchBackgroundEquipped() {
            await ItemStore.dispatch('fetchBackEquipped');
            this.equipped_back = ItemStore.getters.back_equipped;
        },
        async fetchBlockInventory() {
            await ItemStore.dispatch('fetchBlockInventory');
            this.blocks = ItemStore.getters.block_inven;
        },
        async fetchBackgroundInventory() {
            await ItemStore.dispatch('fetchBackInventory');
            this.backgrounds = ItemStore.getters.back_inven;
        },
        getUser() {
            this.user = AuthUser.getters.user;
        },
        async equipItem(item) {
            let payload = {
                equipped_id: this.equipped_block[0].id,
                equip_id: item.id,
            };
            await ItemStore.dispatch('equipItem', payload);
            if (item.type == 'block') {
                await this.fetchBlockEquipped();
                await this.fetchBlockInventory();
            } else {
                await this.fetchBackgroundEquipped();
                await this.fetchBackgroundInventory();
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.head {
    color: white;
    font-size: 60px;
    margin-left: 5%;
}
h1::after {
    display: inline-block;
    content: '';
    width: 60px;
    height: 60px;
    margin-left: 20px;
    background: url('../../assets/backpack.png');
    background-repeat: no-repeat;
    background-size: 100%;
}
.inventory-table {
    margin-left: 5%;
    width: 90%;
    border: 5px solid rgb(96, 165, 250);
    border-radius: 5px;
    background-color: rgb(107, 107, 107);
    background-size: cover;
}
.table-head {
    color: white;
    font-size: 36px;
    margin-left: 2%;
    margin-top: 2%;
}
.img {
    padding: 1rem;
    margin: 1rem;
    filter: drop-shadow(0 0 0.2em rgb(255, 255, 255));
}
.card {
    background-size: cover;
    border-radius: 8px;
    background: rgb(255, 255, 255);
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.9);
    text-align: center;
    margin: 1em;
    transition: 0.25s;
    cursor: pointer;
}
.card-image {
    grid-area: image;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
}
.card-text {
    display: flex;
    grid-area: text;
    align-items: center;
    justify-content: center;
}

.card-text h2 {
    font-size: 1em;
    color: black;
}
.card-text h3 {
    font-size: 0.8em;
    color: rgb(255, 255, 255);
    border-radius: 5px;
    border-color: rgb(0, 1, 87);
    background-color: rgb(0, 1, 87);
}
.card:hover {
    transform: scale(1.05);
    transition: 0.25s;
    box-shadow: 5px 5px rgba(0, 0, 0, 0.6);
}</style
>>
