<!-- Michael Todd u23540223 -->

<template>
  <div class="container">
    <h1 class="display-4 text-center my-5">Stores</h1>
    <p v-if="error" class="alert alert-danger">{{ error }}</p>
    <p v-if="success" class="alert alert-success">{{ success }}</p>
    <div id="accordion">
      <div v-for="(store, index) in stores" :key="store.store.$.id" class="card mb-4">
        <div class="card-header" :id="'heading' + index">
          <h5 class="mb-0">
            <button class="btn btn-link dropdown-toggle" @click="toggle(index)" :aria-expanded="activeIndex === index" :aria-controls="'collapse' + index">
              {{ store.store.information[0].name[0] }}
            </button>
          </h5>
        </div>
        <div :id="'collapse' + index" class="collapse" :class="{ show: activeIndex === index }" :aria-labelledby="'heading' + index" data-parent="#accordion">
          <div class="card-body">
            <p class="card-text">{{ store.store.information[0].description[0] }}</p>
            <h3 class="h5">Owner: {{ store.store.information[0].owner[0]._ }}</h3>
            <div v-for="product in store.store.products[0].product" :key="product.$.id" class="card mt-3">
              <div class="card-body">
                <h4 class="card-title">{{ product.title[0] }}</h4>
                <p class="card-text">{{ product.description[0] }}</p>
                <p>Edition: {{ product.edition }}</p>
                <p>Author: {{ product.author[0] }}</p>
                <p>ISBN: {{ product.isbn[0] }}</p>
                <p>SKU: {{ product.sku[0] }}</p>
                <p>Availability: {{ product.availability[0] }}</p>
                <p>Condition: {{ product.condition[0] }}</p>
                <img :src="product.image[0]" alt="Product image" class="img-fluid">
                <button @click="addToCart(product.$.id)" class="btn btn-primary">Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'

export default {
  setup() {
    const stores = ref([])
    const error = ref(null)
    const success = ref(null)
    const activeIndex = ref(null)

    async function fetchStores() {
      try {
        const response = await fetch('http://localhost:3002/stores')
        if (!response.ok) {
          const data = await response.json()
          error.value = data.message
          return
        }
        stores.value = await response.json()
        success.value = 'You are logged in!'
      } catch (err) {
        error.value = err.message
      }
    }

    function toggle(index) {
      if (activeIndex.value === index) {
        activeIndex.value = null
      } else {
        activeIndex.value = index
      }
    }

    async function addToCart(productId) {
      try {
        const userId = '22ac010f-fbd3-4cb3-9584-60bdc517efd1'
        const response = await axios.post(`http://localhost:3002/add-to-cart/${productId}`, { userId })
        if (response.status === 200) {
          success.value = 'Product added to cart successfully'
        } else {
          error.value = 'Failed to add product to cart'
        }
      } catch (err) {
        error.value = err.message
      }
    }

    onMounted(fetchStores)

    return { stores, error, success, activeIndex, toggle, addToCart }
  }
}
</script>

<style scoped>
.card {
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}

.btn-link.dropdown-toggle {
  cursor: pointer;
  text-decoration: none;
  color: darkolivegreen;
}

.btn-link.dropdown-toggle::after {
  display: inline-block;
  margin-left: .255em;
  vertical-align: .255em;
  content: "";
  border-top: .3em solid;
  border-right: .3em solid transparent;
  border-bottom: 0;
  border-left: .3em solid transparent;
}

</style>