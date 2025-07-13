import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:3000'
})

export const getProducts = () => API.get('/products')
export const addProduct = (product) => API.post('/products', product)
export const updateProduct = (product) => API.put(`/products/${product.id}`, product)
export const deleteProduct = (id) => API.delete(`/products/${id}`)
