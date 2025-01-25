<template>
  <button type="button" v-bind="$attrs">
    <div class="icon-wrap">
      <font-awesome-icon :icon="icon" />
    </div>
    <slot></slot>
  </button>
</template>

<script setup>
defineProps({
  icon: {
    type: Array,
    required: false,
  },
})
</script>

<style scoped lang="scss">
button {
  color: #6272c3;
  background-color: #eff3fc;
  border: 1.5px solid #f4f4f4;
  font-weight: bold;
  border: none;
  padding: 10px 20px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  height: fit-content;
  font-size: 16px;
}
.icon-wrap {
  margin-right: 4px;
}
</style>
