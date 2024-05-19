<!-- Michael Todd u23540223 -->
<template>
  <div id="app">
    <Nav />
    <router-view/>
    <Footer />
  </div>
</template>

<script>
import Footer from './components/footer.vue';
import Nav from './components/Nav.vue'

export default {
  components: {
    Nav,
    Footer
  }
}
</script>

