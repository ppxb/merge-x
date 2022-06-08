import { gql } from 'graphql-tag'
import { useQuery } from 'villus'

const HomeDataQuery = gql`
  query (
    $id: Int
    $type: MediaType
    $season: MediaSeason
    $seasonYear: Int
    $sort: [MediaSort] = [POPULARITY_DESC, SCORE_DESC]
  ) {
    Page(page: 1, perPage: 5) {
      media(
        id: $id
        type: $type
        season: $season
        seasonYear: $seasonYear
        sort: $sort
      ) {
        id
        title {
          userPreferred
        }
        coverImage {
          extraLarge
          large
          color
        }
        bannerImage
        season
        description
      }
    }
  }
`

export const useHomeDataQuery = async () => {
  const { data } = await useQuery({
    query: HomeDataQuery,
    variables: {
      season: 'SPRING',
      seasonYear: 2022,
      type: 'ANIME'
    }
  })

  return data.value
}
