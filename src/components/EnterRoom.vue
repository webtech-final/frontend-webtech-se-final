<template>
    <div class="bg-gray-400 grid-cols-1 p-10">
        <div class="text-center text-3xl m-2 mx-auto place-self-center">
            <a class="text-center w-full">PLEASE ENTER ROOM PIN BELOW</a>
        </div>
        <div class="my-7 relative w-1/3  mx-auto">
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
            <div class="text-center mt-6 -mb-3">
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
</template>

<script>
export default {
    name: 'EnterRoom',
    props: {
        msg: String,
    },
}
</script>

<style></style>
