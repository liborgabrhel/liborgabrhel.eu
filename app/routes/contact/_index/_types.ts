import type { SEARCH_PARAMS } from '~/constants/search-params'

export type Via = 'default' | keyof typeof SEARCH_PARAMS.via.values
