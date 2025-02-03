<template>
  <div class="container">
    <section class="header-wrap">
      <h2>Activity Overview</h2>
    </section>
    <section class="filter-wrap">
      <div class="tab-wrap">
        <div
          class="tab"
          v-for="(tag, idx) in tags"
          :key="idx"
          @click="activeTag = idx"
          :class="{ active: activeTag === idx }"
        >
          {{ tag.title }}
        </div>
      </div>
      <input type="text" placeholder="請輸入搜尋內容..." />
    </section>

    <!-- Tab Area -->
    <section>
      <HomeList v-if="activeTag === 0"></HomeList>
      <HomeStatus v-else-if="activeTag === 1"></HomeStatus>
      <HomeCalendar v-else-if="activeTag === 2"></HomeCalendar>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import HomeList from '@/components/home/HomeLIst.vue'
import HomeStatus from '@/components/home/HomeStatus.vue'
import HomeCalendar from '@/components/home/HomeCalendar.vue'

const activeTag = ref(0) // 預設選中 "標籤 1"
// tag渲染
const tags = ref([{ title: '專案列表' }, { title: '執行狀態' }, { title: '行事曆' }])
</script>
<style scoped lang="scss">
.header-wrap {
  text-align: center;
  padding: 48px 0 24px 0;
  h2 {
    font-weight: bold;
    margin-bottom: 16px;
    font-size: 40px;
  }
}

.filter-wrap {
  display: flex;
  justify-content: space-between;
  padding-bottom: 1.5rem;
  margin: 0 2rem 0.5rem 2rem;
  border-bottom: 0.5px solid #e6e6e6;
  input {
    padding: 10px 12px;
    border-radius: 10px;
    font-size: 16px;
    width: 320px;
    background-color: #fbfbfb;
    border: 0.5px solid #e6e6e6;
  }
  .tab-wrap {
    display: flex;
    .tab {
      padding: 7px 8px 2px 8px;
      border: 0.5px solid #e6e6e6;
      border-radius: 10px;
      margin-left: 1rem;
      font-size: 16px;
      cursor: pointer;
      &.active {
        background-color: #eff3fc;
        color: #000;
        font-weight: bold;
      }
    }
  }
}
</style>
