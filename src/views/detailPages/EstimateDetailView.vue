<template>
  <div class="container">
    <Title>估時紀錄 | {{ props.tableData.backlogNum }}</Title>
    <h1>詳細頁</h1>
    <p>當前 ID: {{ route.params.id }}</p>
  </div>
</template>

<script setup>
import Title from '@/components/Title.vue'
import { useRoute } from 'vue-router'
import { computed, onUnmounted } from 'vue'
const route = useRoute()
const paramsId = computed(() => route.params.id)

// const props = defineProps({
//   tableData: {
//     type: Array,
//     required: true,
//   },
// })
</script>
