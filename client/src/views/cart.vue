<!-- Michael Todd u23540223 -->


<template>
  <div>
    <h1>Cart Page</h1>
    <ul>
      <li v-for="(item, index) in cartItems" :key="index">
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Cart',
  data() {
    return {
      cartItems: [],
      userId: localStorage.getItem('userId') || '', // GRAB ID FROM LOCAL STORAGE
    };
  },
 methods: {
  fetchCartItems() {
    if (!this.userId) {
      console.error('No user ID found');
      return;
    }
    axios.get(`http://localhost:5173/cart/${this.userId}`)
      .then(response => {
        this.cartItems = response.data.cart;
      })
      .catch(error => {
        console.error('Error fetching cart items:', error);
      });
  },



    setUserId(userId) {
      this.userId = userId;
      localStorage.setItem('userId', userId);
    },
  },
  mounted() {
    this.fetchCartItems();
  },
}
</script>