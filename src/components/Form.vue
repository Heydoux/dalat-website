<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-6">
        <h2>Redes sociales</h2>
        <ul class="d-inline-block list-unstyled lista" role="list">
          <li class="d-inline-block ">
            <a
              href="https://dalat-a11y.slack.com/"
              target="_blank"
              rel="noreferrer"
              class="anchor"
              aria-label="Slack"
            >
              <img
                src="@/assets/images/form/slack-icon.png"
                alt=""
                class="icon"
                aria-hidden="true"
              />
            </a>
          </li>
          <li class="d-inline-block">
            <a
              href="https://www.instagram.com/dalatcomunidad/"
              target="_blank"
              rel="noreferrer"
              class="anchor"
              aria-label="Instagram"
            >
              <img
                src="@/assets/images/form/Instagram-icon.png"
                alt=""
                class="icon"
                aria-hidden="true"
              />
            </a>
          </li>
          <li class="d-inline-block">
            <a
              href="https://www.linkedin.com/company/dalatcomunidad/"
              target="_blank"
              rel="noreferrer"
              class="anchor"
              aria-label="Linkedin"
            >
              <img
                src="@/assets/images/form/linkedin-icon.png"
                alt=""
                class="icon"
                aria-hidden="true"
              />
            </a>
          </li>
          <li class="d-inline-block">
            <a
              href="https://www.facebook.com/dalatcomunidad"
              target="_blank"
              rel="noreferrer"
              class="anchor"
              aria-label="Facebook"
            >
              <img
                src="@/assets/images/form/facebook-icon.png"
                alt=""
                class="icon"
                aria-hidden="true"
              />
            </a>
          </li>
        </ul>
        <h2>Únete a Slack</h2>
        <p class="unite">
          Puedes ser parte de la comunidad solicitando unirte a Slack.
        </p>
        <h2>¿Quieres escribirnos por mail?</h2>
        <a href="mailto:contacto@dalatcomunidad.org" class="mail">
          contacto@dalatcomunidad.org
        </a>
      </div>
      <div class="col-lg-6">
        <form
          id="contact-form"
          role="form"
          aria-label="Formulario de Contacto"
          @submit.prevent="submitForm"
        >
          <p class="font-weight-bold">Todos los campos son obligatorios.</p>
          <div class="error-form" v-if="msg.name || msg.email || msg.msg">
            <p>{{ msg.error }}</p>
            <ul>
              <li v-if="msg.name">{{ msg.name }}</li>
              <li v-if="msg.email">{{ msg.email }}</li>
              <li v-if="msg.msg">{{ msg.msg }}</li>
            </ul>
          </div>
          <!-- action="https://formspree.io/f/mqkwlreq" -->
          <div class="form-group" data-children-count="1">
            <label class="form-label" for="name">Nombre y Apellido</label>
            <input
              required
              placeholder="Ejemplo: Juan Dominguez"
              id="name"
              type="text"
              inputmode="text"
              name="name"
              class="form-control"
              v-model="name"
            />
          </div>
          <div class="form-group" data-children-count="1">
            <label class="form-label" for="email">Email</label>
            <input
              required
              placeholder="Ejemplo: juandominguez@gmail.com"
              id="email"
              type="email"
              inputmode="email"
              name="email"
              v-model="email"
              class="form-control"
              data-kwimpalastatus="alive"
              data-kwimpalaid="1610903784165-1"
            />
          </div>
          <div class="form-group" data-children-count="1">
            <label class="form-label" for="message">Mensaje</label>
            <textarea
              required
              rows="5"
              placeholder="Escribe tu mensaje"
              name="message"
              id="message"
              v-model="message"
              class="form-control"
            >
            </textarea>
          </div>
          <button class="boton btn btn-primary" type="submit">
            Enviar
          </button>
          <p id="my-form-status" class="font-weight-bold"></p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Form",
  props: {},
  data() {
    return {
      email: "",
      name: "",
      message: "",
      endpoint: "https://formspree.io/f/mqkwlreq",
      msg: []
    };
  },
  methods: {
    async submitForm() {
      var status = document.getElementById("my-form-status");
      var form = document.getElementById("contact-form");
      const data = {
        name: this.name,
        email: this.email,
        message: this.message
      };
      await axios
        .post(this.endpoint, data)
        .then(response => {
          console.log(response);
          status.innerHTML = "Gracias por su mensaje";
          form.reset();
        })
        .catch(err => {
          console.log(err);
          status.innerHTML =
            "Error: Hubo un error intentando enviar su formulario";
        });
    }
  },
  watch: {
    name(value) {
      this.msg["error"] = "Por favor, compruebe los siguientes campos:";
      if (value === "") {
        this.msg["name"] = "Nombre y apellido es un campo requerido.";
      } else {
        this.msg["name"] = "";
      }
    },
    email(value) {
      this.msg["error"] = "Por favor, compruebe los siguientes campos:";
      if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        this.msg["email"] = "";
      } else {
        this.msg["email"] = "Ingrese un correo electrónico válido.";
      }
    },
    message(value) {
      this.msg["error"] = "Por favor, compruebe los siguientes campos:";
      if (value === "") {
        this.msg["msg"] = "Mensaje es un campo requerido.";
      } else {
        this.msg["msg"] = "";
      }
    }
  }
};
</script>

<style scoped lang="scss">
.mail {
  color: $purple;
  font-weight: 600;
}

.form-control {
  border: 2px solid $blue;
}
.lista {
  margin-left: -0.391vw;
  padding-left: -40px;
}

.icon {
  width: 2.461vw;
  height: 100%;
}

.boton {
  background-color: $blue;
  border-radius: 12px 2px;
  font-weight: 600;
  position: relative;
  right: -13.438vw;
  border: none;
}

::placeholder {
  color: #797676 !important;
  opacity: 1;
}

:-ms-input-placeholder {
  color: #797676;
}

::-ms-input-placeholder {
  color: #797676;
}

.form-control:focus {
  border-color: #713e94;
  box-shadow: 0 0 0 0.2rem rgba(113, 62, 148, 25%);
}

.btn-primary:hover {
  color: #fff;
  background-color: #713e94;
  border-color: #713e94;
}

.btn-primary:focus {
  color: #fff;
  background-color: #713e94;
  border-color: #713e94;
  box-shadow: none;
}

h2 {
  font-weight: 600;
  font-size: 18px;
  color: $blue;
  margin-top: 2.422vw;
}

.unite {
  margin-right: 17.5vw;
}

.anchor {
  padding: 0.547vw;
  color: $blue;
  border-radius: 12px 2px;

  &.active {
    background-color: $blue;
    color: $white;

    &:focus {
      box-shadow: 0 0 0 2px $white, 0 0 0 4px $blue, 0 0 0 6px $white;
    }
  }
}

.error-form {
  padding: 1rem;
  border: 1px solid red;
  background-color: rgb(255, 188, 198);
  margin-bottom: 1rem;
}

@media screen and (max-width: 768px) {
  form {
    margin-top: 2rem;
  }

  .icon {
    width: 35px;
    margin-right: 16px;
  }

  .boton {
    width: 100%;
    right: unset;
  }
}
</style>
