<template>
  <div class="discover">
    <div class="discover-title">DISCOVER & FILTER</div>
    <div class="discover-subtitle">Here are rencently trending animes.</div>
    <n-scrollbar style="max-height: 100vh" trigger="none" :on-scroll="onScroll">
      <div class="discover-list">
        <div
          class="discover-list-item"
          v-for="item in discoverList"
          :key="item.id"
        >
          <img
            v-lazy-image="compactImageUrl(item.poster_path)"
            class="discover-list-item-poster"
          />
          <n-ellipsis
            style="max-width: 180px"
            :tooltip="false"
            class="discover-item-name"
          >
            {{ item.name }}
          </n-ellipsis>
          <div class="discover-item-info">
            <div class="discover-item-info-text">
              {{ item.first_air_date.split('-')[0] }}
            </div>
            <div class="divider-sm"></div>
            <div class="discover-item-info-text">TV</div>
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

const discoverPage = ref(1)
const discoverList = ref([])

const onScroll = e => {
  const clientHeight = e.target.clientHeight
  const scrollTop = e.target.scrollTop
  if (clientHeight + scrollTop >= discoverPage.value * 2000) {
    discoverPage.value++
    fetchData()
  }
}

onMounted(async () => {
  const { results } = await queryDiscoverAnimeList(discoverPage.value)
  discoverList.value = results
})

const fetchData = async () => {
  const { results } = await queryDiscoverAnimeList(discoverPage.value)
  if (results === []) return
  discoverList.value = [...discoverList.value, ...results]
}
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
  margin-bottom: 1rem;
}

.discover-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 6rem;
}

.discover-list-item {
  flex-basis: 200px;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  position: relative;
}

.discover-list-item:hover {
  cursor: pointer;
}

.discover-list-item-poster {
  width: 100%;
  height: 280px;
  object-fit: cover;
  margin-bottom: 6px;
  border-radius: 8px;
  background-color: #222;
}

.discover-item-name {
  font-size: 1.225rem;
  font-weight: 600;
}

.discover-item-info {
  display: flex;
  align-items: center;
}

.discover-item-info-text {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.7);
}

.discover-item-rate {
  position: absolute;
  left: 8px;
  bottom: 4.25rem;
  padding: 2px 10px;
  background-color: rgba(0, 0, 0, 0.6);
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

.divider-sm {
  width: 2px;
  height: 12px;
  margin: 0 0.875rem;
  background-color: rgba(255, 255, 255, 0.35);
}
</style>
