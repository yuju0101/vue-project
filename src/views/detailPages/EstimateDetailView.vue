<template>
  <div>
    <h1>詳細頁</h1>
    <p>當前 ID: {{ paramsId }}</p>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const paramsId = computed(() => route.params.id)
</script>
