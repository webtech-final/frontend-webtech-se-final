<template>
    <div id="game" class="flex justify-center">
        <div class="mt-8 flex">
            <game class="mr-8"></game>
            <game></game>
        </div>
    </div>
</template>

<script>
import Game from '../components/game/Game.vue';
export default {
    name: 'Multiplayer',
    components: {
        Game,
    },
};
</script>

<style scoped></style>
