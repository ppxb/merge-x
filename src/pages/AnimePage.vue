<template>
  <div
    class="anime"
    v-if="anime.id"
    :style="{ backgroundImage: `url(${compactImageUrl(anime.backdrop_path)})` }"
  >
    <div class="anime-header">
      <app-icon
        name="back"
        @click="goBack"
        style="margin-left: 0; width: 2.5rem; height: 2.5rem"
      />
      <n-ellipsis
        style="max-width: 720px"
        :tooltip="false"
        class="anime-header-name"
      >
        {{ anime.name }}
      </n-ellipsis>
    </div>
    <div class="anime-detail">
      <img
        v-lazy-image="compactImageUrl(anime.poster_path)"
        class="anime-detail-poster"
      />
      <div class="anime-detail-info">
        <div class="anime-detail-status">
          <div class="anime-detail-info-second-text">TV</div>
          <div class="divider-sm"></div>
          <div class="anime-detail-info-second-text">{{ anime.status }}</div>
          <div class="divider-sm"></div>
          <div class="anime-detail-info-second-text">
            {{ anime.first_air_date.split('-')[0] }}
          </div>
          <div class="divider-sm"></div>
          <div class="anime-detail-info-second-text">Japan</div>
        </div>
        <div class="anime-detail-overview">
          <n-ellipsis style="max-width: 500px" line-clamp="6" :tooltip="false">
            {{ anime.overview.trim() }}
          </n-ellipsis>
        </div>
        <div class="anime-detail-genres">
          <div
            class="anime-detail-genres-item"
            v-for="(genre, index) in anime.genres"
            :key="genre.name"
          >
            <div class="divider-sm" v-if="index != 0"></div>
            {{ genre.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { compactImageUrl } from '../utils'

import { queryAnimeDetail, queryAnimeSeasonDetail } from '../api/rest'
import { useCastDataQuery } from '../api/graphql'

const route = useRoute()
const router = useRouter()
const { id } = route.params
const anime = ref({})

onMounted(async () => {
  let animeData = await queryAnimeDetail(id)
  const animeSeasonData = await Promise.all(
    animeData.seasons.map(item =>
      queryAnimeSeasonDetail(id, item.season_number)
    )
  )

  const data = await useCastDataQuery(animeData.original_name)
  console.log(data)

  const finalAnimeData = {
    ...animeData,
    seasons_detail: animeSeasonData
  }

  anime.value = finalAnimeData
  console.log(anime.value)
})

const goBack = () => router.back()
</script>

<style scoped>
.anime {
  height: 100vh;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  padding: 10rem 6rem 0rem 6rem;
}

.anime::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(20px);
}

.anime-header {
  display: flex;
  width: fit-content;
  z-index: 999;
  align-items: center;
  margin-bottom: 4rem;
}

.anime-header-name {
  display: flex;
  flex-direction: column;
  font-size: 2rem;
  color: #fff;
  font-weight: 600;
  z-index: 999;
  margin-left: 2rem;
}

.anime-detail {
  display: flex;
  z-index: 999;
}

.anime-detail-poster {
  width: 240px;
  height: 360px;
  object-fit: cover;
  z-index: 999;
  border-radius: 8px;
  background-color: #222;
  margin-right: 4rem;
}

.anime-detail-info {
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  z-index: 999;
}

.anime-detail-status {
  display: flex;
  align-items: center;
}

.anime-detail-info-second-text {
  color: rgba(255, 255, 255, 0.7);
}

.anime-detail-overview {
  font-size: 0.875rem;
  color: #fff;
  margin: 1rem 0 0.5rem 0;
}

.anime-detail-genres {
  display: flex;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.875rem;
  font-weight: 600;
}

.anime-detail-genres-item {
  display: flex;
  align-items: center;
}

.divider-sm {
  width: 2px;
  height: 12px;
  margin: 0 0.875rem;
  background-color: rgba(255, 255, 255, 0.35);
}
</style>
