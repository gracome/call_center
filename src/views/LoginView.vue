<template>
  <div class="home">
    <authComp/>
  </div>
</template>

<script>
import authComp from "@/components/LoginComponent.vue"
export default {
  name: 'LoginView',
  components: {
   authComp,
  },

}
</script>

