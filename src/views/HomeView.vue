<template>
  <div class="home">
    <HeaderComp />
    <sideBar />
    <phoneComp />
  </div>
</template>

<script>
import HeaderComp from "@/components/headerComponent.vue";
import sideBar from "@/components/sidebarComonet.vue";
import phoneComp from "@/components/phoneComponent.vue"
import VueCookie from "vue-cookies";
export default {
  name: "HomeView",
  components: {
    HeaderComp,
    sideBar,
    phoneComp
  },
  mounted() {
    if (!VueCookie.get("access_token")) {
      this.$router.push({ name: "login" }).catch(() => {});
    }
  },
};
</script>
