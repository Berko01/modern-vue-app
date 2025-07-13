import { defineStore } from 'pinia'
import {
  getProducts,
  addProduct as apiAddProduct,
  updateProduct as apiUpdateProduct,
  deleteProduct as apiDeleteProduct
} from '@/services/productService'

export const useProductStore = defineStore('product', {
  state: () => ({
    products: []
  }),

  actions: {
    async fetchProducts() {
      try {
        const { data } = await getProducts()
        this.products = data
      } catch (error) {
        console.error('Ürünler yüklenemedi:', error)
        throw error
      }
    },

    async addProduct(product) {
      try {
        const { data } = await apiAddProduct(product)
        this.products.push(data)
      } catch (error) {
        console.error('Ürün ekleme hatası:', error)
        throw error
      }
    },

    async updateProduct(product) {
      try {
        const { data } = await apiUpdateProduct(product)
        const index = this.products.findIndex(p => p.id === product.id)
        if (index !== -1) this.products[index] = data
      } catch (error) {
        console.error('Güncelleme hatası:', error)
        throw error
      }
    },

    async deleteProduct(id) {
      try {
        await apiDeleteProduct(id)
        this.products = this.products.filter(p => p.id !== id)
      } catch (error) {
        console.error('Silme hatası:', error)
        throw error
      }
    }
  }
})
