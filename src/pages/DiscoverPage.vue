<template>
  <div class="discover">
    <div class="discover-title">DISCOVER & FILTER</div>
    <div class="discover-subtitle">Show you what you want.</div>
    <n-scrollbar style="max-height: 100vh" trigger="none">
      <div class="discover-list">
        <div
          class="discover-list-item"
          v-for="item in discoverList"
          :key="item.id"
        >
          <img
            :src="compactImageUrl(item.poster_path)"
            class="discover-list-item-poster"
          />
          <n-ellipsis
            style="max-width: 180px"
            :tooltip="false"
            class="discover-item-name"
          >
            {{ item.name }}
          </n-ellipsis>
          <div class="discover-item-year">
            {{ item.first_air_date.split('-')[0] }}
          </div>
          <div class="discover-item-rate">
            <span class="hint-tag">TMDB</span>{{ item.vote_average }}
          </div>
        </div>
      </div>
    </n-scrollbar>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { queryDiscoverAnimeList } from '../api/rest'
import { compactImageUrl } from '../utils'

const discoverList = ref([])

onMounted(async () => {
  const { results } = await queryDiscoverAnimeList(1, 2022)
  discoverList.value = results
})
</script>

<style scoped>
.discover {
  height: 100vh;
  padding: 10rem 6rem 0rem 6rem;
  color: #fff;
  overflow: hidden;
}

.discover-title {
  font-size: 2rem;
  font-weight: 600;
}

.discover-subtitle {
  color: rgba(255, 255, 255, 0.7);
}

.discover-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 6rem;
}

.discover-list-item {
  flex-basis: 200px;
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  position: relative;
}

.discover-list-item-poster {
  width: 100%;
  height: 280px;
  object-fit: cover;
  margin-bottom: 4px;
  border-radius: 8px;
}

.discover-item-name {
  font-size: 1.225rem;
  font-weight: 600;
}

.discover-item-year {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.7);
}

.discover-item-rate {
  position: absolute;
  right: 8px;
  top: 8px;
  padding: 2px 10px;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: 12px;
  border-radius: 6px;
  backdrop-filter: blur(20px);
  font-weight: 500;
}

.hint-tag {
  color: #c8e608;
  margin-right: 6px;
  font-weight: 700;
}
</style>
