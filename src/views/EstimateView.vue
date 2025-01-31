<template>
  <div class="container">
    <Title>估時紀錄</Title>
    <Table :tableHeaders="tableHeaders" :tableData="estimateStore.tableData">
      <template #reactiveTime="{ row }">
        <span :class="reactiveTimeCheck(row.estimateTime, row.reactiveTime)">
          {{ row.reactiveTime }}
        </span>
      </template>
      <template #status="{ row }">
        <span :class="statusCheck(row.status)">
          {{ row.status }}
        </span>
      </template>
      <template #link="{ row }">
        <div class="btn-wrap">
          <!-- 透過 router 來連結詳細頁 -->
          <router-link :to="{ name: 'EstimateDetailView', params: { id: row.id } }">
            <FilledButton :icon="['fas', 'arrow-right']"> 前往 </FilledButton>
          </router-link>

          <!-- 透過 click事件 來連結詳細頁 -->
          <!-- <FilledButton :icon="['fas', 'arrow-right']" @click="goToDetail(row.id)">
            前往
          </FilledButton> -->
        </div>
      </template>
    </Table>
  </div>
</template>

<script setup>
import { onMounted, ref, computed, watch } from 'vue'
import { useEstimateStore } from '@/stores/estimateStore'

// 引用元件
import Title from '@/components/Title.vue'
import IconBlock from '@/components/atoms/IconBlock.vue'
import Table from '@/components/atoms/Table.vue'
import FilledButton from '@/components/atoms/FilledButton.vue'

// 定義 router
import { useRoute } from 'vue-router'

const estimateStore = useEstimateStore()
const route = useRoute()
// 使用 computed 確保 paramsId 是響應式的
const paramsId = computed(() => route.params.id)
// 監聽 id 變化，重新請求資料
watch(paramsId, (newId) => {
  console.log('ID 變更為:', newId)
})

const tableHeaders = [
  {
    key: 'id',
    width: '5%',
    label: '#',
    slotName: 'id',
  },
  {
    key: 'backlogNum',
    width: '10%',
    label: 'Backlog',
  },
  {
    key: 'project',
    width: '10%',
    label: '專案名稱',
  },
  {
    key: 'name',
    width: '10%',
    label: '專案內容',
  },
  {
    key: 'estimateTime',
    width: '10%',
    label: '預估時數',
    slotName: 'estimateTime',
  },
  {
    key: 'reactiveTime',
    width: '10%',
    label: '實際完成時數',
    slotName: 'reactiveTime',
  },
  {
    key: 'status',
    width: '10%',
    label: '狀態',
    // 在想要監控的地方必須定義 slotName
    slotName: 'status',
  },
  {
    key: 'link',
    width: '10%',
    label: '連結',
    slotName: 'link',
  },
]

// api 串接
const tableData = ref([])
const apiUrl = 'http://localhost:3000'
const fetchTableData = async () => {
  try {
    const fetchDataUrl = `${apiUrl}/estimates`
    const response = await fetch(fetchDataUrl)
    const result = await response.json()
    tableData.value = result.data
  } catch (error) {
    console.error('Fetch API failed:', error)
  }
}

const statusCheck = (status) => {
  if (status) {
    if (status === '已完成') {
      return 'status-tag-finished'
    } else if (status === '進行中') {
      return 'status-tag-processing'
    } else if (status === '暫停中') {
      return 'status-tag-pause'
    } else if (status === '未完成') {
      return 'status-tag-failed'
    }
  }
}

const reactiveTimeCheck = (estimateTime, reactiveTime) => {
  if (reactiveTime > estimateTime) {
    return 'time-warning'
  } else if (reactiveTime < estimateTime) {
    return 'time-successful'
  }
}

const goToDetail = (id) => {
  route.push({ name: 'EstimateDetailView', params: { id } })
  console.log('前往詳細頁:', id)
}

onMounted(() => {
  estimateStore.fetchTableData()
})
</script>
<style>
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
