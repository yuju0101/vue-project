import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useRelaxStore = defineStore('relax', () => {
  const listData = ref([])
  const isLoading = ref(false)
  const error = ref(null)
  const apiUrl = 'http://localhost:3000'

  // GET 獲得所有資料
  const fetchListData = async () => {
    isLoading.value = true
    error.value = null
    try {
      const fetchDataUrl = `${apiUrl}/relax`
      const response = await fetch(fetchDataUrl)
      const result = await response.json()
      listData.value = Array.isArray(result.data) ? result.data : []
    } catch (error) {
      error.value = '無法獲取數據'
      console.error('獲取資料失敗:', error)
    } finally {
      isLoading.value = false
    }
  }

  // GET 透過 id 查單筆資料
  const fetchItemById = async (id) => {
    isLoading.value = true
    let item = listData.value.find((item) => item.id === Number(id))
    if (!item) {
      try {
        const response = await axios.get(`${apiUrl}/relax/${id}`)
        item = response.data
      } catch (error) {
        console.error('無法獲取單筆資料:', error)
      } finally {
        isLoading.value = false
      }
    }
    return item || null
  }

  // PUT 修改資料
  const updateRelaxItem = async (id, updatedData) => {
    try {
      const response = await axios.put(`${apiUrl}/relax/${id}`, updatedData)
      const index = listData.value.findIndex((item) => item.id === id)
      if (index !== -1) {
        listData.value[index] = response.data.data
      }
      console.log('更新成功:', response.data)
      return response.data
    } catch (error) {
      console.error('修改資料失敗', error)
    }
  }

  // POST 新增資料
  const addRelaxItem = async (newItem) => {
    try {
      const response = await axios.post(`${apiUrl}/relax`, newItem)
      listData.value.push(response.data.data)
      return response.data
    } catch (error) {
      console.error('新增失敗:', error)
      return null
    }
  }

  // DELETE 刪除資料
  const deleteRelaxItem = async (id) => {
    try {
      const response = await axios.delete(`${apiUrl}/relax/${id}`)
      const index = listData.value.findIndex((item) => item.id === id)
      if (index !== -1) {
        listData.value.splice(index, 1)
      }
      console.log('刪除成功:', response.data)
      return response.data
    } catch (error) {
      console.error('刪除失敗:', error)
      return null
    }
  }

  // 需露出的變數
  return {
    listData,
    isLoading,
    error,
    fetchListData,
    fetchItemById,
    updateRelaxItem,
    addRelaxItem,
    deleteRelaxItem,
  }
})
