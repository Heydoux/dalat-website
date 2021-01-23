<template>
  <a href="" class="d-inline-block w-100">
    <div class="card-aspect card">
      <div class="imgs-block">
        <img
          src="@/assets/images/cardHorizontal.png"
          class="imagen imagen1"
          alt=""
        />
        <img
          src="@/assets/images/cardHorizontal.png"
          class="imagen imagen2"
          alt=""
        />
      </div>
      <div class="text-block">
        <h3>TITULO ARTICULO</h3>
        <p class="lectura card-text">Tiempo de lectura: 10'</p>
      </div>
    </div>
  </a>
</template>

<script>
export default {
  name: "Recomendaciones",
  props: {}
};
</script>

<style scoped lang="scss">
/*
.imagen1 {
  margin: 1.172vw 0vw 0vw 1.016vw;
  border: 2px solid $orange;
}

.imagen2 {
  margin-left: -0.781vw;
  border: 2px solid $blue;
}
*/
.imgs-block {
  display: flex;
  width: 33.33%;

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  img:nth-child(1) {
    border: 2px solid $orange;
  }

  img:nth-child(2) {
    border: 2px solid $blue;
    margin-left: -10px;
  }
}

.text-block {
  width: 66.66%;
}

h3 {
  margin-top: 1.016vh;
  color: $black;
  font-size: 18px;
  font-weight: 600;
}

.card-aspect {
  border: none;
  display: flex;
  flex-direction: row;
  background-color: $grey;
  padding: 15px;
  border: 2px solid #d6d6d6;
  border-radius: 12px 2px;

  .lectura {
    color: $dark-grey;
    font-size: 14px;
    font-weight: 600;
    text-align: start;
  }
}
</style>
