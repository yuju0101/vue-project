<template>
  <component
    :is="tag"
    class="button"
    v-bind="$attrs"
    :href="isLink ? props.href : undefined"
    :to="isRouterLink ? props.to : undefined"
    @click="$emit('click')"
  >
    <div v-if="icon" class="icon-wrap">
      <font-awesome-icon :icon="icon" />
    </div>
    <slot></slot>
  </component>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  icon: {
    type: [Array, String, Object], // FontAwesome 可接受三種格式
    required: false,
    default: null, // 確保未提供 icon 時不會報錯
  },

  // 用於 Vue Router 的路由
  to: {
    type: String,
    required: false,
    default: null,
  },

  // 用於 a 連結
  href: {
    type: String,
    required: false,
    default: null,
  },
})

const emit = defineEmits(['click'])

const isRouterLink = computed(() => !!props.to)
const isLink = computed(() => !!props.href)
// 根據上面兩個變數來決定要用哪個標籤
const tag = computed(() => {
  if (isRouterLink.value) return 'router-link'
  if (isLink.value) return 'a'
  return 'button'
})
</script>

<style scoped lang="scss">
.button {
  color: #6272c3;
  background-color: #eff3fc;
  border: 1.5px solid #f4f4f4;
  font-weight: bold;
  border: none;
  padding: 10px 20px;
  border-radius: 10px;
  align-items: center;
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
