<template>
  <div class="login">
    <Navbar></Navbar>
    <main id="mainContent" class="container-lg">
      <div class="modal-body">
        <!--
        <ul class="nav nav-fill nav-pills mb-3" id="pills-tab" role="tablist">
          <li class="nav-item">
            <a
              class="nav-link active"
              id="pills-home-tab"
              data-toggle="pill"
              href="#pills-login"
              role="tab"
              aria-controls="pills-login"
              aria-selected="true"
            >
              Ingresar
            </a>
          </li>
          
          <li class="nav-item">
            <a
              class="nav-link"
              id="pills-register-tab"
              data-toggle="pill"
              href="#pills-register"
              role="tab"
              aria-controls="pills-register"
              aria-selected="false"
            >
              Crear cuenta
            </a>
          </li>
          
        </ul>
        -->
        <div class="tab-content" id="pills-tabContent">
          <div
            class="tab-pane fade show active"
            id="pills-login"
            role="tabpanel"
            aria-labelledby="pills-login-tab"
          >
            <div class="form-group">
              <label for="exampleInputEmail1">E-mail</label>
              <input
                type="email"
                v-model="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="E-mail"
              />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Contraseña</label>
              <input
                type="password"
                @keyup.enter="login"
                v-model="password"
                class="form-control"
                id="exampleInputPassword1"
                placeholder="Contraseña"
              />
            </div>
            <div class="form-group d-flex justify-content-between">
              <button class="btn btn-primary" @click="login">Ingresar</button>
              <button class="btn btn-danger" @click="resetPassword">
                Olvidé contraseña !
              </button>
            </div>
          </div>
          <!--
          <div
            class="tab-pane fade"
            id="pills-register"
            role="tabpanel"
            aria-labelledby="pills-register-tab"
          >
            <div class="form-group">
              <label for="name">Nombre</label>
              <input
                type="text"
                v-model="name"
                class="form-control"
                id="name"
                placeholder="Nombre"
              />
            </div>
            <div class="form-group">
              <label for="email">E-mail</label>
              <input
                type="email"
                v-model="email"
                class="form-control"
                id="email"
                aria-describedby="emailHelp"
                placeholder="E-mail"
              />
            </div>
            <div class="form-group">
              <label for="password">Contraseña</label>
              <input
                type="password"
                v-model="password"
                class="form-control"
                id="password"
                placeholder="Contraseña"
              />
            </div>
            <div class="form-group">
              <button class="btn btn-primary" @click="register">
                Continuar
              </button>
            </div>
          </div>
          -->
        </div>
      </div>
    </main>
    <Footer></Footer>
  </div>
</template>

<script>
import { fb, db } from "../firebase";

export default {
  name: "Login",
  props: {
    msg: String
  },
  data() {
    return {
      name: null,
      email: null,
      password: null
    };
  },
  methods: {
    login() {
      fb.auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.replace("admin/articlelist");
        })
        .catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode === "auth/wrong-password") {
            alert("Wrong password!");
          } else {
            alert(errorMessage);
          }
          console.log(error);
        });
    },
    register() {
      fb.auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(user => {
          db.collection("profiles")
            .doc(user.user.uid)
            .set({
              name: this.name
            })
            .then(function() {
              console.log("Document successfully written!");
            })
            .catch(function(error) {
              console.error("Error writing document: ", error);
            });
          this.$router.replace("admin");
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode == "auth/weak-password") {
            alert("The password is too weak.");
          } else {
            alert(errorMessage);
          }
          console.log(error);
        });
    },
    resetPassword() {
      const auth = fb.auth();
      if (this.email === null) {
        Swal.fire({
          icon: "warning",
          title: "E-mail",
          text: "Necesitas ingresar tu E-mail primero !"
        });
      } else {
        var emailAddress = this.email;
        auth
          .sendPasswordResetEmail(emailAddress)
          .then(function() {
            Swal.fire({
              icon: "success",
              title: "Contraseña reiniciada",
              text:
                "Vas a recibir un E-mail con un link para reiniciar tu contraseña !"
            });
          })
          .catch(function() {
            Swal.fire({
              icon: "error",
              text: "No se pudo reiniciar la contraseña contacta el webmaster"
            });
          });
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
  background-color: $blue;
}

.btn-primary {
  background-color: $blue;
  border-color: $blue;
}
</style>
