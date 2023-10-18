<template>
  <section class="vh-100">
    <div class="container py-5 h-100">
      <div class="row d-flex align-items-center justify-content-center h-100">
        <div class="col-md-8 col-lg-7 col-xl-6">
          <img
            src="../assets/images/draw2.svg"
            class="img-fluid"
            alt="Phone image"
          />
        </div>
        <div class="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
          <form id="myForm">
            <div class="form-outline mb-2">
              <label class="form-label" for="form1Example13">E-mail</label>
              <input
                type="email"
                id="form1Example13"
                name="serverSock"
                placeholder="Enter email"
                class="form-control form-control-lg"
                v-model="email"
                :class="{ 'is-invalid': validateField(email) }"
                @blur="companySuccess = !validateField(email)"
              />
              <span class="invalid-feedback" v-if="validateField(email)"
                >Champ requis</span
              >
            </div>

            <!-- Password input -->
            <div class="form-outline mb-3">
              <label class="form-label" for="form1Example23">Password</label>

              <input
                type="password"
                name="password"
                id="form1Example23"
                placeholder="Password"
                class="form-control form-control-lg"
                v-model="password"
                :class="{ 'is-invalid': validateField(password) }"
                @blur="companySuccess = !validateField(password)"
              />
              <span class="invalid-feedback" v-if="validateField(password)"
                >Champ requis</span
              >
            </div>

            <!-- Submit button -->
            <button
              type="submit"
              class="btn btn-primary btn-lg btn-block rounded-pill w-100"
              @click.prevent="connectAdmin"
              :disabled="is_submitting"
            >
              <span
                class="spinner-border text-light"
                v-if="is_submitting"
              ></span>
              <span v-else> Connexion</span>
            </button>
          </form>
          <span class="d-flex justify-content-center mt-4">Or</span>

          <div class="d-flex justify-content-center">
            <span
              ><a href="#" @click="emitLoginStatus">Log in as SIP User</a></span
            >
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import Cookies from "js-cookie";

export default {
  data() {
    return {
      password: "",
      is_submitting: false,
      email: "",
      loginStatus: null,
    };
  },
  mounted() {
    if (Cookies.get("access_token")) {
      this.$router.push({ name: "home" }).catch(() => {});
    }
  },
  methods: {
    connectAdmin() {
      if (this.validateField(this.email) || this.validateField(this.password)) {
        this.$notify({
          type: "error",
          text: "Veillez remplir tout les champs",
          duration: 5000,
        });
        return;
      }
      this.is_submitting = true;
      axios
        .post(
          "https://intern-dev.kamgoko.com:3009/auth/login",
          {
            email: this.email,
            password: this.password,
          },
          {
            headers: [{ "Content-Type": "application/json" }],
          }
        )
        .then((response) => {
          this.is_submitting = false;
          const token = response.data.access_token;
          const expirationTime = 2 * 60 * 60;
          const adminUser = response.data.user.email;
          localStorage.setItem("adminUser", adminUser);
          this.email = "";
          this.password = "";
          Cookies.set("access_token", token, expirationTime);
          this.$router.push({ name: "home" });
          setTimeout(() => {
            if (Cookies.isKey("token")) {
              Cookies.remove("token");
              this.$router.push({ name: "login" });
            }
          }, expirationTime * 1000);
        })
        .catch((error) => {
          this.is_submitting = false;
          console.log("object", error);
        });
    },
    emitLoginStatus() {
      this.$emit("update-login-status", "user");
    },
    validateField(fieldValue) {
      if (fieldValue.trim() === "") {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>
