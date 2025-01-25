<template>
  <div class="container">
    <!-- title area -->
    <section>
      <Title>
        估時紀錄
        <template #btns>
          <IconBlock :icon="['fas', 'magnifying-glass']" />
          <IconBlock :icon="['fas', 'circle-info']" />
        </template>
      </Title>
    </section>
    <!-- list area -->
    <section class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>number</th>
            <th>專案名稱</th>
            <th>Backlog名稱</th>
            <th>估計時數</th>
            <th>實際時數</th>
            <th>執行紀錄</th>
            <th>狀態</th>
            <th>連接</th>
          </tr>
          <tr v-for="(item, idx) in newProducts" key="idx">
            <td>
              <FilledButton class="button" @click="editItem(item)">選</FilledButton>
            </td>
            <td>{{ item.id }}</td>
            <td>{{ item.bcaklogNum }}</td>
            <td>{{ item.project }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.estimateTime }}</td>
            <td>{{ item.reactiveTime }}</td>
            <td>{{ item.status }}</td>
            <td><a :href="item.link" target="_blank">backlog連結</a></td>
          </tr>
        </thead>
      </table>
    </section>
    <Table></Table>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import Title from '@/components/Title.vue'
import IconBlock from '@/components/atoms/IconBlock.vue'
import Table from '@/components/atoms/Table.vue'
import FilledButton from '@/components/atoms/FilledButton.vue'
const newProducts = ref([])
const products = [
  {
    id: '1',
    bcaklogNum: '97453',
    project: 'Chatbot客服機器人',
    name: '前台客服傳連結訊息可直接點擊',
    estimateTime: '2',
    reactiveTime: '2',
    status: '已完成',
    link: 'https://dev.azure.com/cwgroup/%E7%87%9F%E9%81%8B%E7%B3%BB%E7%B5%B1%E7%B5%84/_boards/board/t/Data%20Middle/Backlog%20items?System.AssignedTo=laurenweng%40cw.com.tw&workitem=97453',
  },
  {
    id: '2',
    bcaklogNum: '97464',
    project: 'Chatbot客服機器人',
    name: '滿意度調查後台管理頁面抽屜呈現',
    estimateTime: '8',
    reactiveTime: '16',
    status: '暫停中',
    link: 'https://dev.azure.com/cwgroup/%E7%87%9F%E9%81%8B%E7%B3%BB%E7%B5%B1%E7%B5%84/_boards/board/t/Data%20Middle/Backlog%20items?System.AssignedTo=laurenweng%40cw.com.tw&workitem=97464',
  },
  {
    id: '3',
    bcaklogNum: '97453',
    project: 'TIT數位專輯',
    name: '列表與detail頁串接/資料處理',
    estimateTime: '21',
    reactiveTime: '16',
    status: '進行中',
    link: 'https://dev.azure.com/cwgroup/digital-products/_boards/board/t/digital-products%20Team/Backlog%20items?System.AssignedTo=kelvinchen%40cw.com.tw%2Claurenweng%40cw.com.tw&workitem=97924',
  },
  {
    id: '4',
    bcaklogNum: '97707',
    project: 'cs-admin合併至it-admin',
    name: '會員列表/會員資料/自動續訂/訂戶權益',
    estimateTime: '30',
    reactiveTime: '36',
    status: '未完成',
    link: 'https://dev.azure.com/cwgroup/%E7%87%9F%E9%81%8B%E7%B3%BB%E7%B5%B1%E7%B5%84/_workitems/edit/97707',
  },
]

const fetchOriginData = () => {
  newProducts.value.push(...products)
}

onMounted(() => {
  fetchOriginData()
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
