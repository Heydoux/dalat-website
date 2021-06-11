<template>
  <div v-if="this.size === 'half'" class="row" :key="componentKey">
    <article
      v-for="(article, index) in articles"
      v-bind:key="index"
      class="col-md-6"
    >
      <a
        href="javascript:void(0)"
        class="d-inline-block w-100 mb-3"
        @click="forceRerender(`/blog/${article.data().urlTitle}`, article.id)"
        :aria-labelledby="'blog-' + type + 'title-' + index"
        :aria-describedby="
          'blog-' + type + 'desc-' + index + ' blog-' + type + 'time-' + index
        "
      >
        <div class="card body-card">
          <div class="row ">
            <div class="col-card-4">
              <div class="image-wrapper-horiz">
                <img
                  :src="article.data().image"
                  :alt="article.data().altthumbnail"
                  class="card-img-top"
                />
              </div>
            </div>
            <div class="col-card-8">
              <div class="card-body">
                <div class="categoria card-title h5 text-uppercase">
                  {{ article.data().tags[0] }}
                </div>
                <div class="card-subtitle d-flex align-items-center">
                  <h3
                    class="card-title"
                    :id="'blog-' + type + 'title-' + index"
                  >
                    {{ article.data().title }}
                  </h3>
                </div>
                <p
                  class="card-text bajada"
                  :id="'blog-' + type + 'desc-' + index"
                >
                  {{ article.data().excerpt }}
                </p>
                <p class="card-text tiempo">
                  <span class="lectura" aria-hidden="true">
                    Tiempo de lectura: {{ article.data().readingTime }}’
                  </span>
                  <span class="sr-only" :id="'blog-' + type + 'time-' + index">
                    Tiempo de lectura: {{ article.data().readingTime }} minutos
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </a>
    </article>
  </div>
  <div v-else class="row">
    <article
      v-for="(article, index) in articles"
      v-bind:key="index"
      class="col-md-12"
    >
      <a
        href="javascript:void(0)"
        class="d-inline-block w-100 mb-3"
        @click="forceRerender(`/blog/${article.data().urlTitle}`, article.id)"
        :aria-labelledby="'blog-' + type + 'title-' + index"
        :aria-describedby="
          'blog-' + type + 'desc-' + index + ' blog-' + type + 'time-' + index
        "
      >
        <div class="card body-card">
          <div class="row ">
            <div class="col-card-4">
              <div class="image-wrapper-horiz">
                <img
                  :src="article.data().image"
                  :alt="article.data().altthumbnail"
                  class="card-img-top"
                />
              </div>
            </div>
            <div class="col-card-8">
              <div class="card-body">
                <div class="categoria card-title h5 text-uppercase">
                  {{ article.data().tags[0] }}
                </div>
                <div class="card-subtitle d-flex align-items-center">
                  <h3
                    class="card-title"
                    :id="'blog-' + type + 'title-' + index"
                  >
                    {{ article.data().title }}
                  </h3>
                </div>
                <p
                  class="card-text bajada"
                  :id="'blog-' + type + 'desc-' + index"
                >
                  {{ article.data().excerpt }}
                </p>
                <p class="card-text tiempo">
                  <span class="lectura" aria-hidden="true">
                    Tiempo de lectura: {{ article.data().readingTime }}’
                  </span>
                  <span class="sr-only" :id="'blog-' + type + 'time-' + index">
                    Tiempo de lectura: {{ article.data().readingTime }} minutos
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </a>
    </article>
  </div>
</template>

<script>
import { db } from "../firebase";

export default {
  name: "CardsHorizontal",
  props: ["type", "size"],
  data() {
    return {
      articles: [],
      componentKey: 0
    };
  },
  methods: {
    forceRerender(url, articleId) {
      console.log(url);
      //this.$router.go(url);
      window.location.href = url + "?articleId=" + articleId;
    }
  },
  created() {
    var articlesRef = db.collection("articles");
    articlesRef
      .orderBy(this.type, "desc")
      .limit(2)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.articles.push(doc);
        });
      });
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

  img {
    height: 100%;
    width: auto;
  }
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
a:hover {
  text-decoration: none;
  h3 {
    text-decoration: underline;
  }
}
.col-card-4 {
  flex: 0 0 40%;
  max-width: 40%;
  padding-right: 15px;
  padding-left: 15px;
}

.col-card-8 {
  flex: 0 0 60%;
  max-width: 60%;
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
  margin: 0 !important;
}

.bajada {
  color: $dark-grey;
  font-size: 14px;
  font-weight: 400;
  min-height: 105px; // 5 * line-height
  margin-top: 12px;
}

.tiempo {
  color: $dark-grey;
  font-weight: 600;
  text-align: end;
  margin: 0 auto;
}

@media only screen and (max-width: 768px) {
  .bajada {
    display: none;
  }

  .card-body {
    padding: 0.75rem 0.75rem 1.25rem;
  }

  p.tiempo {
    margin-top: 0.5rem;
  }
}
</style>
