<template>
    <div id="game" class='flex justify-center'>
      <game></game> 
    </div>
</template>

<script>
import Game from '../components/game/Game.vue'
export default {
    name: 'Singleplayer',
    components: {
        Game,
    }
}
</script>

<style scoped>

</style>
