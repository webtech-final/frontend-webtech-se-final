<template>
    <div id="game" class="flex justify-center">
        <game ref="game"></game>
    </div>
</template>

<script>
import Game from '../components/game/Game.vue';
export default {
    name: 'Singleplayer',
    components: {
        Game,
    },
    mounted() {
        this.$refs.game.initializeGame();
    },
};
</script>

<style scoped></style>
