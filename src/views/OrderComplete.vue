<template>
  <div class="order-complete-page">
    <!-- 페이지 헤더 -->
    <div class="page-header">
      <h1>주문완료</h1>
      <p class="header-subtitle">주문이 성공적으로<br>완료되었습니다.</p>
    </div>

    <!-- 주문 완료 메시지 -->
    <div class="completion-message">
      <div class="icon">✓</div>
      <h2>결제가 완료되었습니다</h2>
      <p>주문번호: {{ orderInfo.orderNumber }}</p>
    </div>

    <!-- 주문 상세 정보 -->
    <div class="order-details">
      <h3 class="section-title">주문 상세</h3>

      <!-- 주문 상품 목록 -->
      <div class="order-items">
        <article v-for="item in orderInfo.items" :key="item.id" class="order-item-card">
          <div class="item-image">
            <img :src="item.image" :alt="item.title">
          </div>
          <div class="item-info">
            <h4 class="item-title">{{ item.title }}</h4>
            <div class="seller-info">
              <img :src="item.sellerImage" alt="판매자" class="seller-image">
              <span class="seller-name">{{ item.seller }}</span>
            </div>
            <div class="item-price">
              <span class="quantity">{{ item.quantity }}개</span>
              <span class="price">{{ item.price }}원</span>
            </div>
          </div>
        </article>
      </div>

      <!-- 배송 정보 -->
      <div class="shipping-info">
        <h3 class="section-title">배송 정보</h3>
        <div class="info-content">
          <p><strong>받는 사람:</strong> {{ orderInfo.shippingInfo.name }}</p>
          <p><strong>연락처:</strong> {{ orderInfo.shippingInfo.phone }}</p>
          <p><strong>배송지:</strong> {{ orderInfo.shippingInfo.address }}</p>
        </div>
      </div>

      <!-- 결제 정보 -->
      <div class="payment-info">
        <h3 class="section-title">결제 정보</h3>
        <div class="info-content">
          <div class="payment-row">
            <span>결제 수단</span>
            <span>{{ orderInfo.paymentMethod }}</span>
          </div>
          <div class="payment-row">
            <span>주문 금액</span>
            <span>{{ orderInfo.totalAmount }}원</span>
          </div>
          <div class="payment-row total">
            <span>총 결제금액</span>
            <span>{{ orderInfo.totalAmount }}원</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 하단 버튼 -->
    <div class="action-buttons">
      <button class="primary-btn">주문 내역 보기</button>
      <button class="secondary-btn">쇼핑 계속하기</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderComplete',
  data() {
    return {
      orderInfo: null,
      gtmEventSent: false
    }
  },
  created() {
    // 라우터를 통해 전달된 주문 데이터가 없으면 홈으로 리다이렉트
    const orderData = this.$route.query.orderData || this.$route.params.orderData;
    if (!orderData) {
      this.orderInfo = {
        orderNumber: 'OD0000000_001',
        orderDate: '2025-01-13 15:30',
        status: '결제완료',
        totalAmount: 800000,
        paymentMethod: '신용카드',
        items: [
          {
            id: 1,
            title: 'NY 캡모자',
            image: 'https://picsum.photos/id/90/300/300',
            seller: 'fashion_seller',
            sellerImage: 'https://picsum.photos/id/77/300/300',
            quantity: 1
          }
        ],
        shippingInfo: {
          name: '김타우니',
          phone: '010-1234-1234',
          address: '서울특별시 강남구 테헤란로 123 123-12'
        }
      };
      // 주문 데이터가 없으면 홈으로 리다이렉트
      this.$router.replace('/');
      return;
    }

    this.orderInfo = typeof orderData === 'string' ? JSON.parse(orderData) : orderData;
  },
  mounted() {
    // gtmEventSent 플래그를 확인하여 한 번만 실행
    if (!this.gtmEventSent && this.orderInfo) {
      this.$gtm.logPurchase(this.orderInfo);
      this.gtmEventSent = true;

      // sessionStorage에 주문 완료 상태 저장
      sessionStorage.setItem('orderCompleted', this.orderInfo.orderNumber);
    }
  },
  beforeUnmount() {
    // 컴포넌트가 제거될 때 sessionStorage 정리
    sessionStorage.removeItem('orderCompleted');
  }
}
</script>

<style scoped>
.order-complete-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

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

.completion-message {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem;
  background: #f8f8f8;
  border-radius: 1rem;
}

.completion-message .icon {
  font-size: 3rem;
  color: #4CAF50;
  margin-bottom: 1rem;
}

.completion-message h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.section-title {
  font-size: 1.25rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #eee;
}

.order-item-card {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #eee;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}

.item-image {
  width: 100px;
  height: 100px;
  border-radius: 0.5rem;
  overflow: hidden;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-info {
  flex: 1;
}

.item-title {
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.seller-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.seller-image {
  width: 24px;
  height: 24px;
  border-radius: 50%;
}

.seller-name {
  font-size: 0.9rem;
  color: #666;
}

.item-price {
  display: flex;
  justify-content: space-between;
  color: #333;
  font-weight: bold;
}

.shipping-info, .payment-info {
  margin-top: 2rem;
}

.info-content {
  padding: 1rem;
  background: #f8f8f8;
  border-radius: 0.5rem;
}

.payment-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.payment-row.total {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #ddd;
  font-weight: bold;
  font-size: 1.1rem;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 3rem;
}

.primary-btn, .secondary-btn {
  padding: 1rem 2rem;
  border-radius: 2rem;
  font-weight: bold;
  cursor: pointer;
}

.primary-btn {
  background: #000;
  color: white;
  border: none;
}

.secondary-btn {
  background: white;
  color: #000;
  border: 1px solid #000;
}
</style>