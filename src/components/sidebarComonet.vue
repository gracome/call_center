<template>
      <div
    class="side_left bg-primary d-flex justify-content-between align-items flex-column pt-4"
  >
    <div>
      <div class="text-center mb-3 w-100 pt-4">
        <span>
          <a
            href="#"
            class="list-group-item list-group-item-action"
            @click="selectAction('ajouterUtilisateur')"
            :class="{ active: selectedAction === 'ajouterUtilisateur' }"
            ><span>+</span>Add user</a
          >
        </span>
      </div>

      <div class="text-center mb-3 w-100">
        <span
          ><a
            href="#"
            class="list-group-item list-group-item-action"
            @click="selectAction('listeUtilisateur')"
            :class="{ active: selectedAction === 'listeUtilisateur' }"
            >
          </a> History </span>
      </div>
    
    <div class="text-center mb-3 w-100">
        <span>
          <a
            href="#"
            class="list-group-item list-group-item-action"
            @click="selectAction('category')"
            :class="{ active: selectedAction === 'category' }"
            >
          </a></span
        >
      </div>

      <div class="text-center mb-3 w-100">
        <span>
          <a
            href="#"
            class="list-group-item list-group-item-action"
            @click="selectAction('statistique')"
            :class="{ active: selectedAction === 'statistique' }"
            >
          </a></span
        >
      </div>
      <div class="text-center mb-3 w-100">
        <span>
          <a
            href="#"
            class="list-group-item list-group-item-action"
            @click="selectAction('profil')"
            :class="{ active: selectedAction === 'profil' }"
            >
          </a></span
        >
      </div>
    </div>
    
   
    
  </div>
</template>