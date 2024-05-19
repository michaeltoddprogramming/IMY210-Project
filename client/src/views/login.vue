<!-- Michael Todd u23540223 -->

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
      password: '',
      errorMessage: ''
    }
  },
  methods: {
    login() {
      axios.post('http://localhost:3002/login', {
        email: this.email,
        password: this.password
      })
      .then(response => {
        if (response.data.success) {
          localStorage.setItem('userId', response.data.userId);
          this.$router.push('/home');
        } else {
          this.errorMessage = 'Login failed. Please try again.';
        }
      })
      .catch(error => {
        this.errorMessage = 'An error occurred. Please try again.';
      });
    }
  }
}
</script>