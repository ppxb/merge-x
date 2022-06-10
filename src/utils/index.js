export const compactImageUrl = imgUrl =>
  `https://image.tmdb.org/t/p/w1280${imgUrl}`

export const compactLowImageUrl = imgUrl =>
  `https://image.tmdb.org/t/p/w227_and_h127_bestv2/${imgUrl}`

export const getRandomAnimeList = (arr, num) => {
  const res = []
  for (let i = 0; i < num; ) {
    const random = Math.floor(Math.random() * arr.length)
    if (arr[random].vote_average < 6) continue
    if (res.indexOf(arr[random]) !== -1) continue
    res.push(arr[random])
    i++
  }
  return res
}
