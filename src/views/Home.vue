<template>
  <main class="main-content">
    <div class="main-banner">
      <div class="banner-content">
        <h1>특별한 상품을 만나보세요</h1>
        <p>최고의 품질, 최상의 서비스</p>
      </div>
    </div>
    <div class="products-container">
      <div class="products-section">
        <ul class="products-list">
          <li
              v-for="product in filteredProducts"
              :key="product.id"
              class="product-item"
          >
            <product-card
                :product="product"
                @click="showProductDetail(product)"
            />
          </li>
        </ul>
      </div>
    </div>

    <ProductDetailComponent
        v-if="selectedProduct"
        :product="selectedProduct"
        @close="closeProductDetail"
    />
  </main>
</template>

<script>
import productData from "@/assets/products.json"
import ProductCard from "@/components/ProductCard.vue";
import ProductDetailComponent from "@/components/ProductDetailComponent.vue";

export default {
  name: 'Home',
  components: {
    ProductCard,
    ProductDetailComponent,
  },
  data() {
    return {
      selectedCategory: 'all',
      selectedProduct: null,
      products: productData
    }
  },
  computed: {
    filteredProducts() {
      return this.selectedCategory === 'all'
          ? this.products
          : this.products.filter(p => p.category === this.selectedCategory)
    }
  },
  methods: {
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

<style scoped>
.main-content {
  flex: 1;
  background-color: #f8f9fa;
}

.main-banner {
  width: 100%;
  height: 400px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  margin-bottom: 2rem;
}

.banner-content h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.banner-content p {
  font-size: 1.2rem;
  opacity: 0.9;
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
}

.product-item:hover {
  transform: translateY(-5px);
}
</style>