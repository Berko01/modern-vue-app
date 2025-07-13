import axios from 'axios'

const BASE_URL = 'http://localhost:3000/products'

export const getProducts = () => axios.get(BASE_URL)

export const addProduct = (product) => axios.post(BASE_URL, product)

export const updateProduct = (product) => axios.put(`${BASE_URL}/${product.id}`, product)

export const deleteProduct = (id) => axios.delete(`${BASE_URL}/${id}`)
