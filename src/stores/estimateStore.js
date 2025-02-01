import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useEstimateStore = defineStore('estimate', () => {
  const tableData = ref([])
  const isLoading = ref(false)
  const error = ref(null)
  const apiUrl = 'http://localhost:3000'

  // 獲得所有資料
  const fetchTableData = async () => {
    isLoading.value = true
    error.value = null
    try {
      const fetchDataUrl = `${apiUrl}/estimates`
      const response = await fetch(fetchDataUrl)
      const result = await response.json()
      // [不使用] tableData.value = result.data
      // 當 API 出錯避免畫面當掉，tableData 可為空陣列
      tableData.value = Array.isArray(result.data) ? result.data : []
    } catch (error) {
      error.value = '無法獲取數據'
      console.error('獲取資料失敗:', error)
    } finally {
      isLoading.value = false
    }
  }

  // 透過 id 查單筆資料
  const fetchItemById = async (id) => {
    isLoading.value = true
    let item = tableData.value.find((item) => item.id === Number(id))
    if (!item) {
      // 如果資料不存在，請求 API
      try {
        const response = await axios.get(`${apiUrl}/estimates/${id}`)
        item = response.data
      } catch (error) {
        console.error('無法獲取單筆資料:', error)
      } finally {
        isLoading.value = false
      }
    }
    return item || null
  }

  // 需露出的變數
  return { tableData, fetchTableData, isLoading, error, fetchItemById }
})
