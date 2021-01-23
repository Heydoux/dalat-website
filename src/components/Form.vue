<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-6">
        <h2 class="text-uppercase">Redes Sociales</h2>
        <ul class="d-inline-block list-unstyled lista" role="list">
          <li class="d-inline-block ">
            <a
              href="https://dalat-a11y.slack.com/"
              target="_blank"
              rel="noreferrer"
              class="anchor"
              aria-label="Encontranos en Slack"
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
              href="https://collectednotes.com/dalat"
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
          <li class="d-inline-block">
            <a
              href="https://collectednotes.com/dalat"
              target="_blank"
              rel="noreferrer"
              class="anchor"
              aria-label="Collected Notes"
            >
              <img
                src="@/assets/images/form/CollectedNotes-icon.png"
                alt=""
                class="icon"
                aria-hidden="true"
              />
            </a>
          </li>
        </ul>
        <h2 class="text-uppercase">Unite a Slack</h2>
        <p class="unite">
          Podes ser parte de la comunidad solicitando unirte respondiendo al
          formulario
        </p>
        <h2 class="text-uppercase">¿Querés escribirnos por mail?</h2>
        <a href="mailto:dalat@gmail.com" class="mail">dalat@gmail.com</a>
      </div>
      <div class="col-lg-6">
        <form role="form" aria-label="Formulario de Contacto" class="">
          <div class="form-group" data-children-count="1">
            <label class="form-label" for="nombre">Nombre</label>
            <input
              required=""
              placeholder="Ej: Juan Dominguez"
              type="text"
              id="nombre"
              class="form-control"
            />
          </div>
          <div class="form-group" data-children-count="1">
            <label class="form-label" for="email">Email</label>
            <input
              required=""
              placeholder="Ej: juandominguez@gmail.com"
              type="email"
              id="email"
              class="form-control"
              data-kwimpalastatus="alive"
              data-kwimpalaid="1610903784165-1"
            />
          </div>
          <div class="form-group" data-children-count="1">
            <label class="form-label" for="mensaje">Mensaje</label>
            <textarea
              required=""
              rows="5"
              placeholder="Escribe tu mensaje"
              id="email"
              class="form-control"
            >
            </textarea>
          </div>
          <button type="submit" class="boton btn btn-primary">Enviar</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Form",
  props: {}
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

@media screen and (max-width: 768px) {
  .icon {
    width: 35px;
    margin-right: 16px;
  }
}
</style>
