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
            <button class="btn btn-danger btn-sm" @click="$emit('delete-product', product.id)">
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

const props = defineProps({
  products: Array
})

const emit = defineEmits(['delete-product', 'save-product'])

const localProducts = ref([])

watchEffect(() => {
  localProducts.value = props.products.map(p => ({ ...p, isEditing: false }))
})

function toggleEdit(product) {
  if (product.isEditing) {
    emit('save-product', toRaw(product))
    product.isEditing = false
  } else {
    localProducts.value.forEach(p => {
      p.isEditing = p.id === product.id
    })
  }
}
</script>
