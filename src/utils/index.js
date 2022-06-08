export const formatAnimeName = name => {
  const tempName = name.trim().toLowerCase()

  if (tempName.indexOf(':') > -1) return tempName.split(':')[0]
  if (tempName.includes('season')) return tempName.split('season')[0]
  return name
}

export const getCorrectAnimeObject = list =>
  list.length > 0 &&
  list.map(
    anime => anime.results.filter(data => data.genre_ids.includes(16))[0]
  )

export const compactImageUrl = imgUrl =>
  `https://image.tmdb.org/t/p/w1280${imgUrl}`
