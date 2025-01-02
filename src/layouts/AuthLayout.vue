<template>
  <div class="min-h-screen auth-layout-container">
    <div class="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <!-- Colonne gauche : Description -->
      <div class="hidden lg:flex flex-col justify-center px-12">
        <h1 class="text-3xl font-bold mb-4">
          Bienvenue sur notre plateforme d'évaluation numérique
        </h1>
        <p class="mt-6 text-lg leading-relaxed">
          Cette plateforme vous aide à analyser vos capacités numériques et
          identifier les domaines clés à améliorer pour une transformation
          réussie.
        </p>
        <p class="mt-6 text-sm text-black-200">
          Conçue avec une simplicité d'utilisation, elle permet une collecte et
          une analyse rapide des données grâce à des formulaires dynamiques et
          personnalisables.
        </p>
        <div class="hidden lg:block mt-6">
          <a
            href="https://simplon.sn"
            target="_blank"
            class="text-3xl text-primary font-bold"
            >Powered by Simplon</a
          >
        </div>
      </div>

      <!-- Colonne droite : Formulaire -->
      <div class="flex flex-col items-center justify-center">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
</style>
