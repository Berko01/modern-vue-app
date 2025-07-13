<template>
  <div>
    <h3>Product List</h3>
    <table class="table table-bordered mt-3">
      <thead>
        <tr>
          <th>Ürün Adı</th>
          <th>Açıklama</th>
          <th>Fiyat (₺)</th>
          <th>Stok</th>
          <th>İşlem</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in localProducts" :key="product.id">
          <td>
            <input v-if="product.isEditing" v-model="product.productName" class="form-control" />
            <span v-else>{{ product.productName }}</span>
          </td>
          <td>
            <input v-if="product.isEditing" v-model="product.quantityPerUnit" class="form-control" />
            <span v-else>{{ product.quantityPerUnit }}</span>
          </td>
          <td>
            <input v-if="product.isEditing" v-model.number="product.unitPrice" type="number" class="form-control" />
            <span v-else>{{ product.unitPrice }}</span>
          </td>
          <td>
            <input v-if="product.isEditing" v-model.number="product.unitsInStock" type="number" class="form-control" />
            <span v-else>{{ product.unitsInStock }}</span>
          </td>
          <td>
            <button
              class="btn btn-sm"
              :class="product.isEditing ? 'btn-success me-2' : 'btn-warning me-2'"
              @click="toggleEdit(product)"
            >
              {{ product.isEditing ? 'Kaydet' : 'Güncelle' }}
            </button>
            <button class="btn btn-danger btn-sm" @click="deleteProduct(product.id)">
              Sil
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, watchEffect, toRaw } from 'vue'
import { useProductStore } from '@/stores/productStore'
import { storeToRefs } from 'pinia'
import { useToast } from 'vue-toastification'

const toast = useToast()
const productStore = useProductStore()
const { products } = storeToRefs(productStore)

const localProducts = ref([])

watchEffect(() => {
  localProducts.value = products.value.map(p => ({ ...p, isEditing: false }))
})

async function toggleEdit(product) {
  if (product.isEditing) {
    try {
      await productStore.updateProduct(toRaw(product))
      toast.success('Güncellendi!')
    } catch {
      toast.error('Güncelleme hatası!')
    }
    product.isEditing = false
  } else {
    localProducts.value.forEach(p => {
      p.isEditing = p.id === product.id
    })
  }
}

async function deleteProduct(id) {
  try {
    await productStore.deleteProduct(id)
    toast.success('Ürün silindi!')
  } catch {
    toast.error('Silme hatası!')
  }
}
</script>

<style scoped>
input {
  width: 100%;
}
</style>
