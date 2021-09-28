<template>
    <div id="navbar">
        <div class="border-b-2 border-black flex justify-evenly">
            <router-link class="flex" to="/">
                <div class="p-2 items-center">
                    <label id="logo-p1">TETRIS</label>
                    <label id="logo-p2">.vs</label>
                </div>
            </router-link>

            <div id="menu" class="flex">
                <router-link class="flex" to="/">
                    <button
                        id="menu"
                        class="bg-transparent hover:bg-blue-700 text-white font-bold px-10"
                    >
                        PLAY
                    </button>
                </router-link>
                <router-link class="flex" to="/leaderboard">
                    <button
                        id="menu"
                        class="bg-transparent hover:bg-blue-700 text-white font-bold px-10"
                    >
                        LEADERBOARD
                    </button>
                </router-link>
                <router-link class="flex" to="/profile">
                    <button
                        id="menu"
                        class="bg-transparent hover:bg-blue-700 text-white font-bold px-10"
                    >
                        PROFILE
                    </button>
                </router-link>
                <router-link class="flex" to="/inventory">
                    <button
                        id="menu"
                        class="bg-transparent hover:bg-blue-700 text-white font-bold px-10"
                    >
                        INVENTORY
                    </button>
                </router-link>
                <router-link class="flex" to="/shop">
                    <button
                        id="menu"
                        class="bg-transparent hover:bg-blue-700 text-white font-bold px-10"
                    >
                        SHOP
                    </button>
                </router-link>
            </div>
            <div class="flex">
                <router-link class="flex" to="/login">
                    <button
                        id="round"
                        class="bg-white hover:bg-gray-600 text-black content-center my-4 mx-3 px-3"
                    >
                        Login
                    </button>
                </router-link>
                <router-link class="flex" to="/regist">
                    <button
                        id="round"
                        class="bg-white hover:bg-gray-600 text-black content-center my-4 mx-3 px-3"
                    >
                        Sign Up
                    </button>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=PT+Serif:wght@700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap');

#navbar {
    color: white;
    background-color: #1c1c1c;
}

#logo-p1 {
    font-family: 'PT Serif', serif;
    font-size: 36px;
}

#logo-p2 {
    font-family: 'Roboto', sans-serif;
    font-size: 26px;
    font-weight: 500;
    letter-spacing: -2px;
}

#round {
    border-radius: 8px;
    font-family: 'Roboto', sans-serif;
    font-size: 20px;
    font-weight: 400;
}

#menu {
    font-family: 'Roboto', sans-serif;
    font-size: 20px;
    font-weight: 400;
}
</style>
