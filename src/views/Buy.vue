<script>
export default {
  name: 'Buy',
  data() {
    return {
      products: [
        {
          id: 1,
          title: 'FLWOT01 IS-7 Granite Premium Edition - 1/30th Scale',
          image: 'https://picsum.photos/id/81/300/300',
          seller: 'chokoroko',
          sellerImage: 'https://picsum.photos/id/81/300/300'
        },
        {
          id: 2,
          title: 'Pash! 2025년 3월호 아크릴 블록 포함 세트',
          image: 'https://picsum.photos/id/82/300/300',
          seller: 'sidyk',
          sellerImage: 'https://picsum.photos/id/82/300/300'
        },
        // 추가 상품 데이터
      ]
    }
  }
}
</script>

<template>
  <div class="buy-page">
    <!-- 페이지 헤더 -->
    <div class="page-header">
      <h1>사줘요</h1>
      <p class="header-subtitle">내가 원하는 아이템<br>타우니가 대신 사줘요.</p>

      <!-- 프로모션 배너 -->
      <div class="promotion-banner">
        <img src="https://picsum.photos/id/83/300/300" alt="프로모션" />
      </div>
    </div>

    <!-- 카테고리 필터 -->
    <div class="category-filter">
      <div class="filter-buttons">
        <button class="filter-btn active">
          <span class="icon">≡</span>
          카테고리
        </button>
        <button class="filter-btn">
          <span class="icon">☆</span>
          태그
        </button>
        <button class="filter-btn">
          <span class="icon">⊕</span>
          글쓰기선택
        </button>
      </div>

      <!-- 카테고리 태그 목록 -->
      <div class="tag-list">
        <button class="tag-btn">전자/가전</button>
        <button class="tag-btn">패션/잡화</button>
        <button class="tag-btn">아웃도어</button>
        <button class="tag-btn">뷰티/백화점</button>
        <button class="tag-btn">한국/해외여</button>
        <button class="tag-btn">음반/도서</button>
        <button class="tag-btn">패티권</button>
        <button class="tag-btn">식품</button>
        <button class="tag-btn">주방</button>
      </div>

      <!-- 서브 카테고리 -->
      <div class="sub-categories">
        <button class="tag-btn">자동차용품</button>
        <button class="tag-btn">취미/생활</button>
      </div>
    </div>

    <!-- 상품 목록 -->
    <div class="products-grid">
      <article v-for="product in products" :key="product.id" class="product-card">
        <div class="product-image">
          <img :src="product.image" :alt="product.title">
          <button class="like-button">❤</button>
        </div>
        <div class="product-info">
          <h3 class="product-title">{{ product.title }}</h3>
          <p class="product-price">견적 1건</p>
          <div class="seller-info">
            <img :src="product.sellerImage" alt="판매자" class="seller-image">
            <span class="seller-name">{{ product.seller }}</span>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<style scoped>
.buy-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.page-header {
  margin-bottom: 2rem;
}

.page-header h1 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.header-subtitle {
  font-size: 2rem;
  font-weight: bold;
  line-height: 1.4;
  margin-bottom: 2rem;
}

.promotion-banner {
  width: 100%;
  margin-bottom: 2rem;
}

.promotion-banner img {
  width: 100%;
  border-radius: 1rem;
}

.category-filter {
  margin-bottom: 2rem;
}

.filter-buttons {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.filter-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 2rem;
  background: white;
  cursor: pointer;
}

.filter-btn.active {
  background: #000;
  color: white;
}

.tag-list, .sub-categories {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.tag-btn {
  padding: 0.5rem 1rem;
  border: none;
  background: none;
  cursor: pointer;
  color: #666;
}

.tag-btn:hover {
  color: #000;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}

.product-card {
  position: relative;
}

.product-image {
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.like-button {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #fff;
}

.product-info {
  padding: 0.5rem;
}

.product-title {
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.product-price {
  color: #666;
  margin-bottom: 0.5rem;
}

.seller-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.seller-image {
  width: 24px;
  height: 24px;
  border-radius: 50%;
}

.seller-name {
  font-size: 0.9rem;
  color: #666;
}
</style>