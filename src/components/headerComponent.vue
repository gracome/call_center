<template>
  <div class="header_top bg-light p-4">
    <div class="d-flex justify-content-end">
      <span
        >Hello <strong>{{ fullName }} </strong>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fullName: "",
    };
  },
  mounted() {
    this.fullName = localStorage.getItem("adminUser");
  },
  methods: {
   
  },
};
</script>