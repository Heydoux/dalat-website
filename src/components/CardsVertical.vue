<template>
  <div>
    <div class="row">
      <div
        v-for="(article, index) in articles"
        v-bind:key="index"
        class="mb-3 col-md-4 align-items-stretch text-center"
      >
        <!--<a class="d-inline-block" href="/blog">-->
        <router-link
          class="d-inline-block"
          :to="{
            path: `/blog/${article.data().urlTitle}`,
            query: { articleId: article.id }
          }"
          :aria-labelledby="'blog-' + type + 'title-' + index"
          :aria-describedby="
            'blog-' + type + 'desc-' + index + ' blog-' + type + 'time-' + index
          "
        >
          <div class="vertical-body card">
            <div class="image-wrapper-vert">
              <img
                :src="article.data().image"
                :alt="article.data().altthumbnail"
                class="card-img-top img-fluid"
              />
            </div>
            <div class="card-body">
              <div class="categoria card-title h5 text-uppercase">
                {{ article.data().tags[0] }}
              </div>
              <div
                class="card-subtitle h6 d-flex align-items-center"
                :id="'blog-' + type + 'title-' + index"
              >
                <h3>{{ article.data().title }}</h3>
              </div>
              <p
                class="bajada card-text"
                :id="'blog-' + type + 'desc-' + index"
              >
                {{ article.data().excerpt }}
              </p>
              <p class="tiempo card-text" aria-hidden="true">
                Tiempo de lectura: {{ article.data().readingTime }}'
              </p>
              <p class="sr-only" :id="'blog-' + type + 'time-' + index">
                Tiempo de lectura: {{ article.data().readingTime }} minutos
              </p>
            </div>
          </div>
        </router-link>
        <!--</a>-->
      </div>
    </div>
    <div
      v-if="this.load === 'more' && articles.length > this.limit"
      class="d-flex justify-content-center"
    >
      <button type="button" class="btn btn-mas" @click="showmore">
        Mostrar más notas
      </button>
    </div>
  </div>
</template>

<script>
import { db } from "../firebase";

export default {
  name: "CardsVertical",
  props: ["type", "limit", "load"],
  data() {
    return {
      articles: [],
      lastVisible: null
    };
  },
  methods: {
    showmore() {
      console.log("last: ", this.lastVisible);
      db.collection("articles")
        .orderBy(this.type, "desc")
        .startAfter(this.lastVisible)
        .limit(this.limit)
        .get()
        .then(querySnapshot => {
          this.lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
          querySnapshot.forEach(doc => {
            this.articles.push(doc);
          });
        });
    }
  },
  created() {
    var articlesRef = db.collection("articles");
    articlesRef
      .orderBy(this.type, "desc")
      .limit(this.limit)
      .get()
      .then(querySnapshot => {
        this.lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
        querySnapshot.forEach(doc => {
          this.articles.push(doc);
        });
      });
  }
};
</script>

<style scoped lang="scss">
.image-wrapper-vert {
  width: 100%;
  height: 200px;
  position: relative;
  overflow: hidden;

  img {
    width: 100%;
    height: auto;
  }
}

a:hover {
  text-decoration: none;
  h3 {
    text-decoration: underline;
  }
}

.categoria {
  color: $purple;
  font-size: 14px;
  font-weight: 900;
}

h3 {
  color: $black;
  font-size: 18px;
  font-weight: 400;
  margin: 0;
}

.bajada {
  margin-top: 0.5rem;
  color: $dark-grey;
  font-size: 14px;
  font-weight: 400;
  min-height: 84px; // 4 * line-height
}

.tiempo {
  color: $dark-grey;
  font-weight: 600;
  text-align: end;
  margin: 0 auto;
}

.vertical-body {
  background-color: $grey;
  border: none;
}

.btn-mas {
  color: rgb(255, 255, 255);
  background-color: rgb(113, 62, 148);
  border-radius: 12px 2px;
  border: none;
}
</style>
