<template>
  <div class="home">
    <AppHeader />
    <n-carousel
      autoplay
      effect="fade"
      direction="horizontal"
      dot-type="line"
      dot-placement="right"
    >
      <div
        class="home-carousel-item"
        v-for="anime in carouselList"
        :key="anime.id"
        :style="{
          backgroundImage: `url(${compactImageUrl(anime.backdrop_path)})`
        }"
      >
        <div class="home-carousel-item-title">
          <n-ellipsis style="max-width: 800px">
            {{ anime.name }}
          </n-ellipsis>
        </div>
        <div class="home-carousel-item-season">
          <div class="season-year">
            {{ anime.first_air_date.split('-')[0] }}
          </div>
          <div>{{ anime.episode_run_time[0] }} minut</div>
          <div>
            {{ anime.seasons[anime.seasons.length - 1].episode_count }} Episode
          </div>
          <div>{{ anime.spoken_languages[0].name }}</div>
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
import { queryAnime, queryAnimeDetail } from '../api/rest'
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
  const queryAnimeList = originAnimeNameList.map(item => queryAnime(item))
  const queryData = await Promise.all(queryAnimeList)
  const tempQueryData = getCorrectAnimeObject(queryData)
  carouselList.value = await Promise.all(
    tempQueryData.map(item => queryAnimeDetail(item.id))
  )
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
}

.home-carousel-item::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 0.15) 25%,
    rgba(0, 0, 0, 0.15) 55%,
    rgba(0, 0, 0, 1) 100%
  );
}

.home-carousel-item-title {
  color: #fff;
  font-size: 3.5rem;
  font-weight: 700;
  z-index: 999;
}

.home-carousel-item-season {
  display: flex;
  font-size: 1.125rem;
  color: #fff;
  z-index: 999;
}

.home-carousel-item-season div {
  margin-right: 1.5rem;
  padding-right: 1rem;
  border-right: 2px solid rgba(255, 255, 255, 0.7);
}

.home-carousel-item-season div:last-child {
  padding-right: 0;
  border-right: none;
}

.season-year {
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
