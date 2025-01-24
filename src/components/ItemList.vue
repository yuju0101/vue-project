<template>
  <div class="list-wrap">
    <!-- title area -->
    <section>
      <Title>
        放鬆列表
        <template #subtitle> 雙手張開的距離才是我需要在乎的 </template>
        <template #btns>
          <IconBlock :icon="['fas', 'magnifying-glass']" />
          <IconBlock :icon="['fas', 'circle-info']" />
        </template>
      </Title>
    </section>

    <!-- add area -->
    <section class="form-wrap">
      <button type="button" class="button" @click="addNewItem">新增產品</button>
      <form v-if="newItem">
        <div class="item-wrap">
          <div class="item">
            <label for="name" class="form-label">產品名稱</label>
            <input
              type="text"
              id="name"
              class="form-control"
              placeholder="請輸入產品名稱"
              v-model="newAddProduct.name"
            />
          </div>
          <div class="item input-wrap">
            <div>
              <label for="productImage" class="form-label">產品圖片</label>
              <input
                type="text"
                id="productImage"
                class="form-control"
                placeholder="請輸入產品圖片"
                v-model="newAddProduct.imageUrl"
              />
            </div>
            <div class="img-area">
              <img :src="newAddProduct.imageUrl" class="img-fluid" />
            </div>
          </div>
        </div>
        <div class="button-wrap">
          <button type="button" class="button" @click="confirmEdit">更新</button>
          <button type="button" class="button" @click="cancelEdit">取消</button>
        </div>
      </form>
    </section>

    <!-- list area -->
    <section class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>產品名稱</th>
            <th>產品圖片</th>
            <th>存貨狀態</th>
            <th>操作</th>
          </tr>
          <tr v-for="(item, idx) in newProducts" key="idx">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td class="img-wrap">
              <img :src="item.imageUrl" class="img-fluid" :alt="item.name" />
            </td>
            <td>{{ item.onStock ? '缺貨' : '有貨' }}</td>
            <td><button type="button" class="button" @click="editItem(item)">修改</button></td>
          </tr>
        </thead>
      </table>
    </section>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import Title from './Title.vue'
import IconBlock from './atoms/iconBlock.vue'
const newProducts = ref([])
const products = [
  {
    id: '1',
    imageUrl:
      'https://images.unsplash.com/photo-1516906571665-49af58989c4e?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=300&q=80',
    name: 'MacBook Pro',
    onStock: false,
  },
  {
    id: '2',
    imageUrl:
      'https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    name: 'iPhone',
    onStock: false,
  },
]

const fetchOriginData = () => {
  newProducts.value.push(...products)
}

const newAddProduct = ref({
  name: '',
  imageUrl: '',
})

const newItem = ref(false)
const addNewItem = () => {
  newItem.value = true
}

const confirmEdit = () => {
  if (!newAddProduct.value.id) {
    const data = {
      id: new Date().getTime(), //unix timestamp
      imageUrl: newAddProduct.value.imageUrl,
      name: newAddProduct.value.name,
      onStock: false,
    }
    newProducts.value.push(data)
  } else {
    console.log('same')
    // 比對資料id
    newProducts.value.forEach((item, index) => {
      if (item.id === newAddProduct.value.id) {
        newProducts.value[index] = { ...newAddProduct.value }
      }
    })
  }
  newAddProduct.value = {}
  newItem.value = false
}

const cancelEdit = () => {
  newAddProduct.value = {}
  newItem.value = false
}

const editItem = (cilckedItem) => {
  console.log(cilckedItem)
  newAddProduct.value = { ...cilckedItem }
  console.log('newAddProduct', newAddProduct.value)
  console.log('newProducts', newProducts.value)
  newItem.value = true
}

onMounted(() => {
  fetchOriginData()
})
</script>

<style scoped land="scss">
.list-wrap {
  padding: 1.5rem 2rem;
  width: 100%;
}

table {
  width: 100%;
  th,
  td {
    text-align: left;
  }
}

.form-wrap {
  margin-bottom: 1rem;
}

form {
  margin: 16px 0;
  width: 100%;
  display: flex;
  justify-content: space-between;

  .item-wrap {
    display: flex;
    .item {
      margin-bottom: 20px;
      margin-right: 40px;
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
.button {
  color: #6272c3;
  background-color: #eff3fc;
  border: 1.5px solid #f4f4f4;
  font-weight: bold;
  border: none;
  padding: 10px 20px;
  border-radius: 10px;
  display: inline-block;
  height: fit-content;
  font-size: 16px;
}
.img-fluid {
  height: auto;
  object-fit: cover;
  display: block;
  width: 300px;
  border-radius: 5px;
}

.img-area {
  width: auto;
  height: 200px;
  margin: 0 24px;
  background-color: #f2f2f2;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
}

.button-wrap {
  display: flex;
  flex-direction: column;
  .button {
    margin-bottom: 16px;
  }
}

/* /// */
.header-icon {
  margin-right: 8px;
  background-color: #eff3fc;
  padding: 8px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
}
</style>
