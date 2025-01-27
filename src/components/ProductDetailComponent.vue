<template>
  <div class="product-detail-overlay">
    <div class="product-detail-container" :class="{ 'slide-out': isClosing }">
      <!-- 헤더 영역 -->
      <div class="detail-header">
        <div class="header-left">
          <a href="/" class="home-link">HOOT TOWN</a>
        </div>
        <h2 class="header-title">상품 상세</h2>
        <button class="close-button" @click="closeModal">닫기</button>
      </div>

      <div class="detail-content">
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
            <!-- 날짜와 카테고리 -->
            <div class="info-header">
              <span class="date">{{ formatDate() }}</span>
              <span class="category">{{ product.category || '완구/피규어' }}</span>
            </div>

            <!-- 견적 작성 폼 -->
            <div class="quotation-form">
              <!-- 견적 제목 -->
              <div class="form-group">
                <label>견적 제목</label>
                <input type="text" v-model="quotationTitle" placeholder="견적 제목을 입력해주세요">
              </div>

              <!-- 견적 가격 -->
              <div class="form-group">
                <label>견적 가격</label>
                <div class="price-input">
                  <input type="number" v-model="quotationPrice" placeholder="가격을 입력해주세요">
                  <span class="currency">KRW</span>
                </div>
              </div>

              <!-- 배송비 견적 -->
              <div class="form-group">
                <label>배송비</label>
                <div class="price-input">
                  <input type="number" v-model="quotationShipping" placeholder="배송비를 입력해주세요">
                  <span class="currency">KRW</span>
                </div>
              </div>

              <!-- 배송 소요 기간 -->
              <div class="form-group">
                <label>예상 배송 기간</label>
                <div class="delivery-time">
                  <select v-model="deliveryTime">
                    <option value="7">7일 이내</option>
                    <option value="14">14일 이내</option>
                    <option value="21">21일 이내</option>
                    <option value="30">30일 이내</option>
                  </select>
                </div>
              </div>

              <!-- 견적 설명 -->
              <div class="form-group">
                <label>견적 설명</label>
                <textarea
                    v-model="quotationDescription"
                    placeholder="구매자에게 전달할 견적 설명을 작성해주세요"
                    rows="4"
                ></textarea>
              </div>

              <!-- 견적 유효 기간 -->
              <div class="form-group">
                <label>견적 유효 기간</label>
                <select v-model="validityPeriod">
                  <option value="3">3일</option>
                  <option value="7">7일</option>
                  <option value="14">14일</option>
                </select>
              </div>
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
                  @click="changeMode('quotation')">
            견적작성 <span v-if="quotationCount !== null">({{ quotationCount }}/3)</span>
          </button>
        </template>

        <!-- 주문 모드 버튼 -->
        <template v-if="currentMode === 'order'">
          <div class="order-actions">
            <button class="back-button" @click="changeMode('detail')">
              이전으로
            </button>
            <button class="confirm-button" @click="submitOrder">
              주문하기
              <span class="total-price">{{ formatPrice(totalPrice) }} KRW</span>
            </button>
          </div>
        </template>

        <!-- 견적 모드 버튼 -->
        <template v-if="currentMode === 'quotation'">
          <div class="quotation-actions">
            <button class="back-button" @click="changeMode('detail')">
              이전으로
            </button>
            <button class="submit-button" @click="submitQuotation">
              견적 제출하기
            </button>
          </div>
        </template>
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
      required: true
    }
  },
  data() {
    return {
      isClosing: false,
      isLiked: this.product.isLiked || false,
      likeCount: this.product.likeCount || 0,
      currentMode: 'detail',
      departureCountry: '중국',
      arrivalCountry: '한국',
      shippingCost: 16067,
      quotationCount: 0,
      // 견적 관련 데이터
      quotationTitle: '',
      quotationPrice: null,
      quotationShipping: null,
      quotationDescription: '',
      deliveryTime: '14',
      validityPeriod: '7'
    }
  },
  watch: {
    product: {
      handler() {
        this.resetState();
      },
      immediate: true,
    }
  },
  computed: {
    totalPrice() {
      return this.product.price + this.shippingCost;
    }
  },
  methods: {
    // 상태 초기화 메서드
    resetState() {
      this.currentMode = 'detail';
      this.isClosing = false;
      this.quotationCount = 0;

      // 견적 관련 데이터 초기화
      this.quotationTitle = '';
      this.quotationPrice = null;
      this.quotationShipping = null;
      this.quotationDescription = '';
      this.deliveryTime = '14';
      this.validityPeriod = '7';

      // 배송 관련 기본값 설정
      this.departureCountry = '중국';
      this.arrivalCountry = '한국';
      this.shippingCost = 16067;
    },
    formatPrice(price) {
      return price ? price.toLocaleString() : '견적 필요';
    },
    formatDate() {
      return new Date().toLocaleDateString('ko-KR');
    },
    changeMode(mode) {
      if (mode === 'order') {
        this.$gtm.logBeginCheckout(this.product)
      }
      this.currentMode = mode;
    },
    closeModal() {
      this.isClosing = true;
      setTimeout(() => {
        this.isClosing = false;
        this.currentMode = 'detail';
        this.$emit('close');
      }, 300);
    },
    submitOrder() {
     const orderData = {
        orderNumber: 'OD' + Date.now(),
        orderDate: new Date().toISOString(),
        status: '결제완료',
        totalAmount: this.totalPrice,
        paymentMethod: '신용카드',
        items: [{
          id: this.product.id,
          title: this.product.name,
          image: this.product.image,
          seller: {
            name: this.product.seller.name,
            image: this.product.seller.image,
          },
          quantity: 1,
          price: this.product.price
        }],
        shippingInfo: {
          name: '김타우니',
          phone: '010-1234-1234',
          address: '서울특별시 강남구 테헤란로 123 123-12'
        }
      };

      this.$router.push({
        path: '/order-complete',
        query: { orderData: JSON.stringify(orderData) }
      });
    },
    submitQuotation() {
      console.log('견적 제출', {
        title: this.quotationTitle,
        price: this.quotationPrice,
        shipping: this.quotationShipping,
        description: this.quotationDescription,
        deliveryTime: this.deliveryTime,
        validityPeriod: this.validityPeriod
      });
    },
    toggleLike() {
      this.isLiked = !this.isLiked;
      this.likeCount = this.isLiked ? 1 : -1;
      this.$emit('like-change', {
        productId: this.product.id,
        isLiked: this.isLiked,
        likeCount: this.likeCount
      });
    }
  }
}
</script>

<style scoped>
  /* 기본 레이아웃 */
.product-detail-overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 400px;
  z-index: 1000;
}

.product-detail-container {
  background-color: white;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1);
  animation: slideIn 0.3s ease-out forwards;
}

.product-detail-container.slide-out {
  animation: slideOut 0.3s ease-in forwards;
}

/* 애니메이션 */
@keyframes slideIn {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}

@keyframes slideOut {
  from { transform: translateX(0); }
  to { transform: translateX(100%); }
}

/* 헤더 스타일 */
.detail-header {
  display: flex;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #eee;
  position: relative;
}

.header-title {
  flex: 1;
  text-align: center;
  font-size: 1.1rem;
  margin: 0;
}

.home-link {
  color: #000;
  text-decoration: none;
  font-weight: bold;
}

.close-button {
  background: none;
  border: none;
  font-size: 0;
  width: 24px;
  height: 24px;
  position: relative;
  cursor: pointer;
}

.close-button::before,
.close-button::after {
  content: '';
  position: absolute;
  width: 2px;
  height: 16px;
  background: #000;
  top: 50%;
  left: 50%;
}

.close-button::before {
  transform: translate(-50%, -50%) rotate(45deg);
}

.close-button::after {
  transform: translate(-50%, -50%) rotate(-45deg);
}

/* 본문 영역 */
.detail-content {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
}

/* 판매자 정보 */
.seller-section {
  margin-bottom: 1.5rem;
}

.seller-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.seller-profile img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

/* 정보 헤더 */
.info-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  color: #666;
  font-size: 0.9rem;
}

/* 배송 국가 선택 */
.shipping-countries {
  margin: 1.5rem 0;
}

.country-selection {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.field-group {
  flex: 1;
}

.field-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #666;
}

.country-input input {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #f8f9fa;
}

.shipping-note {
  color: #666;
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

/* 가격 정보 */
.price-summary {
  margin: 1.5rem 0;
  border-top: 1px solid #eee;
  padding-top: 1rem;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.total-row {
  font-weight: bold;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
}

/* 견적 폼 스타일 */
.quotation-form {
  margin-top: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
  font-weight: 500;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #fff;
}

.form-group textarea {
  resize: vertical;
  min-height: 100px;
}

.price-input {
  position: relative;
}

.price-input .currency {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
}

.delivery-time {
  position: relative;
}

.delivery-time select {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #fff;
  appearance: none;
}

.delivery-time::after {
  content: '▼';
  font-size: 0.8rem;
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: #666;
}

/* 하단 버튼 영역 */
.bottom-action {
  padding: 1rem;
  border-top: 1px solid #eee;
}

.order-actions,
.quotation-actions {
  display: flex;
  gap: 1rem;
  width: 100%;
}

.back-button {
  padding: 1rem;
  background: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
}

.action-button {
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 4px;
  font-size: 1.1rem;
  cursor: pointer;
  font-weight: bold;
}

.order-button {
  background: #007bff;
  color: white;
}

.quotation-button {
  background: #28a745;
  color: white;
}

.confirm-button,
.submit-button {
  flex: 1;
  padding: 1rem;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.confirm-button {
  background: #007bff;
}

.submit-button {
  background: #28a745;
}

.total-price {
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

/* 상품 상세 */
.product-details {
  margin: 1.5rem 0;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 4px;
}

.detail-row {
  display: flex;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

/* 공통 유틸리티 */
.arrow {
  display: flex;
  align-items: center;
  color: #666;
}

.like-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1rem;
  border: 1px solid #ddd;
  border-radius: 20px;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;
}

.like-btn.active {
  border-color: #ff4b4b;
  color: #ff4b4b;
}

.like-count {
  font-size: 0.9rem;
  color: #666;
}

.like-btn.active .like-count {
  color: #ff4b4b;
}
</style>
