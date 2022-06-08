import axios from 'axios'

const TMDB_API_KEY = 'bc82e6dfd48db14ca6a9139201fc58c2'
const TMDB_API_LANGUAGE = 'ja-JP'

axios.defaults.timeout = 10000
axios.defaults.baseURL = 'https://api.themoviedb.org/3'

const get = (url, params) => {
  return new Promise((resolve, reject) => {
    axios
      .get(url, { params })
      .then(res => resolve(res.data))
      .catch(err => reject(err.data))
  })
}

export const queryAnime = keyword => {
  return get(
    `/search/tv?api_key=${TMDB_API_KEY}&query=${keyword}&language=${TMDB_API_LANGUAGE}`
  )
}

// https://api.themoviedb.org/3/tv/83095?api_key=bc82e6dfd48db14ca6a9139201fc58c2&language=ja-JP
export const queryAnimeDetail = id => {
  return get(`/tv/${id}?api_key=${TMDB_API_KEY}&language=${TMDB_API_LANGUAGE}`)
}

export const queryAnimeSeasonDetail = (id, season) => {
  return get(
    `/tv/${id}/season/${season}?api_key=${TMDB_API_KEY}&language=${TMDB_API_LANGUAGE}`
  )
}