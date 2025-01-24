<template>
  <div class="header-wrap">
    <IconBlock :icon="['fas', 'face-grin']" backgroundColor="#fff" />
    <h1>my project</h1>
  </div>
</template>

<script setup>
import IconBlock from './atoms/iconBlock.vue'
</script>

<style scoped lang="scss">
.header-wrap {
  display: flex;
  align-items: center;
  padding: 1.5rem 2rem;
  background-color: #eff3fc;
}
.header-icon {
  margin-right: 8px;
  background-color: #fff;
  padding: 8px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
}

h1 {
  font-size: 20px;
  font-weight: bold;
}
</style>
