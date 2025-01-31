<template>
  <div class="lp-layout">
    <div>1 / 3</div>
    <h2 class="step-title">아이템이 출발하는<br>나라를 선택해 주세요.</h2>

    <div class="country-grid">
      <div class="country-options">
        <button
            v-for="country in countries"
            :key="country.code"
            class="country-option"
            :class="{ 'active': selectedCountry === country.code }"
            @click="selectCountry(country.code)"
        >
          <div class="flag-container">
            <img :src="country.flagUrl" :alt="country.name" class="country-flag">
          </div>
          <span class="country-name">{{ country.name }}</span>
          <span v-if="country.isNew" class="new-badge">NEW</span>
        </button>
      </div>
    </div>

    <div class="button-container">
      <button
          class="next-button"
          :disabled="!selectedCountry"
          @click="goToNextStep"
      >
        다음
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuotationStep1',
  props: {
    productData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      selectedCountry: '',
      countries: [
        { code: 'US-OR', name: '미국 OR', flagUrl: '/flags/us.svg' },
        { code: 'US-NJ', name: '미국 NJ', flagUrl: '/flags/us.svg' },
        { code: 'DE', name: '독일', flagUrl: '/flags/de.svg' },
        { code: 'FR', name: '프랑스', flagUrl: '/flags/fr.svg', isNew: true },
        { code: 'JP', name: '일본', flagUrl: '/flags/jp.svg' },
        { code: 'CN', name: '중국', flagUrl: '/flags/cn.svg' },
        { code: 'HK', name: '홍콩', flagUrl: '/flags/hk.svg' }
      ]
    }
  },
  methods: {
    selectCountry(code) {
      this.selectedCountry = code;
    },
    goToNextStep() {
      if (this.selectedCountry) {
        this.$changePage('quotation', 'QuotationStep2', {
          country: this.selectedCountry,
          productData: this.productData
        });
      }
    }
  }
}
</script>

<style scoped>
.quotation-step {
  padding: 24px 16px;
}

.step-indicator {
  color: #666;
  font-size: 14px;
  margin-bottom: 12px;
}

.step-title {
  font-size: 24px;
  font-weight: bold;
  line-height: 1.4;
  margin-bottom: 32px;
}

.country-grid {
  margin-top: 24px;
}

.country-options {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.country-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  background: white;
  border: 1px solid #E0E0E0;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
}

.country-option.active {
  border-color: #007AFF;
  background-color: #F0F7FF;
}

.flag-container {
  width: 48px;
  height: 48px;
  margin-bottom: 8px;
  border-radius: 50%;
  overflow: hidden;
}

.country-flag {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.country-name {
  font-size: 14px;
  color: #333;
  text-align: center;
}

.new-badge {
  background: #007AFF;
  color: white;
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 12px;
  margin-top: 8px;
}

.button-container {
  margin-top: 32px;
}

.next-button {
  width: 100%;
  padding: 16px;
  background: #007AFF;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
}

.next-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>