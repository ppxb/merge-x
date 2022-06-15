import { gql } from 'graphql-tag'
import { useQuery } from 'villus'

const CastDataQuery = gql`
  query (
    $type: MediaType
    $search: String
    $sort: [MediaSort] = [POPULARITY_DESC, SCORE_DESC]
  ) {
    Media(search: $search, type: $type, sort: $sort) {
      title {
        userPreferred
        native
      }
      characterPreview: characters(perPage: 6, sort: [ROLE, RELEVANCE, ID]) {
        edges {
          voiceActors(language: JAPANESE, sort: [RELEVANCE, ID]) {
            id
            name {
              userPreferred
            }
            language: languageV2
            image {
              large
            }
          }
          node {
            id
            name {
              userPreferred
            }
            image {
              large
            }
          }
        }
      }
      averageScore
    }
  }
`

export const useCastDataQuery = async keyword => {
  const { data } = await useQuery({
    query: CastDataQuery,
    variables: { type: 'ANIME', sort: 'SEARCH_MATCH', search: `"${keyword}` }
  })

  return data.value
}
