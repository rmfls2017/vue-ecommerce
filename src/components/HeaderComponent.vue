<template>
  <header class="header">
    <div class="header-container">
      <nav class="main-nav">
        <ul class="nav-list">
          <li class="nav-item">
            <router-link to="/buy" class="nav-link" active-class="active">사줘요</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/sell" class="nav-link" active-class="active">팔아요</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/meet" class="nav-link" active-class="active">만나요</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/trend" class="nav-link" active-class="active">트렌드</router-link>
          </li>
        </ul>
      </nav>

      <div class="logo">
        <router-link to="/" class="logo-link">
          <h1>eCommerce</h1>
        </router-link>
      </div>

      <div class="search-button" @click="openSearch">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </div>
    </div>

    <!-- 검색 모달 -->
    <div v-if="isSearchOpen" class="search-modal">
      <div class="search-modal-content">
        <div class="search-input-wrapper">
          <input
              type="text"
              placeholder="검색어를 입력하세요"
              class="search-input"
              v-model="searchQuery"
              @keyup.enter="handleSearch"
          >
          <button class="search-close-button" @click="closeSearch">&times;</button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'HeaderComponent',
  data() {
    return {
      isSearchOpen: false,
      searchQuery: ''
    }
  },
  methods: {
    openSearch() {
      this.isSearchOpen = true
      setTimeout(() => {
        const input = document.querySelector('.search-input')
        if (input) input.focus()
      }, 100)
    },
    closeSearch() {
      this.isSearchOpen = false
      this.searchQuery = ''
    },
    handleSearch() {
      console.log('Search query:', this.searchQuery)
      this.closeSearch()
    }
  }
}
</script>

<style scoped>
.header {
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 2rem;
}

.main-nav {
  justify-self: start;
}

.logo {
  justify-self: center;
  text-align: center;
}

.logo h1 {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  margin: 0;
}

.search-button {
  justify-self: end;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background-color 0.2s ease;
}

.search-button:hover {
  background-color: #f0f0f0;
}

.nav-list {
  display: flex;
  gap: 2rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-link {
  text-decoration: none;
  color: #333;
  font-size: 1rem;
  font-weight: 500;
  padding: 0.5rem;
  transition: color 0.2s ease;
}

.nav-link:hover {
  color: #007bff;
}

.search-button {
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background-color 0.2s ease;
}

.search-button:hover {
  background-color: #f0f0f0;
}

/* 검색 모달 스타일 */
.search-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: white;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  animation: slideDown 0.3s ease-out;
}

@keyframes slideDown {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
}

.search-modal-content {
  max-width: 1200px;
  margin: 0 auto;
}

.search-input-wrapper {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.search-input {
  flex: 1;
  padding: 1rem;
  font-size: 1.1rem;
  border: none;
  border-bottom: 2px solid #eee;
  outline: none;
  transition: border-color 0.2s ease;
}

.search-input:focus {
  border-bottom-color: #007bff;
}

.search-close-button {
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #666;
  padding: 0.5rem;
}

.search-close-button:hover {
  color: #333;
}
</style>