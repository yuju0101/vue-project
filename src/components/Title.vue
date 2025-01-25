<template>
  <div class="title-warp">
    <!-- text area -->
    <section>
      <h2>
        <slot name="default">
          <!-- 主標 -->
        </slot>
      </h2>
      <p>
        <slot name="subtitle">
          <!-- 副標 -->
        </slot>
      </p>
    </section>

    <!-- btn area -->
    <section class="icon-wrap">
      <slot name="btns"> </slot>
    </section>
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
.title-warp {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 24px 0;
}
h2 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 8px;
}
p {
  font-size: 16px;
}
.icon-wrap {
  display: flex;
  align-items: center;
}
</style>
