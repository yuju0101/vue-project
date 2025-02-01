<script setup>
import { RouterLink, RouterView } from 'vue-router'
import ItemList from './components/ItemList.vue'
import ItemList2 from './components/ItemList2.vue'
import Header from './components/Header.vue'
import Navigation from './components/Navigation.vue'
</script>

<template>
  <Header />
  <div class="wrapper">
    <Navigation />
    <RouterView />
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
}
</style>
