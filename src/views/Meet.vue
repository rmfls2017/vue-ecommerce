<script>
export default {
  name: 'Meet',
  data() {
    return {
      meetings: [
        {
          id: 1,
          title: '중고 피규어 교환 모임',
          image: '/images/meeting1.jpg',
          status: '모집중',
          date: '2025.01.20 14:00',
          location: '서울 강남구',
          hostName: '피규어매니아',
          hostImage: '/images/host1.jpg',
          currentParticipants: 3,
          maxParticipants: 6
        },
        {
          id: 2,
          title: '한정판 운동화 거래회',
          image: '/images/meeting2.jpg',
          status: '마감임박',
          date: '2025.01.25 16:00',
          location: '서울 홍대입구',
          hostName: '스니커즈킹',
          hostImage: '/images/host2.jpg',
          currentParticipants: 8,
          maxParticipants: 10
        }
      ]
    }
  }
}
</script>

<template>
  <div class="meet-page">
    <!-- 페이지 헤더 -->
    <div class="page-header">
      <h1>만나요</h1>
      <p class="header-subtitle">타우니들과 함께<br>직접 만나서 거래해요.</p>
    </div>

    <!-- 지역 선택 필터 -->
    <div class="location-filter">
      <div class="filter-buttons">
        <button class="filter-btn active">
          <span class="icon">📍</span>
          지역선택
        </button>
        <button class="filter-btn">
          <span class="icon">🔍</span>
          검색하기
        </button>
      </div>

      <!-- 지역 태그 목록 -->
      <div class="region-list">
        <button class="region-btn active">전체</button>
        <button class="region-btn">서울</button>
        <button class="region-btn">경기</button>
        <button class="region-btn">인천</button>
        <button class="region-btn">부산</button>
        <button class="region-btn">대구</button>
        <button class="region-btn">광주</button>
        <button class="region-btn">대전</button>
        <button class="region-btn">울산</button>
      </div>
    </div>

    <!-- 오프라인 모임 목록 -->
    <div class="meetings-grid">
      <article v-for="meeting in meetings" :key="meeting.id" class="meeting-card">
        <div class="meeting-image">
          <img :src="meeting.image" :alt="meeting.title">
          <div class="meeting-status" :class="meeting.status">
            {{ meeting.status }}
          </div>
        </div>
        <div class="meeting-info">
          <h3 class="meeting-title">{{ meeting.title }}</h3>
          <p class="meeting-details">
            <span class="meeting-date">{{ meeting.date }}</span>
            <span class="meeting-location">{{ meeting.location }}</span>
          </p>
          <div class="meeting-host">
            <img :src="meeting.hostImage" :alt="meeting.hostName" class="host-image">
            <span class="host-name">{{ meeting.hostName }}</span>
          </div>
          <div class="meeting-participants">
            <span class="participant-count">
              {{ meeting.currentParticipants }}/{{ meeting.maxParticipants }}명 참여중
            </span>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<style scoped>
.meet-page {
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

.location-filter {
  margin-bottom: 2rem;
}

.filter-buttons {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.filter-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 2rem;
  background: white;
  cursor: pointer;
}

.filter-btn.active {
  background: #000;
  color: white;
}

.region-list {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.region-btn {
  padding: 0.5rem 1rem;
  border: none;
  background: none;
  cursor: pointer;
  color: #666;
}

.region-btn.active {
  color: #000;
  font-weight: bold;
}

.meetings-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.meeting-card {
  border: 1px solid #eee;
  border-radius: 1rem;
  overflow: hidden;
}

.meeting-image {
  position: relative;
  aspect-ratio: 16/9;
  overflow: hidden;
}

.meeting-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.meeting-status {
  position: absolute;
  top: 1rem;
  left: 1rem;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.875rem;
  font-weight: bold;
}

.meeting-status.모집중 {
  background: #4CAF50;
  color: white;
}

.meeting-status.마감임박 {
  background: #FF5722;
  color: white;
}

.meeting-info {
  padding: 1rem;
}

.meeting-title {
  font-size: 1.125rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.meeting-details {
  display: flex;
  justify-content: space-between;
  color: #666;
  font-size: 0.875rem;
  margin-bottom: 1rem;
}

.meeting-host {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.host-image {
  width: 24px;
  height: 24px;
  border-radius: 50%;
}

.host-name {
  font-size: 0.875rem;
  color: #666;
}

.meeting-participants {
  font-size: 0.875rem;
  color: #333;
  font-weight: bold;
}
</style>