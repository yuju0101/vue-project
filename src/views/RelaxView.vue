<template>
  <div class="container">
    <!-- title area -->
    <section>
      <Title>
        放鬆列表
        <template #subtitle> 聽音樂來場適當的放鬆 </template>
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
            <label for="name" class="form-label">藝人</label>
            <input
              type="text"
              id="name"
              class="form-control"
              placeholder="請輸入藝人名稱"
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
          <div class="item input-wrap">
            <div>
              <label for="productImage" class="form-label">專輯圖片</label>
              <input
                type="text"
                id="productImage"
                class="form-control"
                placeholder="請輸入專輯圖片"
                v-model="newAddProduct.imageUrl"
              />
            </div>
            <div class="img-area" v-if="newAddProduct.imageUrl">
              <img :src="newAddProduct.imageUrl" class="img-fluid" />
            </div>
          </div>
        </div>
        <div class="button-wrap">
          <FilledButton @click="confirmEdit" class="button">更新</FilledButton>
          <FilledButton @click="cancelEdit">取消</FilledButton>
        </div>
      </div>
    </section>

    <!-- list area -->
    <section class="flow-area">
      <Table :tableHeaders="tableHeaders" :tableData="newProducts">
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
          </div>
        </template>
      </Table>
    </section>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

// components
import Title from '@/components/Title.vue'
import Table from '@/components/atoms/Table.vue'
import IconBlock from '@/components/atoms/IconBlock.vue'
import FilledButton from '@/components/atoms/FilledButton.vue'

const newProducts = ref([])
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
    label: '藝人',
  },
  {
    key: 'song',
    width: '10%',
    label: '歌曲名稱',
  },
  {
    key: 'imageUrl',
    width: '10%',
    label: '專輯圖片',
    slotName: 'imageUrl',
  },
  {
    key: 'listened',
    width: '10%',
    label: '聆聽狀態',
    slotName: 'listened',
  },
  {
    key: 'action',
    width: '10%',
    label: '操作',
    slotName: 'action',
  },
]
const products = ref([
  {
    id: '1',
    imageUrl:
      'https://lh3.googleusercontent.com/gT--ZwubK3mlhw5WcwBReN9QSJpzLzZntA20Js3XxTeX4CZXa-OEq89tmrwJugV97U5GJTtKS4ofzpV2mQ=w544-h544-l90-rj',
    name: 'Lee Jin Ah',
    song: 'Starry Night',
    listened: false,
  },
  {
    id: '2',
    imageUrl:
      'https://lh3.googleusercontent.com/kiU4wpUCReZaSxlujjo8Ye-wN37aYR3gjkNoNEriU1G-sbV4Y1dmS9a5HWRD8JP0yv08lfSvWHe3ykZP=w544-h544-l90-rj',
    name: 'Choi Yu Ree',
    song: '숲',
    listened: true,
  },
  {
    id: '3',
    imageUrl:
      'https://lh3.googleusercontent.com/6NCf4gce8p3kug3e-I7u8HfObnCdaLi5ranbyxVh9iPBXVTda1xckbvWK7IZnxZTczfqLLrB8bV2Lvo=w544-h544-l90-rj',
    name: 'OOHYO',
    song: 'Teddy Bear Rises',
    listened: false,
  },
  {
    id: '4',
    imageUrl:
      'https://lh3.googleusercontent.com/Hbbh7Jzq88QYWaxBC-5wTFngYiLp-i5BM49BSMBMo-zZ2c0o7Wd9QO6TcEJe4k5U2CvOOn8yBYU5ywE=w544-h544-l90-rj',
    name: '鮮于貞娥',
    song: 'Run with Me',
    listened: true,
  },
])

const fetchOriginData = () => {
  newProducts.value = [...products.value]
}

const newAddProduct = ref({ name: '', song: '', imageUrl: '' })
const newItem = ref(false)
const addNewItem = () => {
  newItem.value = true
}

const confirmEdit = () => {
  if (!newAddProduct.value.id) {
    newProducts.value.push({
      id: new Date().getTime(), //unix timestamp
      imageUrl: newAddProduct.value.imageUrl,
      name: newAddProduct.value.name,
      song: newAddProduct.value.song,
      listened: false,
    })
  } else {
    // 比對資料id
    const index = newProducts.value.findIndex((item) => item.id === newAddProduct.value.id)
    if (index !== -1) {
      newProducts.value.splice(index, 1, { ...newAddProduct.value })
    }
  }
  newAddProduct.value = { name: '', song: '', imageUrl: '' }
  newItem.value = false
}

const cancelEdit = () => {
  newAddProduct.value = { name: '', song: '', imageUrl: '' }
  newItem.value = false
}

const editItem = (clickedItem) => {
  Object.assign(newAddProduct.value, clickedItem)
  newItem.value = true
}

onMounted(() => {
  fetchOriginData()
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
  width: 100px;
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
    width: 100px;
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
}

.button-wrap {
  display: flex;
  gap: 0.5rem;
  .button {
    margin-bottom: 16px;
  }
}
</style>
