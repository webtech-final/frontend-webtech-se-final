<template>
  <div class="inventory-page">
    <div class="head">Your Inventory</div>
    <div class="inventory-table">
      <div class="table-head">
        <div>
          Block Theme >
          <div v-for="(block, index) in blocks" :key="index">
          <div class="card">
            
            <div v-if="block.id=1" class="card-image">
              <img
                src="../../assets/theme-default.png"
                alt="default-block"
                class="img"
              />
            </div>
            <div class="card-text">
              <h2>{{block.name}}</h2>
            </div>
            <div class="card-text">
              <h3>Equipped</h3>
            </div>
          </div>
          </div>
        
        </div>

        <div>
          Background >
          <div v-for="(background, index) in backgrounds" :key="index">
          <div class="card">
            <div v-if="background.id=2" class="card-image">
              <img
                src="../../assets/background-default.jpg"
                alt="default-back"
                class="img"
              />
            </div>
            <div class="card-text">
              <h2>{{background.name}}</h2>
            </div>
            <div class="card-text">
              <h3>Equipped</h3>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ItemStore from "../../store/itemStore";


export default {
  data() {
    return{
      blocks: [],
      backgrounds: [],
      
    };
  },
  async created() {
    this.fetchBlockInventory();
    this.fetchBackgroundInventory();

  },
  methods: {
    async fetchBlockInventory(){
      await ItemStore.dispatch("fetchBlockInventory");
      this.blocks = ItemStore.getters.block_inven
    },
    async fetchBackgroundInventory(){
      await ItemStore.dispatch("fetchBackgroundInventory");
      this.backgrounds = ItemStore.getters.back_inven
    },
  }
};
</script>

<style lang="scss" scoped>
.inventory-page {
  width: 100%;
  height: 100vh;
  background-image: url("../../assets/background-default.jpg");
  background-position: center;
}
.head {
  color: white;
  font-size: 60px;
  margin-left: 5%;
}
.inventory-table {
  margin-left: 5%;
  width: 90%;
  height: 85%;
  border: 2px solid rgb(107, 107, 107);
  border-radius: 5px;
  background-color: rgb(107, 107, 107);
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
  height: 250px;
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
  margin-top: 12px;
}

.card-text h2 {
  font-size: 1em;
  color: black;
}
.card-text h3 {
  font-size: 1em;
  color: rgb(255, 255, 255);
  border-radius: 5px;
  border-color: rgb(0, 1, 87);
  background-color: rgb(0, 1, 87);
}
.card:hover {
  transform: scale(1.05);
  transition: 0.25s;
  box-shadow: 5px 5px rgba(0, 0, 0, 0.6);
}
</style>>