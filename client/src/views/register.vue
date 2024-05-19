<!-- Michael Todd u23540223 -->

<template>
  <div>
    <h2>Register</h2>
    <form @submit.prevent="register">
      <div>
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="name" required>
      </div>
      <div>
        <label for="surname">Surname:</label>
        <input type="text" id="surname" v-model="surname" required>
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required>
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <div>
        <label for="storeOwner">Are you a store owner?</label>
        <input type="checkbox" id="storeOwner" v-model="storeOwner">
      </div>
      <button type="submit">Register</button>
    </form>
    <p v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      name: '',
      surname: '',
      email: '',
      password: '',
      errorMessage: '',
      storeOwner: false
    }
  },
  methods: {
    register() {
      axios.post('http://localhost:3002/register', {
        name: this.name,
        surname: this.surname,
        email: this.email,
        password: this.password,
        storeOwner: this.storeOwner
      })
      .then(response => {
        if (response.data.success) {
          localStorage.setItem('userId', response.data.userId);
          this.$router.push('/home');
        } else {
          this.errorMessage = 'Registration failed. Please try again.';
        }
      })
      .catch(error => {
        this.errorMessage = 'An error occurred. Please try again.';
      });
    }
  }
}
</script>