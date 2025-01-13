<script>
export default {
  name: 'Trend',
  data() {
    return {
      selectedCategory: 'all',
      categories: [
        { id: 'all', name: '전체', icon: '🌟' },
        { id: 'fashion', name: '패션', icon: '👕' },
        { id: 'tech', name: '테크', icon: '📱' },
        { id: 'hobby', name: '취미', icon: '🎨' },
        { id: 'food', name: '식품', icon: '🍔' }
      ],
      popularKeywords: [
        { id: 1, text: '한정판 스니커즈', change: '급상승', status: 'up' },
        { id: 2, text: '애플워치 울트라', change: '상승', status: 'up' },
        { id: 3, text: '레고 신제품', change: '하락', status: 'down' }
      ],
      trendingItems: [
        {
          id: 1,
          title: '2025 리미티드 에디션 스니커즈',
          description: '올해 가장 주목받는 한정판 스니커즈',
          image: '/images/trend1.jpg',
          views: '2.3k',
          likes: '450',
          tags: ['스니커즈', '한정판', '패션']
        },
        {
          id: 2,
          title: '새로운 스마트워치 시리즈',
          description: '건강관리의 새로운 트렌드',
          image: '/images/trend2.jpg',
          views: '1.8k',
          likes: '380',
          tags: ['테크', '웨어러블', '건강']
        }
      ]
    }
  },
  methods: {
    selectCategory(categoryId) {
      this.selectedCategory = categoryId
    }
  }
}
</script>

<template>
  <div class="trend-page">
    <!-- 페이지 헤더 -->
    <div class="page-header">
      <h1>트렌드</h1>
      <p class="header-subtitle">요즘 타우니들은<br>이런 것에 관심있어요.</p>
    </div>

    <!-- 트렌드 카테고리 -->
    <div class="trend-categories">
      <button
          v-for="category in categories"
          :key="category.id"
          :class="['trend-category', { active: selectedCategory === category.id }]"
          @click="selectCategory(category.id)"
      >
        <span class="category-icon">{{ category.icon }}</span>
        <span class="category-name">{{ category.name }}</span>
      </button>
    </div>

    <!-- 트렌드 컨텐츠 -->
    <div class="trend-content">
      <!-- 인기 키워드 -->
      <section class="trend-section">
        <h2 class="section-title">실시간 인기 키워드</h2>
        <div class="keyword-list">
          <div v-for="(keyword, index) in popularKeywords"
               :key="keyword.id"
               class="keyword-item"
          >
            <span class="keyword-rank">{{ index + 1 }}</span>
            <span class="keyword-text">{{ keyword.text }}</span>
            <span class="keyword-status" :class="keyword.status">
              {{ keyword.change }}
            </span>
          </div>
        </div>
      </section>

      <!-- 트렌딩 아이템 -->
      <section class="trend-section">
        <h2 class="section-title">이번 주 트렌딩 아이템</h2>
        <div class="trending-items">
          <article v-for="item in trendingItems"
                   :key="item.id"
                   class="trend-item"
          >
            <div class="trend-item-image">
              <img :src="item.image" :alt="item.title">
              <div class="trend-stats">
                <span class="trend-views">👁️ {{ item.views }}</span>
                <span class="trend-likes">❤️ {{ item.likes }}</span>
              </div>
            </div>
            <div class="trend-item-info">
              <h3 class="trend-item-title">{{ item.title }}</h3>
              <p class="trend-item-desc">{{ item.description }}</p>
              <div class="trend-tags">
                <span v-for="tag in item.tags"
                      :key="tag"
                      class="trend-tag"
                >
                  #{{ tag }}
                </span>
              </div>
            </div>
          </article>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.trend-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.page-header {
  margin-bottom: 2rem;
}

.header-subtitle {
  font-size: 2rem;
  font-weight: bold;
  line-height: 1.4;
  margin-bottom: 2rem;
}

.trend-categories {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  overflow-x: auto;
  padding-bottom: 1rem;
}

.trend-category {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  border: 1px solid #eee;
  border-radius: 1rem;
  min-width: 80px;
  cursor: pointer;
  background: white;
}

.trend-category.active {
  background: #000;
  color: white;
  border-color: #000;
}

.category-icon {
  font-size: 1.5rem;
}

.trend-section {
  margin-bottom: 3rem;
}

.section-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
}

.keyword-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.keyword-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 0.5rem;
}

.keyword-rank {
  font-weight: bold;
  color: #007bff;
}

.keyword-status {
  font-size: 0.875rem;
}

.keyword-status.up {
  color: #28a745;
}

</style>