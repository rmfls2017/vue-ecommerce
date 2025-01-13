<template>
  <div class="product-card">
    <img :src="product.image" :alt="product.name" class="product-image">
    <div class="product-info">
      <h3 class="product-name">{{ product.name }}</h3>
      <p class="product-description">{{ product.description }}</p>
      <p v-if="product.price" class="product-price">{{ formatPrice(product.price) }}원</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  methods: {
    formatPrice(price) {
      return price ? price.toLocaleString() : ''
    },
    addToCart() {
      this.$emit('add-to-cart', this.product)
    }
  }
}
</script>

<style scoped>
.product-card {
  background: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.2s;
}

.product-card:hover {
  transform: translateY(-5px);
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.product-info {
  padding: 1rem;
}

.product-name {
  margin: 0 0 0.5rem;
  font-size: 1.2rem;
}

.product-description {
  color: #666;
  margin: 0.5rem 0;
}

.product-price {
  font-weight: bold;
  color: #007bff;
  margin: 0.5rem 0;
}

</style>