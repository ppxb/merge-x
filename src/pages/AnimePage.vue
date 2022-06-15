<template>
  <div></div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import { queryAnimeDetail } from '../api/rest'

const route = useRoute()
const { id } = route.params
const anime = ref(null)

onMounted(async () => {
  const animeData = await queryAnimeDetail(id)
  anime.value = animeData
  console.log(anime.value)
})
</script>
