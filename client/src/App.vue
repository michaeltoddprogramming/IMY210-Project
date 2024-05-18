<!-- Michael Todd u23540223 -->
<template>
  <div id="app">
    <Nav />
    <router-view/>
  </div>
</template>

<script>
import Nav from './components/Nav.vue'

export default {
  components: {
    Nav
  }
}
</script>

