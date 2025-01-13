<template>
  <div class="product-detail-overlay" @click.self="closeModal">
    <div class="product-detail-container">
      <button class="close-button" @click="closeModal">&times;</button>

      <div class="product-detail-content">
        <div class="product-images">
          <div class="main-image">
            <img :src="product.image" :alt="product.name">
          </div>
          <div class="thumbnail-images" v-if="product.additionalImages">
            <img
                v-for="(image, index) in product.additionalImages"
                :key="index"
                :src="image"
                :alt="`${product.name} ${index + 1}`"
                class="thumbnail"
            >
          </div>
        </div>

        <div class="product-info">
          <div class="product-header">
            <h2 class="product-name">{{ product.name }}</h2>
            <div class="product-price">{{ formatPrice(product.price) }}원</div>
          </div>

          <div class="product-description">
            <p>{{ product.description }}</p>
          </div>

          <div class="product-specs">
            <h3>상품 정보</h3>
            <table class="specs-table">
              <tr>
                <td class="spec-label">브랜드</td>
                <td>{{ product.details.brand }}</td>
              </tr>
              <tr>
                <td class="spec-label">모델명</td>
                <td>{{ product.details.model }}</td>
              </tr>
              <tr>
                <td class="spec-label">재고</td>
                <td>{{ product.details.stock }}개</td>
              </tr>
            </table>

            <div class="specs-list">
              <h4>주요 스펙</h4>
              <ul>
                <li v-for="(spec, index) in product.details.specs" :key="index">
                  {{ spec }}
                </li>
              </ul>
            </div>
          </div>

          <div class="purchase-section">
            <div class="quantity-selector">
              <button
                  @click="decreaseQuantity"
                  :disabled="quantity <= 1"
                  class="quantity-btn"
              >-</button>
              <input
                  type="number"
                  v-model.number="quantity"
                  min="1"
                  :max="product.details.stock"
                  class="quantity-input"
              >
              <button
                  @click="increaseQuantity"
                  :disabled="quantity >= product.details.stock"
                  class="quantity-btn"
              >+</button>
            </div>

            <div class="total-price">
              총 상품금액: <span>{{ formatPrice(product.price * quantity) }}원</span>
            </div>

            <div class="action-buttons">
              <button @click="addToCart" class="add-to-cart-btn">장바구니 담기</button>
              <button @click="buyNow" class="buy-now-btn">바로 구매</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductDetailComponent',
  props: {
    product: {
      type: Object,
      required: true,
      details: {
        type: Object,
        required: true,
      }
    }
  },
  data() {
    return {
      quantity: 1,
    }
  },
  methods: {
    formatPrice(price) {
      return price.toLocaleString()
    },
    closeModal() {
      this.$emit('close')
    },
    decreaseQuantity() {
      if (this.quantity > 1) {
        this.quantity--
      }
    },
    increaseQuantity() {
      if (this.quantity < this.product.details.stock) {
        this.quantity++
      }
    },
    addToCart() {
      this.$gtm?.logAddToCart(this.product, this.quantity)
      this.$emit('add-to-cart', {
        product: this.product,
        quantity: this.quantity
      })
      this.closeModal()
    },
    buyNow() {
      this.$gtm?.logBeginCheckout([{
        product: this.product,
        quantity: this.quantity
      }])
    }
  }
}
</script>

<style scoped>
.product-detail-overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: flex-end;
  align-items: stretch;
  z-index: 1000;
  pointer-events: none;
}

.product-detail-container {
  background-color: white;
  width: 90%;
  max-width: 800px;
  height: 100vh;
  overflow-y: auto;
  padding: 2rem;
  position: relative;
  pointer-events: auto;
  animation: slideIn 0.3s ease-out forwards;
}

.product-detail-container.slide-out {
  animation: slideOut 0.3s ease-in forwards;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes slideOut {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
}

.close-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #666;
}

.product-detail-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.product-images {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.main-image {
  width: 100%;
  aspect-ratio: 1;
  border-radius: 8px;
  overflow: hidden;
}

.main-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.thumbnail-images {
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
}

.thumbnail {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
  cursor: pointer;
  border: 2px solid transparent;
}

.thumbnail:hover {
  border-color: #007bff;
}

.product-info {
  flex: 1;
}

.product-header {
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
}

.product-name {
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
}

.product-price {
  font-size: 1.5rem;
  color: #007bff;
  font-weight: bold;
}

.product-description {
  color: #666;
  line-height: 1.6;
  margin: 1rem 0;
}

.product-specs {
  background-color: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  margin: 1rem 0;
}

.specs-table {
  width: 100%;
  margin: 1rem 0;
}

.spec-label {
  font-weight: bold;
  width: 100px;
  padding: 0.5rem 0;
}

.specs-list ul {
  list-style: disc;
  padding-left: 1.5rem;
  margin-top: 0.5rem;
}

.specs-list li {
  margin-bottom: 0.5rem;
  color: #666;
}

.purchase-section {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #eee;
}

.quantity-selector {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.quantity-btn {
  width: 36px;
  height: 36px;
  border: 1px solid #ddd;
  background-color: #f8f9fa;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.quantity-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quantity-btn:hover:not(:disabled) {
  background-color: #e9ecef;
}

.quantity-input {
  width: 60px;
  height: 36px;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.total-price {
  font-size: 1.2rem;
  margin: 1rem 0;
}

.total-price span {
  font-weight: bold;
  color: #007bff;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}

.action-buttons button {
  flex: 1;
  padding: 1rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.add-to-cart-btn {
  background-color: #e9ecef;
  color: #495057;
}

.add-to-cart-btn:hover {
  background-color: #dee2e6;
}

.buy-now-btn {
  background-color: #007bff;
  color: white;
}

.buy-now-btn:hover {
  background-color: #0056b3;
}
</style>