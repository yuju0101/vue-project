<template>
  <button type="button" v-bind="$attrs">
    <div v-if="icon" class="icon-wrap">
      <font-awesome-icon :icon="icon" />
    </div>
    <slot></slot>
  </button>
</template>

<script setup>
defineProps({
  icon: {
    type: [Array, String, Object], // FontAwesome 可接受三種格式
    required: false,
    default: null, // 確保未提供 icon 時不會報錯
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

  &:hover {
    background-color: #e2e8f0;
    border-radius: 10px;
    cursor: pointer;
  }
}
.icon-wrap {
  margin-right: 4px;
}
</style>
