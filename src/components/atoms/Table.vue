<template>
  <section class="table-wrap">
    <table>
      <thead>
        <tr>
          <th v-for="(header, idx) in tableHeaders" :key="idx">
            {{ header.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIdx) in tableData" key="rowIdx">
          <!-- 每一行需要根據 tableHeaders 來決定如何渲染每個欄位的資料 -->
          <td
            v-for="(header, colIdx) in tableHeaders"
            key="colIdx"
            :style="{ width: header.width }"
          >
            <!-- 把 header.slotName 的值動態地當作插槽名稱，只要插槽名稱與 header.slotName 的值對應，就會自動匹配到正確的插槽 -->
            <!-- 透過 v-bind 傳遞資料，將每一行的 row 傳遞給插槽 -->
            <slot :name="header.slotName" :row="row">
              {{ row[header.key] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script setup>
defineProps({
  icon: {
    type: Array,
    required: false,
  },

  // 表頭
  tableHeaders: {
    type: Array,
    required: true,
  },
  // 表格資料
  tableData: {
    type: Array,
    required: true,
  },
})
</script>

<style scoped lang="scss">
th,
td {
  padding: 8px 0;
}
th {
  font-weight: bold;
}
td {
  text-align: center;
}

.table-wrap {
  background-color: #fbfbfb;
  border: 1.5px solid #f4f4f4;
  border-radius: 10px;
  padding: 16px 24px;

  th {
    text-align: center;
    font-weight: 700;
    color: #3b3b3b;
    padding: 16px 0;
  }

  td {
    text-align: center;
    margin: 12px 0;
    &.img-wrap {
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        display: block;
        width: 100px;
        height: auto;
      }
    }
  }
}
</style>
