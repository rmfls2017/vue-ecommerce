<script>
export default {
  name: 'SellPage',
  data() {
    return {
      products: [
        {
          id: 1,
          title: 'NY 캡모자',
          price: '35,000',
          image: 'https://picsum.photos/id/90/300/300',
          seller: 'fashion_seller',
          sellerImage: 'https://picsum.photos/90/100/300/300'
        },
        // 추가 판매 상품 데이터
      ]
    }
  }
}
</script>

<template>
  <div class="sell-page">
    <!-- BuyPage와 유사한 구조지만 "팔아요" 관련 컨텐츠로 변경 -->
    <div class="page-header">
      <h1>팔아요</h1>
      <p class="header-subtitle">내가 가진 아이템<br>타우니에게 팔아요.</p>

      <!-- 프로모션 배너 -->
      <div class="promotion-banner">
        <img src="https://picsum.photos/id/91/300/300" alt="판매 프로모션" />
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

    <!-- 판매 상품 목록 -->
    <div class="products-grid">
      <article v-for="product in products" :key="product.id" class="product-card">
        <div class="product-image">
          <img :src="product.image" :alt="product.title">
          <button class="like-button">❤</button>
          <div class="price-tag">{{ product.price }}원</div>
        </div>
        <div class="product-info">
          <h3 class="product-title">{{ product.title }}</h3>
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
/* BuyPage와 동일한 기본 스타일 유지 */
.sell-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

/* BuyPage의 나머지 스타일과 동일 */
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

/* 추가적인 판매 페이지 전용 스타일 */
.price-tag {
  position: absolute;
  bottom: 0.5rem;
  left: 0.5rem;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.9rem;
}

/* 나머지 스타일은 BuyPage와 동일 */
</style>