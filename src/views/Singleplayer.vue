<template>
    <div>
        <div id="game" class="flex justify-center mt-10">
            <game ref="game"></game>
        </div>
        <div class="flex justify-center">
            <img class="mt-10 mb-10 border-4 rounded-lg " src="../assets/Keyboard.png" />
        </div>
    </div>
</template>

<script>
import Game from '../components/game/GameSingle.vue';
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
