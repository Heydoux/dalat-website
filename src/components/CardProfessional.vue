<template>
  <div class="container">
    <div class="row">
      <div class="text-center">
        <div class="col">
          <img
            src="@/assets/images/cardvertical.png"
            class="pro img-thumbnail"
            alt=""
          />
          <h3>Nombre Profesional</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardProfessional",
  props: {}
};
</script>

<style scoped lang="scss">
.profile-header {
  height: 150px;
}
.user-detail {
  margin: -50px 0px 30px 0px;
}

.pro {
  border-radius: 50%;
  width: 7.813vw;
  height: 7.813vw;
}
</style>
