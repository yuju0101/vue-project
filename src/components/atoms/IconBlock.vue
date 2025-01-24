<template>
  <div class="header-icon" :style="{ backgroundColor: backgroundColor }">
    <font-awesome-icon :icon="icon" />
  </div>
</template>

<script setup>
defineProps({
  icon: {
    type: Array,
    required: true,
  },

  backgroundColor: {
    type: String,
    default: '#eff3fc',
  },
})
</script>

<style scoped lang="scss">
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
</style>
