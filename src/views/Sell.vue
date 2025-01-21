<script>
import ProductCard from "@/components/ProductCard.vue";
import ProductDetailComponent from "@/components/ProductDetailComponent.vue";

export default {
  name: 'Sell',
  components: {
    ProductCard,
    ProductDetailComponent,
  },
  data() {
    return {
      selectedProduct: null,
      activeFilter: 'category_wrap', // 현재 활성화된 필터
      filters: [
        {
          id: 'category_wrap',
          name: '카테고리',
          options: [
            { id: '1095', label: '전자/가전', value: '전자/가전' },
            { id: '1108', label: '패션/잡화', value: '패션/잡화' },
            { id: '1111', label: '아웃도어', value: '아웃도어' },
            { id: '1104', label: '뷰티/화장품', value: '뷰티/화장품' },
            { id: '1100', label: '완구/피규어', value: '완구/피규어' },
            { id: '1000', label: '음반/굿즈', value: '음반/굿즈' },
            { id: '1109', label: '비타민', value: '비타민' },
            { id: '1107', label: '식품', value: '식품' },
            { id: '1106', label: '주방', value: '주방' },
            { id: '1105', label: '자동차용품', value: '자동차용품' },
            { id: '1103', label: '취미/생활', value: '취미/생활' }
          ]
        },
        { id: 'tag_wrap', name: '태그', options: [] },
        { id: 'curation_wrap', name: '큐레이션', options: [] }
      ],
      selectedCategories: [],
      products: [
        {
          id: 1,
          name: 'NY 캡모자',
          price: 35000,
          image: 'https://picsum.photos/id/90/300/300',
          description: '새상품',
          category: 'fashion',
          details: {
            brand: '패션브랜드',
            model: 'NY001',
          },
          seller: 'fashion_seller',
          sellerImage: 'https://picsum.photos/id/90/100/300/300'
        },
        // 추가 판매 상품 데이터
      ]
    }
  },
  methods: {
    setActiveFilter(filterId) {
      this.activeFilter = filterId;
    },
    toggleCategory(category) {
      const index = this.selectedCategories.indexOf(category);
      if (index > -1) {
        // 이미 선택된 카테고리라면 제거
        this.selectedCategories.splice(index, 1);
      } else if (this.selectedCategories.length < 3) {
        // 3개 미만 선택된 상태에서만 새로운 카테고리 추가
        this.selectedCategories.push(category);
      }
    },
    isSelected(category) {
      return this.selectedCategories.includes(category);
    },
    showProductDetail(product) {
      this.selectedProduct = product;
      this.$gtm.logProductView(product);
    },
    closeProductDetail() {
      this.selectedProduct = null;
    }
  }
}
</script>

<template>
  <div class="sell-page">
    <div class="page-header">
      <h1>팔아요</h1>
      <p class="header-subtitle">내가 가진 아이템<br>팔아요.</p>

      <!-- 프로모션 배너 -->
      <div class="promotion-banner">
        <img src="https://picsum.photos/id/91/300/300" alt="판매 프로모션" />
      </div>
    </div>
    <div class="layout">
      <!-- 필터 타입 선택 버튼 -->
      <ul class="filter-buttons">
        <li v-for="filter in filters"
            :key="filter.id"
            :class="{ active: activeFilter === filter.id }">
          <button class="btn-open"
                  @click="setActiveFilter(filter.id)">
            {{ filter.name }}
          </button>
        </li>
      </ul>

      <!-- 선택된 필터의 옵션들 -->
      <div class="filter-options" v-if="activeFilter">
        <button v-for="option in filters.find(f => f.id === activeFilter).options"
                :key="option.id"
                :class="{
                'option-btn': true,
                'selected': isSelected(option.value),
                'disabled': !isSelected(option.value) && selectedCategories.length >= 3
              }"
                @click="toggleCategory(option.value)">
          {{ option.label }}
        </button>
      </div>

      <!-- 선택된 카테고리 표시 -->
      <div class="selected-categories" v-if="selectedCategories.length > 0">
        <div class="selected-label">선택된 카테고리:</div>
        <div class="selected-tags">
        <span v-for="category in selectedCategories"
              :key="category"
              class="selected-tag">
          {{ category }}
          <button @click="toggleCategory(category)" class="remove-tag">×</button>
        </span>
        </div>
      </div>
    </div>

    <!-- 판매 상품 목록 -->
    <div class="products-container">
      <div class="products-section">
        <ul class="products-list">
          <li
              v-for="product in products"
              :key="product.id"
              class="product-item"
              @click="showProductDetail(product)"
          >
            <product-card
                :product="product"
            />
          </li>
        </ul>
      </div>
    </div>

    <!-- 상품 상세 컴포넌트 -->
    <ProductDetailComponent
        v-if="selectedProduct"
        :product="selectedProduct"
        @close="closeProductDetail"
    />
  </div>
</template>

<style scoped>
.sell-page {
  flex: 1;
  background-color: #f8f9fa;
}

.page-header {
  margin-bottom: 2rem;
  padding: 2rem;
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
.layout {
  margin: 20px 0;
}

.layout ul {
  display: flex;
  gap: 10px;
  list-style: none;
  padding: 0;
  margin: 0;
}

.layout li {
  position: relative;
}

.btn-open {
  display: inline-block;
  padding: 8px 16px;
  border: 1px solid #ddd;
  border-radius: 20px;
  cursor: pointer;
  text-decoration: none;
  color: #333;
}

.active .btn-open {
  background-color: #000;
  color: white;
  border-color: #000;
}

.ckGroup span {
  display: flex;
  align-items: center;
  gap: 8px;
}

.ckGroup label {
  cursor: pointer;
}

input[type="checkbox"] {
  cursor: pointer;
}

.promotion-banner img {
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  border-radius: 8px;
}

.category-filter {
  padding: 1rem 2rem;
  margin-bottom: 2rem;
}

.products-container {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0 20px;
  box-sizing: border-box;
}

.products-list {
  list-style-type: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin: 0 0 3rem;
  width: 100%;
}

.product-item {
  transition: transform 0.2s ease;
  cursor: pointer;
}

.product-item:hover {
  transform: translateY(-5px);
}

/* 필터 버튼 스타일 */
.filter-buttons {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.layout {
  margin: 20px 0;
}

.filter-buttons {
  display: flex;
  gap: 10px;
  list-style: none;
  padding: 0;
  margin: 0 0 20px 0;
}

.btn-open {
  padding: 8px 16px;
  border: 1px solid #ddd;
  border-radius: 20px;
  background: white;
  cursor: pointer;
}

.active .btn-open {
  background: #000;
  color: white;
  border-color: #000;
}

.filter-options {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}

.option-btn {
  padding: 8px 16px;
  border: 1px solid #ddd;
  border-radius: 20px;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
}

.option-btn:hover:not(.disabled) {
  background: #f8f8f8;
}

.option-btn.selected {
  background: #000;
  color: white;
  border-color: #000;
}

.option-btn.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.selected-categories {
  margin-top: 20px;
}

.selected-label {
  font-weight: bold;
  margin-bottom: 10px;
}

.selected-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.selected-tag {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 5px 10px;
  background: #f0f0f0;
  border-radius: 15px;
  font-size: 0.9em;
}

.remove-tag {
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
  font-size: 1.2em;
  color: #666;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.remove-tag:hover {
  color: #000;
}

</style>


<style scoped>
.layout {
  margin: 20px 0;
}

.filter-container {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 10px;
  background: white;
  border-radius: 8px;
}

.filter-buttons {
  display: flex;
  gap: 10px;
  list-style: none;
  padding: 0;
  margin: 0;
  flex-shrink: 0; /* 버튼 영역 크기 고정 */
}

.divider {
  width: 1px;
  height: 24px;
  background-color: #ddd;
  margin: 0 10px;
}

.btn-open {
  padding: 8px 16px;
  border: 1px solid #ddd;
  border-radius: 20px;
  background: white;
  cursor: pointer;
  white-space: nowrap;
}

.active .btn-open {
  background: #000;
  color: white;
  border-color: #000;
}

.filter-options {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  overflow-x: auto; /* 필요시 가로 스크롤 */
  padding: 4px;
}

.option-btn {
  padding: 6px 12px;
  border: 1px solid #ddd;
  border-radius: 20px;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
  font-size: 0.9em;
}

.option-btn:hover:not(.disabled) {
  background: #f8f8f8;
}

.option-btn.selected {
  background: #000;
  color: white;
  border-color: #000;
}

.option-btn.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* 스크롤바 스타일링 (선택사항) */
.filter-options::-webkit-scrollbar {
  height: 4px;
}

.filter-options::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.filter-options::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 2px;
}

.filter-options::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>