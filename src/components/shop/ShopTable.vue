<template>
    <div class="shop-page">
        <div class="head grid-cols-2 grid">
            <h1>Shop</h1>
            <div class="mr-16 grid justify-items-end text-yellow-500">{{ user.point }} points</div>
        </div>
        <div class="shop-table mt-3">
            <div class="table-head">
                Block Theme >
                <div class="grid grid-cols-4">
                    <div v-for="(block, index) in blocks" :key="index">
                        <div class="card">
                            <div class="card-image">
                                <img src="" alt="default-block" class="img" />
                            </div>
                            <div class="card-text">
                                <h2>{{ block.name }}</h2>
                            </div>
                            <div class="card-text">
                                <h3>{{ block.point }} points</h3>
                            </div>
                            <div>
                                <button
                                    class="
                    px-4
                    py-2
                    text-white
                    rounded-lg
                    bg-red-500
                    mt-1
                    text-3xl
                  "
                                    @click="buy_item(block)"
                                >
                                    Buy
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                Background >
                <div class="grid grid-cols-4">
                    <div v-for="(background, index) in backgrounds" :key="index">
                        <div class="card">
                            <div class="card-image">
                                <img src="" alt="default-back" class="img" />
                            </div>
                            <div class="card-text">
                                <h2>{{ background.name }}</h2>
                            </div>
                            <div class="card-text">
                                <h3>{{ background.point }} points</h3>
                            </div>
                            <div>
                                <button
                                    class="
                    px-4
                    py-2
                    text-white
                    rounded-lg
                    bg-red-500
                    mt-1
                    text-3xl
                  "
                                    @click="buy_item(background)"
                                >
                                    Buy
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ItemStore from '../../store/itemStore';
import AuthUser from '../../store/authUser';
import PointHistory from '../../store/pointHistory';
export default {
    data() {
        return {
            blocks: [],
            backgrounds: [],
            user: {},
        };
    },
    async created() {
        this.getUser();
        await this.fetchBlockShop();
        await this.fetchBackgroundShop();
    },
    methods: {
        async fetchBlockShop() {
            await ItemStore.dispatch('fetchBlockShop');
            this.blocks = ItemStore.getters.block_shop;
        },
        async fetchBackgroundShop() {
            await ItemStore.dispatch('fetchBackShop');
            this.backgrounds = ItemStore.getters.back_shop;
        },
        getUser() {
            this.user = AuthUser.getters.user;
        },
        async buy_item(item) {
            this.$swal({
                title: 'Are you sure to buy?',
                icon: 'warning',
                showCancelButton: true,
                showConfirmButton: true,
                confirmButtonText: 'Yes, buy it!',
                cancelButtonText: 'No, cancel!',
                confirmButtonColor: 'green',
                cancelButtonColor: 'red',
            }).then(async result => {
                if (result.isConfirmed) {
                    if (this.user.point >= item.point) {
                        let payload = {
                            item_id: item.id,
                            point: item.point,
                            type: 'use',
                            user_id: this.user.id,
                        };
                        await AuthUser.dispatch('usePoint', payload);
                        await PointHistory.dispatch('addPoint', payload);
                        await ItemStore.dispatch('buyItem', payload);

                        await this.fetchBlockShop();
                        await this.fetchBackgroundShop();
                        this.getUserPoints();
                        this.$swal('Buy Success', `You got ${item.name}`, 'success');
                    } else {
                        this.$swal('Buy Failed', 'Not enough points', 'error');
                    }
                } else {
                    this.$swal({ title: 'Cancel', icon: 'error' });
                }
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.shop-page {
    width: 100%;
    height: 110vh;
    background-image: url('../../assets/background-default.jpg');
    background-position: center;
    background-attachment: fixed;
    background-repeat: no-repeat;
    background-size: cover;
}
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
    background: url('../../assets/cart.png');
    background-repeat: no-repeat;
    background-size: 100%;
}
.shop-table {
    margin-left: 5%;
    width: 90%;
    height: 85%;
    border: 2px solid rgb(107, 107, 107);
    border-radius: 5px;
    background-color: rgb(107, 107, 107);
    background-size: cover;
}
.table-head {
    color: white;
    font-size: 30px;
    margin-left: 2%;
    margin-top: 2%;
}
.img {
    width: 140px;
    height: 100px;
    margin: 0.5rem;
    filter: drop-shadow(0 0 0.2em rgb(255, 255, 255));
}
.card {
    width: 200px;
    height: 270px;
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
    margin-top: 2px;
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
    color: black;
}

.card:hover {
    transform: scale(1.05);
    transition: 0.25s;
    box-shadow: 5px 5px rgba(0, 0, 0, 0.6);
}
</style>
