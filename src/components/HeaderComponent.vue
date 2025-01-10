<template>
  <header class="header">
    <nav class="nav-container">
      <div class="logo">
        <h1>eCommerce</h1>
      </div>
      <div class="nav-links">
        <a href="#" class="nav-link">홈</a>
        <a href="#" class="nav-link">카테고리</a>
        <a href="#" class="nav-link">장바구니</a>
        <a href="#" class="nav-link">마이페이지</a>
      </div>
    </nav>
  </header>
</template>

<script>
  export default {
    name: "HeaderComponent",
  }
</script>

<style scoped>
.header {
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 1rem;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-link {
  text-decoration: none;
  color: #333;
  font-weight: 500;
}

.nav-link:hover {
  color: #007bff;
}
</style>