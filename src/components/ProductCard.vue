<template>
  <div class="product-card">
    <div class="image-container">
      <img :src="product.image" :alt="product.name" class="product-image">
      <button class="like-button">
        <span class="heart-icon">♡</span>
        <span class="like-count">{{ product.likes || 0 }}</span>
      </button>
      <span :class="['status-badge', {'buy-badge': !!product.buyer}]">
        {{ product.badge }}
      </span>
    </div>
    <div class="product-info">
      <h3 class="product-name">{{ product.name }}</h3>
      <p v-if="!!product.price" class="price">{{ formatPrice(product.price) }} KRW</p>
      <div class="seller-info">
        <img v-if="product.countryFlag" :src="product.countryFlag" class="country-flag" :alt="product.country">
        <span class="seller-name">{{ product.seller.name }}</span>
      </div>
      <div class="tags" v-if="product.tags">
        <span class="tag">{{ product.tags }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      isLiked: false,
    }
  },
  methods: {
    formatPrice(price) {
      return price?.toLocaleString()
    }
  }
}
</script>

<style scoped>
.product-card {
  width: 256px;
  background: #ffffff;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: box-shadow 0.3s ease;
}

.image-container {
  position: relative;
  height: 256px;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.like-button {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.8);
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
}

.status-badge {
  position: absolute;
  bottom: 0.5rem;
  left: 0.5rem;
  padding: 0.25rem 0.75rem;
  background: #2196F3;
  color: white;
  font-size: 0.75rem;
  border-radius: 0.25rem;
}

.buy-badge {
  background: rgba(0, 0, 0, 0.5);
  color: white;
}

.product-info {
  padding: 1rem;
}

.product-name {
  margin: 0;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
}

.price {
  font-size: 1.25rem;
  font-weight: bold;
  margin: 0.5rem 0;
}

.seller-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0.5rem 0;
}

.country-flag {
  width: 1rem;
  height: 1rem;
}

.seller-name {
  font-size: 0.875rem;
  color: #666;
}

.tags {
  margin-top: 0.5rem;
}

.tag {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  background: #f5f5f5;
  color: #666;
  font-size: 0.75rem;
  border-radius: 0.25rem;
}
</style>