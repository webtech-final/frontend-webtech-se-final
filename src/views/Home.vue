<template>
    <div class="home mt-72">
        <div class="text-6xl w-1/2 mx-auto flex justify-center items-end">
            <a>TERTIS</a>
            <a class="text-5xl">.VS</a>
        </div>
        <div class="my-4 relative w-1/4 mx-auto">
            <input
                class="
                    input
                    border border-gray-400
                    appearance-none
                    rounded
                    w-full
                    px-3
                    py-3
                    pt-5
                    pb-2
                    focus focus:border-indigo-600 focus:outline-none
                    active:outline-none active:border-indigo-600
                "
                id="email"
                type="text"
                autofocus
            />
            <label
                for="email"
                class="
                    label
                    absolute
                    mb-0
                    -mt-2
                    pt-4
                    pl-3
                    leading-tighter
                    text-gray-400 text-base
                    mt-2
                    cursor-text
                "
                >Email Address</label
            >
            <div class="my-5 flex justify-center">
                <div class="space-x-10">
                    <label for="1P">1 PLAYER</label>
                    <button
                        class="
                            py-3
                            px-6
                            text-white
                            rounded-lg
                            bg-green-400
                            shadow-lg
                            block
                            md:inline-block
                        "
                    >
                        PLAY
                    </button>
                </div>
            </div>
            <div class="my-5 flex justify-center">
                <div class="space-x-10">
                    <label for="2P">2 PLAYER</label>
                    <button
                        class="
                            py-3
                            px-6
                            text-white
                            rounded-lg
                            bg-blue-400
                            shadow-lg
                            block
                            md:inline-block
                        "
                    >
                        JOIN
                    </button>
                    <button
                        class="
                            py-3
                            px-6
                            text-white
                            rounded-lg
                            bg-red-400
                            shadow-lg
                            block
                            md:inline-block
                        "
                    >
                        CREATE
                    </button>
                </div>
            </div>
        </div>
        <div class="w-1/2 mx-auto">
            <EnterRoom />
        </div>
    </div>
</template>

<script>
import EnterRoom from '../components/home/EnterRoom.vue'
export default {
    name: 'Home',
    components: {
        EnterRoom,
    },
}
</script>

<style scoped></style>
