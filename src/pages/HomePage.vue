<template>
  <div class="home">
    <AppHeader />
    <n-carousel
      autoplay
      effect="fade"
      direction="horizontal"
      dot-type="line"
      dot-placement="right"
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
          <div>{{ anime.episode_run_time[0] }} Minut</div>
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
            {{ anime.overview }}
          </n-ellipsis>
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
  queryAnime,
  queryAnimeDetail,
  queryAnimeSeasonDetail
} from '../api/rest'
import {
  getCorrectAnimeObject,
  formatAnimeName,
  compactImageUrl
} from '../utils'
import { useHomeDataQuery } from '../api/graphql'

import AppHeader from '../components/AppHeader.vue'

const carouselList = ref([])

onMounted(async () => {
  const result = await useHomeDataQuery()
  const originAnimeNameList = result.Page.media.map(item =>
    formatAnimeName(item.title.userPreferred)
  )
  const animeData = await Promise.all(
    originAnimeNameList.map(item => queryAnime(item))
  )
  const temp = getCorrectAnimeObject(animeData)
  const animeDetailData = await Promise.all(
    temp.map(item => queryAnimeDetail(item.id))
  )
  const animeSeasonData = await Promise.all(
    animeDetailData.map(item => {
      const currentSeason = item.seasons
        .filter(season => season.episode_count > 0 && season.season_number > 0)
        .pop()
      return queryAnimeSeasonDetail(item.id, currentSeason.season_number)
    })
  )

  animeSeasonData.map(item => {
    for (let i = 0; i < animeDetailData.length; i++) {
      if (animeDetailData[i].seasons.some(season => season.id === item.id)) {
        animeDetailData[i] = Object.assign(animeDetailData[i], {
          season_detail: item
        })
        continue
      }
    }
  })

  carouselList.value = animeDetailData
  console.log(carouselList.value)
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
    rgba(0, 0, 0, 0.15) 25%,
    rgba(0, 0, 0, 0.15) 55%,
    rgba(0, 0, 0, 1) 100%
  );
}

.home-carousel-item-status {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  z-index: 999;
}

.home-carousel-item-status-rate {
  padding: 2px 10px;
  background-color: #c8e608;
  color: #222;
  font-size: 12px;
  font-weight: 700;
  border-radius: 14px 6px;
  margin-right: 12px;
}

.hint-tag {
  margin-right: 8px;
}
.home-carousel-item-status-text {
  padding: 2px 10px;
  background-color: #4e5d02;
  color: #fff;
  font-size: 12px;
  border-radius: 12px 6px;
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
  color: rgba(255, 255, 255, 0.85);
  font-weight: 500;
  z-index: 999;
  margin-bottom: 1.5rem;
}

.divider {
  width: 2px;
  height: 1rem;
  margin: 0 1rem;
  background-color: rgba(255, 255, 255, 0.45);
}

.home-carousel-item-overview {
  font-size: 1rem;
  line-height: 1.875rem;
  color: rgba(255, 255, 255, 0.95);
  z-index: 999;
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
