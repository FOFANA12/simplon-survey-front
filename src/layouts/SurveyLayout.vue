<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header -->
    <header class="w-full bg-primary text-white shadow-lg">
      <div
        class="container mx-auto px-6 py-4 flex items-center justify-between"
      >
        <h1 class="text-2xl font-bold">Plateforme d'Évaluation</h1>
        <nav>
          <a href="#" class="text-white hover:underline ml-6">Accueil</a>
          <a href="#" class="text-white hover:underline ml-6">Aide</a>
        </nav>
      </div>
    </header>

    <!-- Contenu Principal -->
    <main class="flex-grow flex items-center justify-center bg-gray-50">
      <div
        class="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden"
      >
        <div class="p-6">
          <!-- Dynamic Form or Content -->
          <router-view />
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="w-full bg-gray-800 text-white">
      <div class="container mx-auto px-6 py-4 text-center">
        <p>
          © 2024 Simplon. Tous droits réservés.
          <a
            href="https://simplon.sn"
            class="text-primary hover:underline ml-2"
            target="_blank"
            >Visitez Simplon</a
          >
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
</script>

<style scoped>
/* Couleurs principales */
.bg-primary {
  background-color: #007bff; /* Bleu primaire */
}
.text-primary {
  color: #007bff; /* Bleu primaire */
}
.hover\:underline:hover {
  text-decoration: underline;
}

/* Pour les ombres et coins arrondis */
.shadow-lg {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.rounded-lg {
  border-radius: 0.5rem;
}

/* Responsive container */
.container {
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}
</style>
