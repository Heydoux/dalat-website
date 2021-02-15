<template>
  <div class="blogpost">
    <Navbar></Navbar>
    <main id="mainContent">
      <div class="row p-0">
        <div class="d-flex routes offset-md-1 col-md-11">
          <router-link to="/">Home</router-link>
          <p class="px-2">></p>
          <router-link to="/blog">Blog</router-link>
          <p class="px-2">></p>
          <p class="font-weight-bold">{{ this.article.title }}</p>
        </div>
        <div class="col-md-2 text-center position-relative">
          <p id="reading-time">
            Tiempo de lectura:<br />{{ this.article.readingTime }} Minutos
          </p>
          <p id="reading-time-bottom" class="opaque">
            Tiempo de lectura:<br />{{ this.article.readingTime }} Minutos
          </p>
        </div>
        <div class="offset-md-1 blog-content col-md-6">
          <div class="text-center my-5">
            <img :src="article.image" alt="" width="100%" />
          </div>
          <h1 class="text-left">{{ this.article.title }}</h1>
          <p class="text-left font-weight-bold">{{ this.article.excerpt }}</p>
          <div id="content" class="mb-5"></div>
        </div>
        <div class="col-md-3">
          <div class="mx-auto d-flex social-share">
            <div class="fb-share share-div">
              <a
                target="_blank"
                :href="'https://work.facebook.com/sharer.php?u=' + blogUrl"
                @click="shareOnSocial(false)"
              >
                <img
                  src="@/assets/images/blog/facebook.svg"
                  alt="Facebook share button"
                />
              </a>
            </div>
            <div class="twitter-share share-div">
              <a
                target="_blank"
                :href="'https://twitter.com/intent/tweet?url=' + blogUrl"
                @click="shareOnSocial(false)"
              >
                <img
                  src="@/assets/images/blog/twitter.svg"
                  alt="Twitter share button"
                />
              </a>
            </div>
            <div class="linkedin-share share-div">
              <a
                target="_blank"
                :href="
                  'http://www.linkedin.com/shareArticle?mini=true&url=' +
                    blogUrl
                "
                @click="shareOnSocial(false)"
              >
                <img
                  src="@/assets/images/blog/linkedin.svg"
                  alt="Linkedin share button"
                />
              </a>
            </div>
            <div class="copy-clipboard share-div">
              <button class="d-flex" @click="shareOnSocial(true)">
                <img src="@/assets/images/blog/link.svg" alt="Copy url link" />
                <p class="copy-popup d-none">Copiado!</p>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="row p-0">
        <div class="offset-md-1 col-md-10">
          <h3 class="font-weight-bold mb-4 ">Otros que te pueden interesar</h3>
          <CardsHorizontal type="shared" size="half"></CardsHorizontal>
        </div>
      </div>
    </main>
    <Footer></Footer>
  </div>
</template>

<script>
import CardsHorizontal from "@/components/CardsHorizontal";
import { db } from "../firebase";

// @ is an alias to /src
export default {
  name: "Blogpost",
  components: {
    CardsHorizontal
  },
  data() {
    return {
      article: {
        title: null,
        content: null,
        recomendado: false,
        tags: [],
        image: null,
        date: null,
        shared: 0,
        excerpt: null,
        readingTime: 0,
        urlTitle: null
      },
      content: null,
      blogUrl: "",
      counter: 0,
      activeItem: null
    };
  },
  methods: {
    shareOnSocial(toCopy) {
      if (toCopy) {
        var urlText = window.location.href;
        var dummy = document.createElement("input");
        document.body.appendChild(dummy);
        dummy.value = urlText;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
        $(".copy-popup").removeClass("d-none");
        setTimeout(this.suiteTraitement, 500);
      } else {
        this.article.shared++;
        db.collection("articles")
          .doc(this.activeItem)
          .update(this.article)
          .then(() => {
            console.log("Document successfully updated!");
          })
          .catch(error => {
            console.error("Error updating document: ", error);
          });
      }
    },
    suiteTraitement() {
      $(".copy-popup").addClass("d-none");
    }
  },
  created() {
    this.blogUrl = window.location.href;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    this.activeItem = urlParams.get("articleId");
    db.collection("articles")
      .doc(this.activeItem)
      .get()
      .then(querySnapshot => {
        this.article = querySnapshot.data();
        this.content = $(this.article.content);
        $("#content").append(this.content);
        $(".ql-align-center").css("textAlign", "center");
      })
      .catch(error => {
        console.error("Error getting document: ", error);
      });
  },
  mounted() {
    window.addEventListener("scroll", () => {
      if (!this.$isMobile()) {
        let rt_fixed = $("#reading-time");
        let rt_absolute = $("#reading-time-bottom");
        let rt_absolute_top = rt_absolute.offset().top;
        let rt_fixed_bottom = rt_fixed.offset().top + rt_fixed.height();
        if (rt_fixed_bottom > rt_absolute_top) {
          rt_absolute.removeClass("opaque");
          rt_fixed.addClass("opaque");
        } else {
          rt_absolute.addClass("opaque");
          rt_fixed.removeClass("opaque");
        }
      }
    });
  }
};
</script>

<style scoped lang="scss">
.routes {
  a {
    text-decoration: underline;
    color: $blue;
    font-weight: bold;
  }

  p {
    color: $blue;

    &.px-2 {
      transform: scale(1.3);
    }
  }
}

h3 {
  color: $blue;
}

#reading-time {
  position: fixed;
  left: 4.167vw;
  top: 50%;
  transform: translateY(-50%);
  text-align: LEFT;
  font-weight: bold;
  color: grey;
  letter-spacing: 0.06rem;
}

#reading-time-bottom {
  position: absolute;
  bottom: 0;
  margin-left: 4.167vw;
  top: unset;
  width: fit-content;
  text-align: LEFT;
  font-weight: bold;
  color: grey;
  letter-spacing: 0.06rem;
}

.opaque {
  opacity: 0;
}

.blog-content {
  font-size: 16px;
  letter-spacing: 0.04rem;

  img {
    height: auto;
    width: auto;
  }
}

p.ql-align-center {
  text-align: center;
}

.social-share {
  position: fixed;

  .copy-clipboard {
    .copy-popup {
      position: absolute;
      top: 45px;
    }

    button {
      color: #000000 !important;
      cursor: pointer;
      padding: 0.5rem !important;
      border: 1px solid #000000;
      width: fit-content;
      border-radius: 50%;
      text-align: center;
      margin: auto;
      background-color: #fff;

      img {
        width: 24px !important;
      }
    }
  }

  .share-div {
    text-transform: uppercase;
    text-align: center;
    margin-right: 0.5vw;

    a {
      padding: 0.875rem 0;
      color: #ffffff;

      img {
        width: 48px;
      }
    }
  }
}

@media only screen and (max-width: 768px) {
  .blogpost {
    main {
      width: 90%;
      margin: auto;

      .col-md-2 {
        display: none;
      }

      .social-share {
        position: relative;
        margin-bottom: 1rem;

        .share-div {
          margin: auto;
        }
      }
    }
  }
}
</style>
