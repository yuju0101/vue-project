import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useEstimateStore = defineStore('estimate', () => {
  const tableData = ref([])
  const isLoading = ref(false)
  const error = ref(null)
  const apiUrl = 'http://localhost:3000'

  const fetchTableData = async () => {
    isLoading.value = true
    error.value = null
    try {
      const fetchDataUrl = `${apiUrl}/estimates`
      const response = await fetch(fetchDataUrl)
      const result = await response.json()
      tableData.value = result.data
    } catch (err) {
      error.value = '無法獲取數據'
    } finally {
      isLoading.value = false
    }
  }

  return { tableData, fetchTableData, isLoading, error }
})
