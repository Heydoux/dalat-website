<template>
  <div>
    <div class="row">
      <article
        v-for="(article, index) in articles"
        v-bind:key="index"
        class="mb-3 col-md-4 align-items-stretch"
        v-on:mousedown="mouseDown"
        v-on:mouseup="mouseUp($event)"
      >
        <!--<a class="d-inline-block" href="/blog">-->
        <!--
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
        <router-link
          class="d-inline-block"
          :to="'/blog/' + article.data().urlTitle"
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
                <h4>{{ article.data().title }}</h4>
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
        -->
        <!--</a>-->
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
              <h4>
                <router-link
                  class="d-inline-block"
                  :to="'/blog/' + article.data().urlTitle"
                  :aria-labelledby="'blog-' + type + 'title-' + index"
                  :aria-describedby="
                    'blog-' +
                      type +
                      'desc-' +
                      index +
                      ' blog-' +
                      type +
                      'time-' +
                      index
                  "
                >
                  {{ article.data().title }}
                </router-link>
              </h4>
            </div>
            <p class="bajada card-text" :id="'blog-' + type + 'desc-' + index">
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
      </article>
    </div>
    <div
      v-if="this.load === 'more' && this.cpt[0].cpt > this.limit"
      class="d-flex justify-content-center"
      id="showmore-btn"
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
      lastVisible: null,
      cpt: [],
      clickTimer: 0
    };
  },
  firestore() {
    return {
      cpt: db.collection("articlesCpt")
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
            if (this.articles.length === this.cpt[0].cpt) {
              $("#showmore-btn").removeClass("d-flex");
              $("#showmore-btn").addClass("d-none");
            }
          });
        });
    },
    mouseDown() {
      this.clickTimer = +new Date();
    },
    mouseUp(event) {
      let elem = event.target;
      let article = elem.closest("article");
      let up,
        link = article.querySelector("h4 a");
      up = +new Date();
      if (up - this.clickTimer < 200) {
        link.click();
      }
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
article {
  .vertical-body {
    cursor: pointer;

    &:hover {
      box-shadow: 0 0 0 2px #fff, 0 0 0 4px $blue;
      outline: 0;
    }

    &:focus-within {
      box-shadow: 0 0 0 2px #fff, 0 0 0 4px $blue;
      outline: 0;

      a {
        text-decoration: none;
        box-shadow: none;

        &:focus {
          text-decoration: none;
        }
      }
    }

    a:focus {
      text-decoration: underline;
    }
  }
}
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

.categoria {
  color: $purple;
  font-size: 14px;
  font-weight: 900;
}

h4 {
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
  background-color: #0a3055;
  border-radius: 12px 2px;
  border: none;
}

.btn-mas:hover {
  color: #fff;
  background-color: #713e94;
  border-color: #713e94;
}

.btn-mas:active {
  color: #fff;
  background-color: #713e94;
  border-color: #713e94;
}

.btn-mas:focus {
  color: #fff;
  background-color: #713e94;
  border-color: #713e94;
  box-shadow: none;
}
</style>
