import { gql } from 'graphql-tag'
import { useQuery } from 'villus'

const HomeDataQuery = gql`
  query (
    $id: Int
    $type: MediaType
    $season: MediaSeason
    $seasonYear: Int
    $format: [MediaFormat]
    $sort: [MediaSort] = [POPULARITY_DESC, SCORE_DESC]
  ) {
    Page(page: 1, perPage: 20) {
      media(
        id: $id
        type: $type
        season: $season
        seasonYear: $seasonYear
        sort: $sort
        format_in: $format
      ) {
        id
        title {
          native
        }
        coverImage {
          extraLarge
          large
          color
        }
        bannerImage
        season
        description
        averageScore
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
      type: 'ANIME',
      format: 'TV'
    }
  })

  return data.value
}
