<template>
  <div class="d-flex flex-wrap">
    <div
      v-for="(profesional, index) in profesionales"
      v-bind:key="index"
      class="text-center mr-2 cardpro"
    >
      <a
        :href="profesional.data().link"
        class=""
        target="_blank"
        :aria-labelledby="
          'profesional-' +
            profesional.data().nombre.replace(/\s/g, '') +
            profesional.data().appellido.replace(/\s/g, '') +
            '--new-window'
        "
        :aria-describedby="
          'profesional-' +
            profesional.data().titulo.replace(/\s/g, '') +
            '--new-window'
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
                profesional.data().nombre.replace(/\s/g, '') +
                profesional.data().appellido.replace(/\s/g, '') +
                '--new-window'
            "
          >
            {{ profesional.data().nombre }}
            {{ profesional.data().appellido }}
          </h3>
          <p
            :id="
              'profesional-' +
                profesional.data().titulo.replace(/\s/g, '') +
                '--new-window'
            "
            class="job"
          >
            {{ profesional.data().titulo }}
            <img
              src="@/assets/images/sobredalat/linkedin-icon-blue.png"
              alt="Perfil Linkedin"
              class="img-fluid ml-1"
            />
            <img
              src="@/assets/images/sobredalat/iconmonstr-share-8-16.png"
              alt="Perfil Linekdin"
              aria-hidden="true"
              class="img-fluid ml-1"
            />
          </p>
        </div>
      </a>
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
      .orderBy("date", "asc")
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
a {
  display: inline-block;
}

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

.job {
  img {
    width: 16px;
    height: auto;
  }
}

@media only screen and (max-width: 768px) {
  .pro {
    width: 12.5vw;
    height: 12.5vw;
  }
}

@media only screen and (max-width: 767px) {
  .cardpro {
    max-width: 50%;
    margin-right: 0 !important;

    .pro {
      width: 100%;
      height: auto;
    }
  }
}
</style>
