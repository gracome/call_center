<template>
  <section class="vh-100" v-if="loginStatus === 'user'">
    <div class="container py-5 h-100">
      <div class="d-flex justify-content-center">
        <h4 class="fw-bold">Login</h4>
      </div>
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
              <label class="form-label" for="form1Example13"
                >Secure WebSocket Server (TLS):</label
              >
              <input
                type="text"
                id="form1Example13"
                name="serverSock"
                placeholder="wss://exemple.com:port/path"
                class="form-control form-control-lg"
                v-model="serverSocket"
                :class="{ 'is-invalid': validateField(serverSocket) }"
                @blur="companySuccess = !validateField(serverSocket)"
              />
            </div>
            <div class="form-outline mb-2">
              <label class="form-label" for="form1Example13">Fullname</label>
              <input
                type="text"
                id="form1Example14"
                placeholder="john doe"
                name="fullname"
                class="form-control form-control-lg"
                v-model="fullname"
                :class="{ 'is-invalid': validateField(fullname) }"
                @blur="companySuccess = !validateField(fullname)"
              />
            </div>

            <div class="form-outline mb-2">
              <label class="form-label" for="form1Example13">Domain</label>
              <input
                type="text"
                id="form1Example15"
                name="domain"
                placeholder="exemple.com"
                class="form-control form-control-lg"
                v-model="domain"
                :class="{ 'is-invalid': validateField(domain) }"
                @blur="companySuccess = !validateField(domain)"
              />
            </div>

            <div class="form-outline mb-2">
              <label class="form-label" for="form1Example13"
                >SIP Username</label
              >
              <input
                type="text"
                id="form1Example17"
                name="username"
                placeholder="johndoe"
                class="form-control form-control-lg"
                v-model="username"
                :class="{ 'is-invalid': validateField(username) }"
                @blur="companySuccess = !validateField(username)"
              />
            </div>
            <!-- Password input -->
            <div class="form-outline mb-3">
              <label class="form-label" for="form1Example23"
                >SIP Password</label
              >

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
            </div>

            <!-- Submit button -->
            <button
              type="submit"
              class="btn btn-primary btn-lg btn-block rounded-pill w-100"
              @click.prevent="connectToSocket"
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
              ><a href="#" @click="loginStatus = 'admin'"
                >Log in as admin</a
              ></span
            >
          </div>
        </div>
      </div>
    </div>
  </section>
  <div v-if="loginStatus === 'admin'">
    <adminLoginVue @update-login-status="onLoginStatusUpdate" />
  </div>
</template>

<script>
import JsSIP from "jssip";

import adminLoginVue from "./adminLogin.vue";
export default {
  components: {
    adminLoginVue,
  },
  data() {
    return {
      isLoading: false,
      success: false,
      serverSocket: "",
      fullname: "",
      domain: "",
      username: "",
      password: "",
      is_submitting: false,
      errorMessage: false,
      ua: "",
      configuration: "",
      loginStatus: "user",
    };
  },

  methods: {
    connectToSocket() {
      if (
        this.validateField(this.serverSocket) ||
        this.validateField(this.fullname) ||
        this.validateField(this.domain) ||
        this.validateField(this.username) ||
        this.validateField(this.password)
      ) {
        this.$notify({
          type: "error",
          text: "Veillez remplir tout les champs",
          duration: 5000,
        });
        return;
      }
      this.is_submitting = true;
      var socket = new JsSIP.WebSocketInterface(this.serverSocket);
      this.configuration = {
        sockets: [socket],
        uri: `sip:${this.username}@${this.domain}`,
        password: this.password,
      };

      this.ua = new JsSIP.UA(this.configuration);
      this.ua.start();
      document.getElementById("myForm").reset();
      this.is_submitting = false;
      this.ua.on("connected", () => {
        this.$notify({
          type: "success",
          text: "La connexion WebSocket a été établie avec succès.",
          duration: 5000,
        });
      });
      this.ua.on("disconnected", (e) => {
        this.$notify({
          type: "succès",
          text: "La connexion WebSocket a échoué.",
          e,
          duration: 5000,
        });
      });
      this.$router.push({ name: "home" });
    },
    onLoginStatusUpdate(newStatus) {
      this.loginStatus = newStatus;
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
