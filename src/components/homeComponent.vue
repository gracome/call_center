<template>
    <div class="d-flex justify-content-center align-items-center">
        <span>Hello {{ fullName }}</span>
    </div>
</template>

<script>
export default {

  data() {
    return {
     fullName: ""
      
    };
  },
  mounted(){
    
   this.fullName = localStorage.getItem("adminUser")
   console.log(this.fullName.email);
  },
  methods: {
  
   
  },
};
</script>