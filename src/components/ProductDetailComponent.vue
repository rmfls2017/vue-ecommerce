<template>
  <div class="side-contents-area">
    <div class="lp-layout" :class="{ 'slide-out': isClosing }">
      <!-- 헤더 영역 -->
      <div class="lp-head">
        <button class="home-button"><LucideHome :size="20" /></button>
        <h2 class="header-title">상품 상세</h2>
        <div class="tooltip-more-wrap">
          <button class="more-button" @click="openTooltip">
            <LucideMoreVertical :size="20" />
          </button>
          <div class="tooltip-more" v-if="isTooltipOpened">
            <ul class="tooltip-more-list">
              <li class="tooltip-more-item">
                <a class="" href="javascript:;">신고</a>
              </li>
            </ul>
            <button class="tooltop-more-close-button" @click="closeTooltip"><LucideX :size="20" /></button>
          </div>
        </div>
        <button class="close-button" @click="closeModal">닫기</button>
      </div>

      <div class="lp_body">
        <!-- 상품상세모드 -->
        <template v-if="currentMode === 'detail'">
          <!-- 판매자 정보 -->
          <div class="seller-section">
            <div class="seller-info">
              <div class="seller-left">
                <a class="seller-profile">
                  <img :src="product.seller.image" :alt="product.seller.name">
                </a>
                <a class="seller-name">{{ product.seller.name }}</a>
              </div>
              <div class="seller-actions">
                <a class="connect-btn">
                  <span>0</span>
                </a>
                <a class="chat-btn">채팅</a>
              </div>
            </div>
          </div>

          <!-- 날짜 및 액션 버튼 -->
          <div class="info-action-bar">
            <div class="post-date">
              요청일: {{ formatDate(product.date) }}
            </div>
            <div class="action-buttons">
              <button class="share-btn" @click="shareProduct">공유하기</button>
              <button class="like-btn" :class="{ active: isLiked }" @click="toggleLike">
                <span class="like-count">{{ likeCount }}</span>
              </button>
            </div>
          </div>

          <!-- 상품 정보 -->
          <div class="product-info">
            <h3 class="product-title">{{ product.name }}</h3>
            <div class="product-image">
              <img :src="product.image" :alt="product.name">
            </div>

            <div class="product-description">
              <p>{{ product.description }}</p>
            </div>
          </div>
        </template>

        <!-- 주문하기 모드 -->
        <template v-if="currentMode === 'order'">
          <div class="order-info">
            <!-- 날짜와 카테고리 -->
            <div class="info-header">
              <span class="date">{{ formatDate() }}</span>
              <span class="category">완구/피규어</span>
            </div>

            <!-- 상품 타이틀 -->
            <h3 class="product-title">{{ product.name }}</h3>

            <!-- 배송 국가 정보 -->
            <div class="shipping-countries">
              <div class="country-selection">
                <div class="field-group">
                  <label>출발국가</label>
                  <div class="country-input">
                    <input type="text" v-model="departureCountry" readonly>
                  </div>
                </div>
                <div class="arrow">→</div>
                <div class="field-group">
                  <label>도착국가</label>
                  <div class="country-input">
                    <input type="text" v-model="arrivalCountry" readonly>
                  </div>
                </div>
              </div>
              <p class="shipping-note">한국으로만 배송 가능합니다.</p>
            </div>

            <!-- 상품 정보 -->
            <div class="product-details">
              <div class="detail-row">
                <span class="label">브랜드:</span>
                <span class="value">{{ product.details.brand }}</span>
              </div>
              <div class="detail-row">
                <span class="label">상품:</span>
                <span class="value">{{ product.name }}</span>
              </div>
            </div>

            <!-- 배송비 정보 -->
            <div class="shipping-cost">
              <h4>국제운송료</h4>
              <div class="cost-input">
                <input type="text" v-model="shippingCost" readonly>
                <span class="currency">KRW</span>
              </div>
            </div>

            <!-- 가격 요약 -->
            <div class="price-summary">
              <div class="summary-row">
                <span>상품 가격</span>
                <span>{{ formatPrice(product.price) }} KRW</span>
              </div>
              <div class="summary-row">
                <span>배송비</span>
                <span>{{ formatPrice(shippingCost) }} KRW</span>
              </div>
              <div class="total-row">
                <span>예상 관부가세</span>
                <span>0 KRW</span>
              </div>
            </div>
          </div>
        </template>

        <template v-if="currentMode === 'quotation'">
          <div class="quotation-info">
            <div class="step-indicator">1 / 5</div>
            <h2 class="step-title">아이템이 출발하는<br>나라를 선택해 주세요.</h2>

            <div class="country-grid">
              <div class="country-options">
                <button
                    v-for="country in countries"
                    :key="country.code"
                    class="country-option"
                    :class="{ 'active': departureCountry === country.code }"
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

            <div class="next-button-container">
              <button class="next-button" :disabled="!departureCountry">
                이전 정보 불러오기
              </button>
            </div>
          </div>
        </template>
      </div>

      <!-- 하단 구매 버튼 -->
      <div class="bottom-action">
        <!-- 상세 모드 버튼 -->
        <template v-if="currentMode === 'detail'">
          <button v-if="product.price"
                  class="action-button order-button"
                  @click="changeMode('order')">
            주문하기
          </button>
          <button v-else
                  class="action-button quotation-button"
                  @click="startQuotation">
            견적작성 <span v-if="quotationCount !== null">({{ quotationCount }}/3)</span>
          </button>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import {
  LucideHome,
  LucideX,
  LucideMoreVertical,
} from "lucide-vue-next";

export default {
  name: 'ProductDetailComponent',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  components: {
    LucideHome,
    LucideX,
    LucideMoreVertical,
  },
  data() {
    return {
      isTooltipOpened: false,
      isClosing: false,
      isLiked: this.product.isLiked || false,
      likeCount: this.product.likeCount || 0,
      currentMode: 'detail',
      quotationCount: 0
    }
  },
  mounted() {
    document.body.style.overflowY = 'hidden'
  },
  unmounted() {
    document.body.style.overflowY = 'auto'
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString('ko-KR');
    },
    changeMode(mode) {
      this.currentMode = mode;
    },
    startQuotation() {
      this.$changePage('buy', 'QuotationStep1', {
        productData: this.product
      });
    },
    closeModal() {
      this.isClosing = true;
      setTimeout(() => {
        this.isClosing = false;
        this.currentMode = 'detail';
        this.$emit('close');
      }, 300);
    },
    toggleLike() {
      this.isLiked = !this.isLiked;
      this.likeCount = this.isLiked ? 1 : -1;
      this.$emit('like-change', {
        productId: this.product.id,
        isLiked: this.isLiked,
        likeCount: this.likeCount
      });
    },
    openTooltip() {
      this.isTooltipOpened = true
    },
    closeTooltip() {
      this.isTooltipOpened = false
    },
    shareProduct() {
      // 공유하기 기능 구현
    }
  }
}
</script>

<style scoped>

</style>
