<template>
  <div class="container mt-5">
    <ProductAdd @add-product="addProduct" />
    <ProductList
      :products="productStore.products"
      @delete-product="deleteProduct"
      @save-product="saveProduct"
    />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import ProductAdd from '@/components/ProductAdd.vue'
import ProductList from '@/components/ProductList.vue'
import { useProductStore } from '@/stores/productStore'

const toast = useToast()
const productStore = useProductStore()

onMounted(async () => {
  try {
    await productStore.fetchProducts()
  } catch {
    toast.error('Ürünler yüklenemedi!')
  }
})

async function addProduct(newProduct) {
  try {
    await productStore.addProduct(newProduct)
    toast.success('Ürün eklendi!')
  } catch {
    toast.error('Ekleme başarısız!')
  }
}

async function deleteProduct(id) {
  try {
    await productStore.deleteProduct(id)
    toast.success('Ürün silindi!')
  } catch {
    toast.error('Silme başarısız!')
  }
}

async function saveProduct(product) {
  try {
    await productStore.updateProduct(product)
    toast.success('Ürün güncellendi!')
  } catch {
    toast.error('Güncelleme hatası!')
  }
}
</script>
