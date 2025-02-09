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

// components
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
    width: '5%',
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
    width: '5%',
    label: '預估時數',
    slotName: 'estimateTime',
  },
  {
    key: 'reactiveTime',
    width: '5%',
    label: '實際完成時數',
    slotName: 'reactiveTime',
  },
  {
    key: 'status',
    width: '5%',
    label: '狀態',
    // 在想要監控的地方必須定義 slotName
    slotName: 'status',
  },
  {
    key: 'link',
    width: '5%',
    label: '連結',
    slotName: 'link',
  },
]

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
<style scoped lang="scss">
.status-tag {
  &-processing {
    padding: 4px 6px;
    font-size: 14px;
    background-color: #ebf6eb;
    color: #008000;
    border-radius: 4px;
    border: 0.5px solid #f4f4f4;
  }
  &-pause {
    padding: 4px 6px;
    font-size: 14px;
    background-color: #f6efea;
    color: #cf7e27;
    border-radius: 4px;
    border: 0.5px solid #f4f4f4;
  }
  &-failed {
    padding: 4px 6px;
    font-size: 14px;
    background-color: #fff4f8;
    color: #cb304c;
    border-radius: 4px;
    border: 0.5px solid #f4f4f4;
  }
  &-finished {
    padding: 4px 6px;
    font-size: 14px;
    background-color: #eff3fc;
    color: #6272c3;
    border-radius: 4px;
    border: 0.5px solid #f4f4f4;
  }
}

.time-warning {
  font-weight: bold;
  color: #cb304c;
}

.time-successful {
  font-weight: bold;
  color: #6272c3;
}

.btn-wrap {
  display: flex;
  justify-content: center;
}
</style>
