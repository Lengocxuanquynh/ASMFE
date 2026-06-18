<script setup>
import Header from "../../components/client/Header.vue";
import Footer from "../../components/client/Footer.vue";
</script>

<template>
  <div class="d-flex flex-column min-vh-100">
    <Header />
    <main class="flex-grow-1 mt-4 mb-4">
      <div class="container">
        <router-view />
      </div>
    </main>
    <Footer />
  </div>
</template>
