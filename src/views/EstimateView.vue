<template>
  <div class="container">
    <Title>估時紀錄</Title>
    <Table :tableHeaders="tableHeaders" :tableData="tableData">
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
          <!-- @click="goToLink" -->
          <FilledButton :icon="['fas', 'arrow-right']">前往</FilledButton>
        </div>
      </template>
    </Table>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import Title from '@/components/Title.vue'
import IconBlock from '@/components/atoms/IconBlock.vue'
import Table from '@/components/atoms/Table.vue'
import FilledButton from '@/components/atoms/FilledButton.vue'

const tableHeaders = [
  {
    key: 'id',
    width: '5%',
    label: '#',
    slotName: 'id',
  },
  {
    key: 'bcaklogNum',
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

const tableData = [
  {
    id: 1,
    bcaklogNum: '97453',
    project: 'Chatbot客服機器人',
    name: '前台客服傳連結訊息可直接點擊',
    estimateTime: 2,
    reactiveTime: 2,
    status: '已完成',
    // link: 'https://dev.azure.com/cwgroup/%E7%87%9F%E9%81%8B%E7%B3%BB%E7%B5%B1%E7%B5%84/_boards/board/t/Data%20Middle/Backlog%20items?System.AssignedTo=laurenweng%40cw.com.tw&workitem=97453',
  },
  {
    id: 2,
    bcaklogNum: '97464',
    project: 'Chatbot客服機器人',
    name: '滿意度調查後台管理頁面抽屜呈現',
    estimateTime: 8,
    reactiveTime: 16,
    status: '暫停中',
    // link: 'https://dev.azure.com/cwgroup/%E7%87%9F%E9%81%8B%E7%B3%BB%E7%B5%B1%E7%B5%84/_boards/board/t/Data%20Middle/Backlog%20items?System.AssignedTo=laurenweng%40cw.com.tw&workitem=97464',
  },
  {
    id: 3,
    bcaklogNum: '97453',
    project: 'TIT數位專輯',
    name: '列表與detail頁串接/資料處理',
    estimateTime: 21,
    reactiveTime: 16,
    status: '進行中',
    // link: 'https://dev.azure.com/cwgroup/digital-products/_boards/board/t/digital-products%20Team/Backlog%20items?System.AssignedTo=kelvinchen%40cw.com.tw%2Claurenweng%40cw.com.tw&workitem=97924',
  },
  {
    id: 4,
    bcaklogNum: '97707',
    project: 'cs-admin合併至it-admin',
    name: '會員列表/會員資料/自動續訂/訂戶權益',
    estimateTime: 30,
    reactiveTime: 36,
    status: '未完成',
    // link: 'https://dev.azure.com/cwgroup/%E7%87%9F%E9%81%8B%E7%B3%BB%E7%B5%B1%E7%B5%84/_workitems/edit/97707',
  },
]

const fetchOriginData = () => {
  newProducts.value.push(...products)
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

onMounted(() => {
  fetchOriginData()
})
</script>
<style scope lang="scss">
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
