<template>
  <div id="app" class="container mt-5">
    <ProductAdd @add-product="addProduct" />
    <ProductList
      :products="products"
      @delete-product="deleteProduct"
      @save-product="saveProduct"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import ProductAdd from './components/ProductAdd.vue'
import ProductList from './components/ProductList.vue'
import {
  getProducts,
  addProduct as apiAddProduct,
  updateProduct as apiUpdateProduct,
  deleteProduct as apiDeleteProduct
} from './services/productService'

const toast = useToast()
const products = ref([])

onMounted(async () => {
  try {
    const response = await getProducts()
    products.value = response.data
  } catch (err) {
    toast.error('Ürünler yüklenemedi!')
  }
})

async function addProduct(newProduct) {
  try {
    const response = await apiAddProduct(newProduct)
    products.value.push(response.data)
    toast.success('Ürün eklendi!')
  } catch (err) {
    toast.error('Ürün eklenemedi!')
  }
}

async function deleteProduct(id) {
  try {
    await apiDeleteProduct(id)
    products.value = products.value.filter(p => p.id !== id)
    toast.success('Ürün silindi!')
  } catch (err) {
    toast.error('Silme hatası!')
  }
}

async function saveProduct(updatedProduct) {
  try {
    const response = await apiUpdateProduct(updatedProduct)
    const index = products.value.findIndex(p => p.id === updatedProduct.id)
    if (index !== -1) {
      products.value[index] = response.data
    }
    toast.success('Ürün güncellendi!')
  } catch (err) {
    toast.error('Güncelleme hatası!')
  }
}
</script>
