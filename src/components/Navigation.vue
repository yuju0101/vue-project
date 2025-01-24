<template>
  <div class="nav-wrap">
    <button class="nav-item">
      <div class="icon"><font-awesome-icon :icon="['fas', 'mug-saucer']" /></div>
      放鬆列表
    </button>
    <button class="nav-item">
      <div class="icon"><font-awesome-icon :icon="['fas', 'scroll']" /></div>
      工作準則
    </button>
    <button class="nav-item">
      <div class="icon"><font-awesome-icon :icon="['fas', 'calendar']" /></div>
      估時紀錄
    </button>
    <button class="nav-item">
      <div class="icon"><font-awesome-icon :icon="['fas', 'puzzle-piece']" /></div>
      其他學習資源
    </button>
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
.nav-wrap {
  height: 100vh;
  background-color: #fbfbfb;
  padding: 1.5rem 0;
}

button.nav-item {
  width: 100%;
  padding: 16px;
  width: 200px;
  margin: 0 16px 16px 16px;
  border-radius: 10px;
  display: block;
  text-align: left;
  border: 0;
  display: flex;
  align-items: center;
  background-color: transparent;
  color: #616066;
  border: 0.5px solid #f2f2f2;

  .icon {
    margin-right: 8px;
  }

  &:hover {
    background-color: #fff;
  }

  &:focus {
    background-color: #fff;
    color: #6272c3;
    border: 0.5px solid #e6e6e6;
    font-weight: 700;
  }
}
</style>
