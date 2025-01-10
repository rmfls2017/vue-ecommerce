<template>
  <div class="app">
    <HeaderComponent />
    <MainContent />
    <FooterComponent />
  </div>
</template>

<script>
import HeaderComponent from './components/HeaderComponent.vue'
import MainContent from './components/MainContent.vue'
import FooterComponent from './components/FooterComponent.vue'

export default {
  name: 'App',
  components: {
    HeaderComponent,
    MainContent,
    FooterComponent
  },
  mounted() {
    this.$gtm.logPageView('Home', window.location.pathname)
  }
}
</script>

<style>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>