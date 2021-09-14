<template>
  <div class="shop-page">
    <div class="head">Shop</div>
    <div class="shop-table">
      <div class="table-head">
        <div>
          Theme >

          <div class="card">
            <div class="card-image">
              <img
                src="../../assets/theme-default.png"
                alt="default-theme"
                class="img"
              />
            </div>
            <div class="card-text">
              <h2>Default</h2>
            </div>
            <div class="card-text">
              <h3>Buy</h3>
            </div>
          </div>
        </div>

        <div>
          Background >
          <div class="card">
            <div class="card-image">
              <img
                src="../../assets/background-default.jpg"
                alt="default-back"
                class="img"
              />
            </div>
            <div class="card-text">
              <h2>Default</h2>
            </div>
            <div class="card-text">
              <h3>Buy</h3>
            </div>
          </div>
        </div>
        <div>
          BGM >
          <div class="card">
            <div class="card-image">
              <img
                src="../../assets/music-default.png"
                alt="default-music"
                class="img"
              />
            </div>
            <div class="card-text">
              <h2>Default</h2>
            </div>
            <div class="card-text">
              <h3>Buy</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Shop",
  components: {},
};
</script>

<style lang="scss" scoped>
.shop-page {
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
.shop-table {
  margin-left: 5%;
  width: 90%;
  height: 85%;
  border: 2px solid rgb(107, 107, 107);
  border-radius: 5px;
  background-color: rgb(107, 107, 107);
}
.table-head {
  color: white;
  font-size: 25px;
  margin-left: 2%;
  margin-top: 2%;
}
.img {
  width: 100px;
  height: 65px;
  margin: 0.5rem;
  filter: drop-shadow(0 0 0.2em rgb(255, 255, 255));
}
.card {
  width: 120px;
  height: 150px;
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
  font-size: 0.8em;
  color: black;
}
.card-text h3 {
  font-size: 0.8em;
  color: rgb(255, 255, 255);
  border-radius: 5px;
  border-color: rgb(0, 107, 5);
  background-color: rgb(0, 107, 5);
}
.card:hover {
  transform: scale(1.05);
  transition: 0.25s;
  box-shadow: 5px 5px rgba(0, 0, 0, 0.6);
}
</style>