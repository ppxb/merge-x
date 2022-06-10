<template>
  <div class="home">
    <AppHeader />
    <n-carousel
      autoplay
      effect="fade"
      direction="horizontal"
      dot-type="line"
      dot-placement="right"
      :interval="8000"
      style="z-index: 999"
    >
      <div
        class="home-carousel-item"
        v-for="anime in carouselList"
        :key="anime.id"
        :style="{
          backgroundImage: `url(${compactImageUrl(anime.backdrop_path)})`
        }"
      >
        <div class="home-carousel-item-status">
          <div class="home-carousel-item-status-rate">
            <span class="hint-tag">TMDB</span> {{ anime.vote_average }}
          </div>
          <div class="home-carousel-item-status-text">
            {{ anime.status }}
          </div>
          <div class="home-carousel-item-status-season">
            Season {{ anime.season_detail.season_number }}
          </div>
        </div>
        <div class="home-carousel-item-title">
          <n-ellipsis style="max-width: 720px" :tooltip="false">
            {{ anime.name }}
          </n-ellipsis>
        </div>
        <div class="home-carousel-item-season">
          <div class="season-year">
            {{ anime.first_air_date.split('-')[0] }}
          </div>
          <div class="divider"></div>
          <div>{{ anime.episode_run_time[0] }} Mins</div>
          <div class="divider"></div>
          <div>
            {{
              anime.seasons[anime.seasons.length - 1].episode_count === 0
                ? anime.seasons[anime.seasons.length - 2].episode_count
                : anime.seasons[anime.seasons.length - 1].episode_count
            }}
            Episode
          </div>
          <div class="divider"></div>
          <div>{{ anime.spoken_languages[0].english_name }}</div>
        </div>
        <div class="home-carousel-item-overview">
          <n-ellipsis style="max-width: 560px" line-clamp="3" :tooltip="false">
            {{ anime.overview.trim() }}
          </n-ellipsis>
        </div>
        <div class="home-carousel-item-more">了解更多</div>
        <div class="home-carousel-item-episode">
          <div
            v-for="episode in anime.season_detail.episodes.slice(0, 3)"
            class="episode-item"
            :style="{
              backgroundImage: `url(${compactLowImageUrl(episode.still_path)})`
            }"
          >
            <div class="episode-item-detail">
              <n-ellipsis style="max-width: 180px" :tooltip="false">
                EP.{{ episode.episode_number }} # {{ episode.name }}
              </n-ellipsis>
              <div class="episode-item-detail-text">
                <div class="title">{{ episode.air_date }}</div>
                <div class="divider-sm"></div>
                <div class="title">{{ episode.runtime }} Mins</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <template #dots="{ total, currentIndex, to }">
        <ul class="custom-dots">
          <li
            v-for="index of total"
            :key="index"
            :class="{ ['is-active']: currentIndex === index - 1 }"
            @click="to(index - 1)"
          />
        </ul>
      </template>
    </n-carousel>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import {
  queryAnimeDetail,
  queryAnimeSeasonDetail,
  queryDiscoverAnimeList
} from '../api/rest'
import {
  compactImageUrl,
  compactLowImageUrl,
  getRandomAnimeList
} from '../utils'

import AppHeader from '../components/AppHeader.vue'

const carouselList = ref([])

onMounted(async () => {
  const originCarouselData = await queryDiscoverAnimeList(1, 2022)
  const carouselNeedQueryList = getRandomAnimeList(
    originCarouselData.results,
    5
  )
  const carouselDetailData = await Promise.all(
    carouselNeedQueryList.map(item => queryAnimeDetail(item.id))
  )

  const animeSeasonData = await Promise.all(
    carouselDetailData.map(item => {
      const currentSeason = item.seasons
        .filter(season => season.episode_count > 0 && season.season_number > 0)
        .pop()
      return queryAnimeSeasonDetail(item.id, currentSeason.season_number)
    })
  )

  animeSeasonData.map(item => {
    for (let i = 0; i < carouselDetailData.length; i++) {
      if (carouselDetailData[i].seasons.some(season => season.id === item.id)) {
        carouselDetailData[i] = {
          ...carouselDetailData[i],
          ...{ season_detail: item }
        }
        continue
      }
    }
  })

  carouselList.value = carouselDetailData
})
</script>

<style scoped>
.home {
  height: 100vh;
}

.home-carousel-item {
  width: 100%;
  height: 100vh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 6rem;
  z-index: 999;
}

.home-carousel-item::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: linear-gradient(
    0deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 0.3) 45%,
    rgba(0, 0, 0, 0.15) 55%,
    rgba(0, 0, 0, 1) 100%
  );
}

.home-carousel-item-status {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  z-index: 999;
}

.home-carousel-item-status-rate {
  padding: 2px 10px;
  background-color: #c8e608;
  color: #222;
  font-size: 12px;
  font-weight: 700;
  border-radius: 12px 4px;
  margin-right: 1rem;
}

.hint-tag {
  margin-right: 6px;
}
.home-carousel-item-status-text {
  padding: 2px 10px;
  background-color: #4e5d02;
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  border-radius: 12px 4px;
  margin-right: 1rem;
}

.home-carousel-item-status-season {
  padding: 2px 10px;
  background-color: #d7be6e;
  color: #222;
  font-size: 12px;
  font-weight: 600;
  border-radius: 12px 4px;
}

.home-carousel-item-title {
  color: #fff;
  font-size: 3rem;
  font-weight: 700;
  z-index: 999;
}

.home-carousel-item-season {
  display: flex;
  font-size: 1rem;
  align-items: center;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
  z-index: 999;
  margin-bottom: 1.25rem;
}

.divider {
  width: 2px;
  height: 1rem;
  margin: 0 1rem;
  background-color: rgba(255, 255, 255, 0.35);
}

.home-carousel-item-overview {
  font-size: 0.875rem;
  line-height: 1.5rem;
  color: rgba(255, 255, 255, 0.95);
  z-index: 999;
  margin-bottom: 1rem;
}

.home-carousel-item-more {
  border: none;
  width: fit-content;
  padding: 8px 24px;
  z-index: 999;
  font-size: 0.875rem;
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.7);
  background-color: rgba(255, 255, 255, 0.25);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(20px);
}

.home-carousel-item-more:hover {
  cursor: pointer;
  color: #fff;
  background-color: rgba(255, 255, 255, 0.35);
}

.home-carousel-item-episode {
  display: flex;
  position: absolute;
  bottom: 2.5rem;
  right: 2.5rem;
  z-index: 999;
}

.episode-item {
  width: 220px;
  height: 120px;
  margin-left: 1.5rem;
  border-radius: 12px;
  display: flex;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  align-items: flex-end;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.episode-item:hover {
  cursor: pointer;
  box-shadow: 2px 4px 32px rgba(0, 0, 0, 0.3);
}

.episode-item-detail {
  width: 100%;
  padding: 6px 12px;
  backdrop-filter: blur(20px);
  background-color: rgba(0, 0, 0, 0.4);
  color: #fff;
  display: flex;
  flex-direction: column;
}

.episode-item-detail-text {
  display: flex;
  align-items: center;
}

.episode-item-detail-text .title {
  margin-top: 2px;
  color: rgba(255, 255, 255, 0.5);
}

.divider-sm {
  width: 2px;
  height: 12px;
  margin: 0 0.875rem;
  background-color: rgba(255, 255, 255, 0.35);
}

.custom-dots {
  display: flex;
  margin: 0;
  padding: 0;
  position: absolute;
  bottom: 3.5rem;
  left: 6rem;
}

.custom-dots li {
  display: inline-block;
  width: 16px;
  height: 4px;
  margin: 0 3px;
  border-radius: 6px;
  background-color: rgba(255, 255, 255, 0.4);
  transition: width 0.3s, background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.custom-dots li.is-active {
  width: 40px;
  background: #fff;
}
</style>
