<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required>
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login() {
      axios.post('http://localhost:3002/login', { email: this.email, password: this.password })
        .then(response => {
          if (response.data.success) {
            this.$router.push('/home');
          } else {
            alert('Invalid credentials');
          }
        })
        .catch(error => {
          console.error(error);
          alert('An error occurred');
        });
    }
  }
}
</script>