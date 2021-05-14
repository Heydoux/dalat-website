<template>
  <div class="d-flex">
    <div v-for="(profesional, index) in profesionales" v-bind:key="index">
      <div class="row">
        <div class="text-center">
          <a
            :href="profesional.data().link"
            class=""
            target="_blank"
            :aria-labelledby="
              'profesional-' +
                profesional.data().nombre +
                profesional.data().appellido +
                '--new-window'
            "
            :aria-describedby="
              'profesional-titulo' + profesional.data().titulo + '--new-window'
            "
          >
            <div class="col">
              <img
                :src="profesional.data().photoUrl"
                class="pro img-thumbnail"
                alt=""
              />
              <h3
                :id="
                  'profesional-' +
                    profesional.data().nombre +
                    profesional.data().appellido +
                    '--new-window'
                "
              >
                {{ profesional.data().nombre }}
                {{ profesional.data().appellido }}
              </h3>
              <p
                :id="
                  'profesional-titulo' +
                    profesional.data().titulo +
                    '--new-window'
                "
              >
                {{ profesional.data().titulo }}
              </p>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../firebase";
export default {
  name: "CardProfessional",
  props: {},
  data() {
    return {
      profesionales: []
    };
  },
  created() {
    db.collection("profesionales")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.profesionales.push(doc);
        });
      });
  }
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

@media only screen and (max-width: 768px) {
  .pro {
    border-radius: 50%;
    width: 7.813vw;
    height: 7.813vw;
  }
}
</style>
