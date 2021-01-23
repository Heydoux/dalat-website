<template>
  <!-- TODO Ajouter à cardHorizontal, cardVertical et Recomendaciones les aria-label avec matching sur les id pour titre, description et temps de lecture incrémente avec type de card nécessaire à passer en paramètre -->
  <div v-if="this.size === 'half'" class="row">
    <div
      v-for="(article, index) in articles"
      v-bind:key="index"
      class="col-md-6"
    >
      <!--<a class="d-inline-block w-100" href="/blog">-->
      <router-link
        class="d-inline-block w-100"
        :to="{
          path: `/blog/${article.data().urlTitle}`,
          query: { articleId: article.id }
        }"
      >
        <div class="card mb-3 body-card">
          <div class="row ">
            <div class="col-card-4">
              <div class="image-wrapper-horiz">
                <img
                  :src="article.data().image"
                  alt=""
                  class="card-img-top h-auto w-100 img-fluid"
                />
              </div>
            </div>
            <div class="col-card-8">
              <div class="card-body">
                <div class="categoria card-title h5">
                  {{ article.data().tags[0] }}
                </div>
                <h3 class="card-title">{{ article.data().title }}</h3>
                <p class="card-text bajada">
                  {{ article.data().excerpt }}
                </p>
                <p class="card-text tiempo">
                  <span class="lectura">
                    Tiempo de lectura: {{ article.data().readingTime }}’
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <!--</a>-->
      </router-link>
    </div>
  </div>
  <div v-else class="row">
    <div
      v-for="(article, index) in articles"
      v-bind:key="index"
      class="col-md-12"
    >
      <!--<a class="d-inline-block w-100" href="/blog">-->
      <router-link
        class="d-inline-block w-100"
        :to="{
          path: `/blog/${article.data().urlTitle}`,
          query: { articleId: article.id }
        }"
      >
        <div class="card mb-3 body-card">
          <div class="row ">
            <div class="col-card-4">
              <div class="image-wrapper-horiz">
                <img
                  :src="article.data().image"
                  alt=""
                  class="card-img-top h-auto w-100 img-fluid"
                />
              </div>
            </div>
            <div class="col-card-8">
              <div class="card-body">
                <div class="categoria card-title h5">
                  {{ article.data().tags[0] }}
                </div>
                <h3 class="card-title">{{ article.data().title }}</h3>
                <p class="card-text bajada">
                  {{ article.data().excerpt }}
                </p>
                <p class="card-text tiempo">
                  <span class="lectura">
                    Tiempo de lectura: {{ article.data().readingTime }}’
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </router-link>
      <!--</a>-->
    </div>
  </div>
</template>

<script>
import { db } from "../firebase";

export default {
  name: "CardsHorizontal",
  props: ["type", "size"],
  data() {
    return {
      articles: []
    };
  },
  created() {
    var articlesRef = db.collection("articles");
    if (this.type === "recent") {
      articlesRef
        .orderBy("date", "desc")
        .limit(2)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.articles.push(doc);
          });
        });
    } else {
      articlesRef
        .orderBy("shared", "desc")
        .limit(2)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.articles.push(doc);
          });
        });
    }
  }
};
</script>

<style scoped lang="scss">
.body-card {
  background-color: $grey;
  border: none;
}

.image-wrapper-horiz {
  height: 100%;
  position: relative;
  overflow: hidden;
}

.imagen-horizontal {
  height: 100%;
  width: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.lectura {
  color: #4e4545;
  font-size: 14px;
  font-weight: 600;
  text-align: end;
  margin: 0 auto;
}

.col-card-4 {
  flex: 0 0 33.33333%;
  max-width: 33.33333%;
  padding-right: 15px;
  padding-left: 15px;
}

.col-card-8 {
  flex: 0 0 66.66666%;
  max-width: 66.66666%;
  padding-right: 15px;
  padding-left: 15px;
}

/* Comun with cardsvertical */
.categoria {
  color: $purple;
  font-size: 14px;
  font-weight: 900;
}

h3 {
  color: $black;
  font-size: 18px;
  font-weight: 400;
}

.bajada {
  color: $dark-grey;
  font-size: 14px;
  font-weight: 400;
}

.tiempo {
  color: $dark-grey;
  font-weight: 600;
  text-align: end;
  margin: 0 auto;
}
</style>
