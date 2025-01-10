<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-section">
        <h3>고객 서비스</h3>
        <ul>
          <li>고객센터</li>
          <li>배송 안내</li>
          <li>반품/교환 안내</li>
        </ul>
      </div>
      <div class="footer-section">
        <h3>회사 정보</h3>
        <ul>
          <li>회사 소개</li>
          <li>이용약관</li>
          <li>개인정보처리방침</li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2025 eCommerce Platform. All rights reserved.</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterComponent'
}
</script>

<style scoped>
.footer {
  background-color: #333;
  color: #fff;
  padding: 2rem 0;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  padding: 0 1rem;
}

.footer-section h3 {
  margin-bottom: 1rem;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section ul li {
  margin-bottom: 0.5rem;
}

.footer-bottom {
  text-align: center;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #555;
}
</style>