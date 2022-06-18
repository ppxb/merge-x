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
        <div class="anime-detail-rate">
          <div class="rate-box">
            <span class="hint-tag">TMDb</span> {{ anime.vote_average }}
          </div>
          <div class="rate-box">
            <img src="https://anilist.co/img/icons/icon.svg" class="al-tag" />
            {{ anime.cast_detail.averageScore }}
          </div>
        </div>
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
          <n-ellipsis style="max-width: 500px" line-clamp="4" :tooltip="false">
            {{
              anime.overview
                ? anime.overview.trim()
                : 'SORRY , THERE IS NO DESCRIPTION ABOUT THIS ANIME.'
            }}
          </n-ellipsis>
        </div>
        <div class="anime-detail-genres">
          <div
            class="anime-detail-genres-item"
            v-for="(genre, index) in anime.genres.slice(0, 4)"
            :key="genre.name"
          >
            <div class="divider-sm" v-if="index != 0"></div>
            {{ genre.name }}
          </div>
        </div>
        <div class="anime-detail-season">Seasons</div>
      </div>
      <div class="anime-detail-cast">
        <div
          class="anime-detail-cast-item"
          v-for="cast in anime.cast_detail.characterPreview.edges.slice(0, 5)"
        >
          <img :src="cast.node.image.large" class="cast-item-image" />
          <div class="cast-item-name">
            <div class="cast-item-name-role">Main Role</div>
            <div class="cast-item-name-native">
              <n-ellipsis :tooltip="false" style="max-width: 180px">
                {{ cast.node.name.native }}
              </n-ellipsis>
            </div>
            <div class="cast-item-name-prefer">
              <n-ellipsis :tooltip="false" style="max-width: 180px">
                {{ cast.node.name.userPreferred }}
              </n-ellipsis>
            </div>
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
const name = ref(null)

onMounted(async () => {
  let animeData = await queryAnimeDetail(id)
  const animeSeasonData = await Promise.all(
    animeData.seasons.map(item =>
      queryAnimeSeasonDetail(id, item.season_number)
    )
  )

  const castData = await useCastDataQuery(animeData.original_name)

  const finalAnimeData = {
    ...animeData,
    seasons_detail: animeSeasonData,
    cast_detail: castData.Media
  }

  anime.value = finalAnimeData
  console.log(anime.value)
})

const onSeasonSelect = value => {
  console.log(value)
}

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
  margin-bottom: 3rem;
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
  width: 260px;
  height: 400px;
  object-fit: cover;
  z-index: 999;
  border-radius: 8px;
  background-color: #222;
  margin-right: 3rem;
}

.anime-detail-info {
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  z-index: 999;
}

.anime-detail-cast {
  margin-left: auto;
  z-index: 999;
}

.anime-detail-status {
  display: flex;
  align-items: center;
}

.anime-detail-rate {
  display: flex;
  align-items: center;
  z-index: 999;
  margin-bottom: 8px;
}

.rate-box {
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  font-weight: 600;
  color: #fff;
  margin-right: 1.5rem;
}

.hint-tag {
  background-color: #f5c518;
  padding: 0 4px;
  color: #222;
  font-size: 12px;
  margin-right: 8px;
  border-radius: 2px;
  font-family: Anton;
  font-weight: 400;
}

.al-tag {
  width: 24px;
  height: 24px;
  margin-right: 8px;
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
  margin-bottom: 1rem;
}

.anime-detail-genres-item {
  display: flex;
  align-items: center;
}

.anime-detail-season {
  color: #fff;
  font-size: 1.225rem;
  z-index: 999;
  margin-bottom: 12px;
}

.divider-sm {
  width: 2px;
  height: 12px;
  margin: 0 0.875rem;
  background-color: rgba(255, 255, 255, 0.35);
}

.anime-detail-cast {
  display: flex;
  flex-direction: column;
}

.anime-detail-cast-item {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  width: 280px;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 6px;
}

.cast-item-image {
  width: 72px;
  height: 81px;
  object-fit: cover;
  margin-right: 1.1rem;
  border-radius: 6px 0 0 6px;
}

.cast-item-name {
  display: flex;
  flex-direction: column;
  color: #fff;
  padding: 4px 0;
}

.cast-item-name-role {
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
}

.cast-item-name-native {
  font-size: 1.1rem;
  font-weight: 600;
}

.cast-item-name-prefer {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.9);
}
</style>
