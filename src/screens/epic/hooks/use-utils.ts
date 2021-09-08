import { useProjectIdInUrl } from 'screens/project/hooks/use-url'
export const useEpicSearchParams = () => ({ projectId: useProjectIdInUrl() })
export const useEpicsQueryKey = () => ['epics', useEpicSearchParams()]
