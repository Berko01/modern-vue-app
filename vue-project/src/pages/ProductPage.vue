<template>
  <div class="container mt-5">
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
import ProductAdd from '@/components/ProductAdd.vue'
import ProductList from '@/components/ProductList.vue'
import {
  getProducts,
  addProduct as apiAddProduct,
  updateProduct as apiUpdateProduct,
  deleteProduct as apiDeleteProduct
} from '@/services/productService'

const toast = useToast()
const products = ref([])

onMounted(async () => {
  try {
    const { data } = await getProducts()
    products.value = data
  } catch {
    toast.error('Ürünler yüklenemedi!')
  }
})

async function addProduct(newProduct) {
  try {
    const { data } = await apiAddProduct(newProduct)
    products.value.push(data)
    toast.success('Ürün eklendi!')
  } catch {
    toast.error('Ekleme başarısız!')
  }
}

async function deleteProduct(id) {
  try {
    await apiDeleteProduct(id)
    products.value = products.value.filter(p => p.id !== id)
    toast.success('Ürün silindi!')
  } catch {
    toast.error('Silme başarısız!')
  }
}

async function saveProduct(product) {
  try {
    const { data } = await apiUpdateProduct(product)
    const index = products.value.findIndex(p => p.id === data.id)
    if (index !== -1) products.value[index] = data
    toast.success('Ürün güncellendi!')
  } catch {
    toast.error('Güncelleme hatası!')
  }
}
</script>
