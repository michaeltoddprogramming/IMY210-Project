<!-- Michael Todd u23540223 -->

<template>
  <b-navbar toggleable="lg" class="navbar-custom dark info">
    <b-navbar-brand to="/home">Mike's Book Hub</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <router-link to="/home" class="nav-link">Home</router-link>
        <router-link to="/create" class="nav-link">Create</router-link>
        <router-link to="/login" class="nav-link">Login</router-link>
        <router-link to="/register" class="nav-link">Register</router-link>
        <router-link to="/cart" class="nav-link">
          Cart <b-badge variant="light">{{ cartItemCount }}</b-badge>
        </router-link>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Nav',
  data() {
    return {
      cartItemCount: 0
    }
  },
  created() {
    this.getCartItemCount();
  },
  methods: {
    async getCartItemCount() {
      const userId = '22ac010f-fbd3-4cb3-9584-60bdc517efd1';
      try {
        const response = await axios.get(`http://localhost:3002/cart/${userId}`);
        this.cartItemCount = response.data.length;
      } catch (err) {
        console.error(err);
      }
    }
  }
}
</script>  

<style scoped>
  .navbar-custom {
    background-color:  	#8fb6ab; 
    border-bottom: 1px solid #000000; 
  }

  .nav-link {
    color: #ffffff; 
  }

  .nav-link:hover {
    color: #5a6268; 
  }
</style>
  