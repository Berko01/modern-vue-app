<template>
  <div class="card mt-4">
    <div class="card-header">
      <h5>Yeni Ürün Ekle</h5>
    </div>
    <div class="card-body">
      <form @submit.prevent="addNewProduct">
        <div class="mb-3">
          <label class="form-label">Ürün Adı</label>
          <input v-model="product.productName" type="text" class="form-control" required />
        </div>
        <div class="mb-3">
          <label class="form-label">Açıklama</label>
          <input v-model="product.quantityPerUnit" type="text" class="form-control" required />
        </div>
        <div class="mb-3">
          <label class="form-label">Fiyat (₺)</label>
          <input v-model.number="product.unitPrice" type="number" class="form-control" required />
        </div>
        <div class="mb-3">
          <label class="form-label">Stok</label>
          <input v-model.number="product.unitsInStock" type="number" class="form-control" required />
        </div>
        <button type="submit" class="btn btn-primary">Ekle</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const emit = defineEmits(['add-product'])

const product = reactive({
  id: null,
  categoryId: 0,
  productName: '',
  quantityPerUnit: '',
  unitPrice: 0,
  unitsInStock: 0
})

function resetForm() {
  product.productName = ''
  product.quantityPerUnit = ''
  product.unitPrice = 0
  product.unitsInStock = 0
}

function addNewProduct() {
  emit('add-product', { ...product })
  resetForm()
}
</script>
