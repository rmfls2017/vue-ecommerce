<script>
import ProductCategoryFilter from "@/assets/data/product_category_filter.json";
import Products from "@/assets/data/products.json"
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
      activeFilter: 'category_wrap',
      filters: ProductCategoryFilter,
      selectedCategories: [],
      products: Products
    }
  },
  methods: {
    setActiveFilter(filterId) {
      this.activeFilter = filterId;
    },
    toggleCategory(category) {
      const index = this.selectedCategories.indexOf(category);
      if (index > -1) {
        this.selectedCategories.splice(index, 1);
      } else if (this.selectedCategories.length < 3) {
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
      <div class="header-content">
        <div class="text-content">
          <h1>팔아요</h1>
          <p class="header-subtitle">내가 찾는 직구 아이템<br/>한눈에 구경해 보세요.</p>
        </div>
        <div class="promotion-banner">
          <img src="https://picsum.photos/id/91/300/300" alt="판매 프로모션"/>
        </div>
      </div>
    </div>

    <div class="filter-wrapper">
      <ul class="filter-buttons">
        <li v-for="filter in filters" :key="filter.id" :class="{ active: activeFilter === filter.id }">
          <button class="btn-open" @click="setActiveFilter(filter.id)">
            {{ filter.name }}
          </button>
        </li>
      </ul>

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
      <div class="section-divider"></div>
    </div>

    <div class="products-container">
      <div class="section-divider" v-if="!selectedCategories.length">
        <div class="section-header">
          <h2 class="section-title">최신 팔아요</h2>
          <p class="product-count">상품 {{ products.length }}개</p>
        </div>
      </div>
      <div v-if="selectedCategories.length > 0">
        <div class="selected-filters">
          <span v-for="category in selectedCategories"
                :key="category"
                class="filter-tag">
            {{ category }}
          </span>
          <p class="filter-product-count">상품 {{ products.length }}개</p>
        </div>
      </div>
      <div class="products-section">
        <ul class="products-list">
          <li v-for="product in products"
              :key="product.id"
              class="product-item"
              @click="showProductDetail(product)">
            <product-card :product="product"/>
          </li>
        </ul>
      </div>
    </div>

    <ProductDetailComponent
        v-if="selectedProduct"
        :product="selectedProduct"
        @close="closeProductDetail"
    />
  </div>
</template>

<style scoped>
.sell-page {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}

/* Header */
.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;
  padding: 2rem;
}

.text-content, .promotion-banner {
  flex: 1;
}

.page-header h1 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.header-subtitle {
  font-size: 2rem;
  font-weight: bold;
  line-height: 1.4;
}

.promotion-banner img {
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  border-radius: 8px;
}

/* Filters */
.filter-buttons {
  display: flex;
  gap: 8px;
  padding: 16px;
  margin: 0;
  list-style: none;
}

.btn-open {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  background-color: #fff;
  color: #333;
  font-size: 14px;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.btn-open:hover {
  background-color: #f0f0f0;
}

.active .btn-open {
  background-color: #333;
  color: white;
}

.filter-options {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  overflow-x: auto;
  padding: 4px;
}

/* Option Buttons */
.option-btn {
  padding: 6px 12px;
  border: 1px solid #ddd;
  border-radius: 20px;
  background: #fff;
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

.section-divider {
  padding: 16px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-bottom: 1px solid #ddd;
}

/* Products */
.products-container {
  padding: 0 20px;
}

.products-container .section-divider {
  border-bottom: none;
}
.section-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 4px;
}

.product-count {
  font-size: 14px;
  color: #666;
}

.filter-tag {
  display: inline-block;
  padding: 6px 16px;
  margin: 0 4px;
  background-color: #f0f0f0;
  border-radius: 20px;
  font-size: 14px;
  color: #333;
}

.selected-filters {
  text-align: center;
  padding: 20px 0;
}

.products-section {
  padding-top: 40px;
}

.products-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin: 0 0 3rem;
  padding: 0;
  list-style: none;
}

.product-item {
  transition: transform 0.2s ease;
  cursor: pointer;
}

.product-item:hover {
  transform: translateY(-5px);
}

/* Scrollbar */
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