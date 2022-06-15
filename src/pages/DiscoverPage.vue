<template>
  <div class="discover">
    <div class="discover-title">DISCOVER & FILTER</div>
    <div class="discover-subtitle">Here are rencently trending animes.</div>
    <n-scrollbar
      style="max-height: 100vh; -webkit-app-region: no-drag"
      trigger="none"
      :on-scroll="onScroll"
    >
      <div class="discover-list">
        <div
          class="discover-list-item"
          v-for="item in discoverList"
          @click="goAnime(item.id)"
          :key="item.id"
        >
          <img
            v-lazy-image="compactImageUrl(item.poster_path)"
            class="discover-list-item-poster"
          />
          <div class="discover-item-detail">
            <div class="discover-item-origin">
              <div>{{ item.origin_country[0] }}</div>
              <div class="divider-sm"></div>
              <div style="color: #f5c518">
                {{ item.first_air_date.split('-')[0] }}
              </div>
            </div>
            <n-ellipsis
              style="max-width: 180px"
              :tooltip="false"
              class="discover-item-name"
            >
              {{ item.name }}
            </n-ellipsis>
            <div class="discover-item-rate">
              <span class="hint-tag">TMDb</span> {{ item.vote_average }}
            </div>
          </div>
          <div class="discover-item-type">TV Series</div>
        </div>
      </div>
    </n-scrollbar>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { queryDiscoverAnimeList } from '../api/rest'
import { compactImageUrl } from '../utils'

const router = useRouter()
const discoverPage = ref(1)
const discoverList = ref([])

const onScroll = e => {
  const clientHeight = e.target.clientHeight
  const scrollTop = e.target.scrollTop

  if (clientHeight + scrollTop >= discoverPage.value * 1200) {
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

const goAnime = id => {
  router.push({
    path: `/anime/${id}`
  })
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
  margin-bottom: 1.25rem;
  display: flex;
  flex-direction: column;
  position: relative;
}

.discover-list-item:hover {
  cursor: pointer;
}

.discover-list-item-poster {
  width: 210px;
  height: 300px;
  object-fit: cover;
  margin-bottom: 4px;
  border-radius: 8px;
  background-color: #222;
}

.discover-item-detail {
  display: flex;
  width: 100%;
  flex-direction: column;
  position: absolute;
  bottom: 3px;
  left: 0;
  border-radius: 0 0 8px 8px;
  background-color: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(20px);
  padding: 4px 12px 8px 12px;
}

.discover-item-origin {
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 0.875rem;
}

.discover-item-name {
  font-size: 18px;
  font-weight: 600;
}

.discover-item-rate {
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  font-weight: 600;
}

.discover-item-type {
  position: absolute;
  left: 8px;
  top: 8px;
  padding: 4px 8px;
  background-color: rgba(0, 0, 0, 0.4);
  color: #fff;
  font-size: 12px;
  border-radius: 6px;
  backdrop-filter: blur(20px);
  font-weight: 500;
}

.hint-tag {
  background-color: #f5c518;
  padding: 0 4px;
  color: #222;
  font-size: 12px;
  margin-right: 6px;
  border-radius: 2px;
  font-family: Anton;
  font-weight: 400;
}

.divider-sm {
  width: 2px;
  height: 12px;
  margin: 0 0.875rem;
  background-color: rgba(255, 255, 255, 0.35);
}
</style>
