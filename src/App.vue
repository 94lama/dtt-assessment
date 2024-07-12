<script setup>
import {RouterView} from 'vue-router';
import Navbar from './components/Navbar.vue';

</script>

<template>
  <Navbar />
  <RouterView class="body" />
</template>

<style scoped>
.body {
  width: 90vw;
  max-width: var(--width);
  padding-top: 2rem;
}
</style>
