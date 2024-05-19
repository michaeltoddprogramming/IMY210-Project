<!-- Michael Todd u23540223 -->

<template>
  <div>
    <h1>Create a Store</h1>
    <form @submit.prevent="createStore">
      <div>
        <label for="name">Store Name:</label>
        <input id="name" v-model="name" required>
      </div>
      <div>
        <label for="description">Store Description:</label>
        <textarea id="description" v-model="description" required></textarea>
      </div>
      <button type="submit">Create Store</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      name: '',
      description: ''
    };
  },
  methods: {
    createStore() {
      axios.post('http://localhost:3002/create', {
        name: this.name,
        description: this.description
      })
      .then(response => {
        if (response.data.success) {
          alert('Store created successfully');
          this.name = '';
          this.description = '';
        } else {
          alert('Failed to create store');
        }
      })
      .catch(error => {
        console.error(error);
        alert('An error occurred while creating the store');
      });
    }
  }
};
</script>