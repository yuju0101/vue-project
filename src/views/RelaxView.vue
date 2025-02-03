<template>
  <div class="container">
    <!-- title area -->
    <section>
      <Title>
        放鬆列表
        <template #subtitle> 用音樂來場放鬆小旅行 </template>
        <template #btns>
          <IconBlock :icon="['fas', 'magnifying-glass']" />
          <IconBlock :icon="['fas', 'circle-info']" />
        </template>
      </Title>
    </section>

    <!-- add area -->
    <section class="form-wrap">
      <FilledButton :icon="['fas', 'plus']" @click="addNewItem">新增音樂</FilledButton>
      <div v-if="newItem" class="form">
        <div class="item-wrap">
          <div class="item">
            <label for="name" class="form-label">頻道名稱</label>
            <input
              type="text"
              id="name"
              class="form-control"
              placeholder="請輸入頻道名稱"
              v-model="newAddProduct.name"
            />
          </div>
          <div class="item">
            <label for="song" class="form-label">歌曲名稱</label>
            <input
              type="text"
              id="song"
              class="form-control"
              placeholder="請輸入歌曲名稱"
              v-model="newAddProduct.song"
            />
          </div>
          <div class="item">
            <label for="link" class="form-label">YouTube網址</label>
            <input
              type="text"
              id="link"
              class="form-control"
              placeholder="請輸入YouTube網址"
              v-model="newAddProduct.link"
            />
          </div>
          <div class="item input-wrap">
            <div>
              <label for="productImage" class="form-label">圖片網址</label>
              <input
                type="text"
                id="productImage"
                class="form-control"
                placeholder="請輸入圖片網址"
                v-model="newAddProduct.imageUrl"
              />
            </div>
            <div class="img-area" v-if="newAddProduct.imageUrl">
              <img :src="newAddProduct.imageUrl" class="img-fluid" />
            </div>
          </div>
        </div>
        <div class="btn-wrap">
          <FilledButton @click="confirmEdit" class="button">更新</FilledButton>
          <FilledButton @click="cancelEdit">取消</FilledButton>
        </div>
      </div>
    </section>

    <!-- list area -->
    <section class="flow-area">
      <Table :tableHeaders="tableHeaders" :tableData="relaxStore.listData">
        <template #imageUrl="{ row }">
          <div class="img-wrap">
            <img :src="row.imageUrl" class="img-fluid" :alt="row.name" />
          </div>
        </template>
        <template #listened="{ row }">
          {{ row.listened ? '已聆聽' : '未聆聽' }}
        </template>
        <template #action="{ row }">
          <div class="btn-wrap">
            <FilledButton @click="editItem(row)">修改</FilledButton>
            <FilledButton @click="deleteItem(row)">刪除</FilledButton>
            <FilledButton :icon="['fas', 'arrow-right']" :href="row.link" target="_blank">
              前往聆聽
            </FilledButton>
          </div>
        </template>
      </Table>
    </section>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRelaxStore } from '@/stores/relaxStore.js'
import axios from 'axios'

// components
import Title from '@/components/Title.vue'
import Table from '@/components/atoms/Table.vue'
import IconBlock from '@/components/atoms/IconBlock.vue'
import FilledButton from '@/components/atoms/FilledButton.vue'

const relaxStore = useRelaxStore()
// const listData = ref([])
const tableHeaders = [
  {
    key: 'id',
    width: '5%',
    label: 'ID',
    slotName: 'id',
  },

  {
    key: 'name',
    width: '10%',
    label: '頻道名稱',
  },
  {
    key: 'song',
    width: '10%',
    label: '歌曲名稱',
  },
  {
    key: 'imageUrl',
    width: '10%',
    label: '圖片',
    slotName: 'imageUrl',
  },
  {
    key: 'listened',
    width: '5%',
    label: '聆聽狀態',
    slotName: 'listened',
  },
  {
    key: 'action',
    width: '15%',
    label: '操作',
    slotName: 'action',
  },
]

const newAddProduct = ref({ name: '', song: '', imageUrl: '', link: '' })
const newItem = ref(false)
const addNewItem = () => {
  newItem.value = true
}

const confirmEdit = async () => {
  const sendData = {
    name: newAddProduct.value.name,
    song: newAddProduct.value.song,
    imageUrl: newAddProduct.value.imageUrl,
    link: newAddProduct.value.link,
  }
  if (!newAddProduct.value.id) {
    await relaxStore.addRelaxItem({
      id: String(new Date().getTime()), //unix timestamp
      listened: false,
      ...sendData,
    })
  } else {
    // 比對資料id
    const index = relaxStore.listData.findIndex(
      (item) => String(item.id) === String(newAddProduct.value.id),
    )
    console.log('要更新的 ID:', newAddProduct.value.id)
    console.log('listData:', relaxStore.listData)
    console.log('找到的 index:', index)
    if (index !== -1) {
      const response = await relaxStore.updateRelaxItem(newAddProduct.value.id, sendData)
      if (response) {
        relaxStore.listData.splice(index, 1, response.data)
      }
    }
  }
  newAddProduct.value = { name: '', song: '', imageUrl: '', link: '' }
  newItem.value = false
}

const cancelEdit = () => {
  newAddProduct.value = { name: '', song: '', imageUrl: '', link: '' }
  newItem.value = false
}

const deleteItem = async (item) => {
  if (!item.id) {
    console.error('產品 ID 不存在')
    return
  }
  console.log('傳入的 item.id:', item.id, '型別:', typeof item.id)
  // 比對資料id
  const index = relaxStore.listData.findIndex((data) => String(data.id) === String(item.id))
  console.log('要刪除的 ID:', item.id)
  console.log('listData:', relaxStore.listData)
  console.log('找到的 index:', index)
  if (index !== -1) {
    const response = await relaxStore.deleteRelaxItem(item.id)
    if (response) {
      console.log('刪除成功，更新顯示狀態')
    } else {
      console.log('刪除失敗')
    }
  }
}

const editItem = (clickedItem) => {
  Object.assign(newAddProduct.value, clickedItem)
  newItem.value = true
}

onMounted(async () => {
  await relaxStore.fetchListData()
})
</script>

<style scoped land="scss">
.form-wrap {
  margin-bottom: 1rem;
}

.form {
  margin: 16px 0;
  width: 100%;
  display: flex;
  justify-content: space-between;

  .item-wrap {
    display: flex;
    .item {
      margin-bottom: 20px;
      margin-right: 12px;
      label {
        display: block;
        margin-bottom: 4px;
      }
      input {
        display: block;
        padding: 12px;
        width: 100%;
        border: 1px solid #ccc;
        border-radius: 5px;
      }
    }
    .input-wrap {
      display: flex;
    }
  }

  .form-label {
    font-size: 16px;
    font-weight: bold;
    margin-right: 8px;
    display: inline-block;
    color: #3b3b3b;
  }
}

.img-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    display: block;
    width: 240px;
    height: auto;
  }
}

.img-area {
  width: 180px;
  height: 100px;
  margin: 0 24px;
  background-color: #f2f2f2;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  .img-fluid {
    height: auto;
    object-fit: cover;
    display: block;
    width: 180px;
    border-radius: 5px;
  }
}

.flow-area {
  overflow-y: auto;
  height: 550px;
}

.btn-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  flex-direction: column;
}
</style>
