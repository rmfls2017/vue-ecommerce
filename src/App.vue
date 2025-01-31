<template>
  <HeaderComponent />
  <main class="main-content">
    <router-view></router-view>
  </main>
  <FooterComponent />
</template>

<script>
import HeaderComponent from './components/HeaderComponent.vue'
import FooterComponent from "@/components/FooterComponent.vue";

export default {
  name: 'App',
  components: {
    FooterComponent,
    HeaderComponent
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.main-content {
  margin-top: 70px; /* 헤더의 높이만큼 여백 추가 */
  min-height: calc(100vh - 70px);
}
</style>