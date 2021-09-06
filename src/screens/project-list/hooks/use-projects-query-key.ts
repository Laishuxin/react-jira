import { useProjectsSearchParams } from './use-projects-search-params'

export const useProjectsQueryKey = () => [
  'projects',
  useProjectsSearchParams()[0],
]
