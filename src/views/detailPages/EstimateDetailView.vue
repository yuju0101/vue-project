<template>
  <div class="container" v-if="selectedData">
    <div class="button-wrap">
      <FilledButton :icon="['fas', 'reply']" @click="goBack"> 回上一頁 </FilledButton>
      <FilledButton :href="selectedData?.link || '#'" target="_blank">
        查看Backlog內容
      </FilledButton>
    </div>
    <div class="wrap">
      <div class="content-block">
        <p class="title">專案內容</p>
        <p class="content-title">{{ selectedData?.name }}</p>
      </div>
      <div class="content-block">
        <span class="content status-tag-finished">{{ selectedData?.status }}</span>
      </div>
    </div>
    <div class="wrap">
      <div class="content-block">
        <p class="title">專案項目</p>
        <p class="content">{{ selectedData?.project }}</p>
      </div>
      <div class="content-block">
        <p class="title">Backlog Number</p>
        <p class="content">{{ selectedData?.backlogNum }}</p>
      </div>
    </div>
    <div class="time-wrap">
      <div class="time">
        <p class="title">預估時數</p>
        <p class="content">{{ selectedData?.estimateTime }}</p>
      </div>
      <div class="time">
        <p class="title">實際完成時數</p>
        <p class="content">{{ selectedData?.reactiveTime }}</p>
      </div>
    </div>
    <div class="wrap">
      <div class="content-block">
        <p class="title">執行內容與紀錄</p>
        <p class="text">
          筆記內容筆記內容筆記內容筆記內容筆記內容筆記內容筆記內容筆記內容，筆記內容筆記內容筆記內容筆記內容筆記內容筆記內容筆記內容筆記內容，筆記內容筆記內容筆記內容，筆記內容筆記內容筆記內容，筆記內容筆記內容筆記內容筆記內容筆記內容筆記內容筆記內容筆記內容，筆記內容筆記內容筆記內容筆記內容筆記內容筆記內容筆記內容筆記內容，筆記內容筆記內容筆記內容，筆記內容筆記內容筆記內容，筆記內容筆記內容筆記內容筆記內容筆記內容筆記內容筆記內容筆記內容，筆記內容筆記內容筆記內容筆記內容筆記內容筆記內容筆記內容筆記內容，筆記內容筆記內容筆記內容，筆記內容筆記內容筆記內容，
        </p>
      </div>
    </div>
  </div>
  <div v-else>
    <p>資料載入中</p>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { computed, onMounted, ref } from 'vue'
import { useEstimateStore } from '@/stores/estimateStore.js'

// components
import FilledButton from '@/components/atoms/FilledButton.vue'

const router = useRouter()
const route = useRoute()
const paramsId = computed(() => route.params.id)
const estimateStore = useEstimateStore()

const goBack = () => {
  router.back()
}

const selectedData = ref(null)

// 確保引用的資料為該筆 id
// const selectedData = computed(() => {
//   return estimateStore.tableData.find((item) => item.id === Number(paramsId.value)) || null
// })

// const selectedData = computed(() => {
//   if (estimateStore.tableData.length === 0) {
//     return null
//   }

//   // 找出符合條件的資料
//   const foundItem = estimateStore.tableData.find((item) => item.id === Number(paramsId.value))
//   if (!foundItem) {
//     return null
//   }

//   // 建立新物件，避免直接修改 Pinia 的 state
//   return {
//     ...foundItem, // 保留原始資料
//     newlink: `<a href="${foundItem.link}" target="_blank"><FilledButton :icon="['fas', 'arrow-right']"> 查看Backlog內容 </FilledButton></a>`, // 新增處理後的資料
//   }
// })

onMounted(async () => {
  selectedData.value = estimateStore.tableData.find((item) => item.id === Number(paramsId.value))
  if (!selectedData.value) {
    let getData = await estimateStore.fetchItemById(paramsId.value)
    selectedData.value = getData.data
    console.log('無資料時', selectedData.value)
  }
  console.log('有資料時', selectedData.value)
})
</script>
<style scoped lang="scss">
.container {
  max-width: 1200px;
}

.wrap {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  border-bottom: 0.5px solid #e6e6e6;
}
.title {
  font-size: 16px;
  font-weight: bold;
  color: #b9b9b9;
}
.text {
  padding-top: 8px;
  line-height: 1.8;
  letter-spacing: 0.2px;
}
.content {
  font-weight: bold;
  font-size: 20px;
}
.content-title {
  font-weight: bold;
  font-size: 26px;
}
.content-block {
  padding: 1rem 0;
}
.text-center {
  text-align: center;
}

.time {
  padding: 2px 12px;
  border: 0.5px solid #e6e6e6;
  background-color: #eff3fc;
  border-radius: 10px;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-align: center;
  .title,
  .content {
    font-size: 15px;
  }
  .title {
    color: #616066;
    font-weight: normal;
  }
}

.button-wrap {
  padding-bottom: 32px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
}
.time-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 24px 0 0 0;
}

.status-tag {
  &-processing {
    padding: 8px 12px;
    font-size: 16px;
    background-color: #ebf6eb;
    color: #008000;
    border-radius: 4px;
    border: 0.5px solid #f4f4f4;
  }
  &-pause {
    padding: 8px 12px;
    font-size: 16px;
    background-color: #f6efea;
    color: #cf7e27;
    border-radius: 4px;
    border: 0.5px solid #f4f4f4;
  }
  &-failed {
    padding: 8px 12px;
    font-size: 16px;
    background-color: #fff4f8;
    color: #cb304c;
    border-radius: 4px;
    border: 0.5px solid #f4f4f4;
  }
  &-finished {
    padding: 8px 12px;
    font-size: 16px;
    background-color: #eff3fc;
    color: #6272c3;
    border-radius: 4px;
    border: 0.5px solid #f4f4f4;
  }
}
</style>
