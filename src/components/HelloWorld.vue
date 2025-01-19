<template>
  <form>
    <div class="item">
      <label for="productName" class="form-label">產品名稱</label>
      <input
        type="text"
        id="productName"
        class="form-control"
        placeholder="請輸入產品名稱"
        v-model="newAddProduct.productName"
      />
    </div>
    <div class="item">
      <img :src="newAddProduct.productImageUrl" class="img-fluid" alt="" />
      <label for="productImage" class="form-label">產品圖片</label>
      <input
        type="text"
        id="productImage"
        class="form-control"
        placeholder="請輸入產品圖片"
        v-model="newAddProduct.productImageUrl"
      />
    </div>
    <button type="button" class="button" @click="confirmEdit">更新</button>
  </form>
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>產品名稱</th>
        <th>產品圖片</th>
        <th>存貨狀態</th>
      </tr>
      <tr v-for="(item, idx) in newProducts" key="idx">
        <td>{{ item.id }}</td>
        <td>{{ item.name }}</td>
        <td><img :src="item.imageUrl" class="img-fluid" alt="item.name " /></td>
        <td>{{ item.onStock ? '缺貨' : '有貨' }}</td>
      </tr>
    </thead>
  </table>
</template>

<script setup>
import { onMounted, ref } from 'vue'
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
  productName: '',
  productImageUrl:
    'https://images.unsplash.com/photo-1602526430780-782d6b1783fa?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
})

const confirmEdit = () => {
  const data = {
    id: new Date().getTime(), //unix timestamp
    imageUrl: newAddProduct.value.productImageUrl,
    name: newAddProduct.value.productName,
    onStock: false,
  }
  newProducts.value.push(data)
  newAddProduct.value.productName = ''
  newAddProduct.value.productImageUrl = ''
}

onMounted(() => {
  fetchOriginData()
})
</script>

<style scoped land="scss">
table {
  width: 100%;
  th,
  td {
    text-align: left;
  }
}

form {
  display: flex;
  margin-top: 0em;
  width: 100%;
  justify-content: space-between;
  align-items: center;

  .item {
    margin-bottom: 20px;
  }

  .form-label {
    font-size: 20px;
    font-weight: bold;
    margin-right: 8px;
    display: inline-block;
  }
}

.button {
  color: #fff;
  background-color: #4663c3;
  border: none;
  padding: 10px 20px;
  border-radius: 10px;
  display: inline-block;
  height: fit-content;
  font-size: 16px;
}
.img-fluid {
  /* max-width: 100%; */
  height: auto;
  object-fit: cover;
  display: block;
  width: 300px;
}
</style>
