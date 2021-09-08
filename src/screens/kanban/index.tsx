import styled from '@emotion/styled'
import { LargeSpin, ScreenContainer } from 'components/common/lib'
import React, { Fragment } from 'react'
import { useDocumentTitle } from 'shared/hooks/use-document-title'
import { useKanbans } from 'shared/hooks/use-kanban'
import { useTasks } from 'shared/hooks/use-tasks'
import { CreateKanban } from './create-kanban'
import {
  useKanbanSearchParams,
  useProjectInUrl,
  useTasksSearchParams,
} from './hooks/use-url'
import { KanbanColumn } from './kanban-column'
import { SearchPanel } from './search-panel'
import { TasksModal } from './tasks-modal'

export const KanbanScreen = () => {
  useDocumentTitle('看板列表')
  const { data: kanbans = [], isLoading: isKanbanLoading } = useKanbans(
    useKanbanSearchParams(),
  )
  const { isLoading: isTasksLoading } = useTasks(useTasksSearchParams())
  const isLoading = isKanbanLoading || isTasksLoading
  const { data: currentProject } = useProjectInUrl()

  return (
    <ScreenContainer>
      <h1>{currentProject?.name}看板</h1>
      <SearchPanel />
      <ColumnContainer>
        {isLoading ? (
          <LargeSpin style={{ width: '100%' }} />
        ) : (
          <Fragment>
            {kanbans.map(kanban => (
              <KanbanColumn key={kanban.id} kanban={kanban} />
            ))}
            <CreateKanban />
          </Fragment>
        )}
      </ColumnContainer>
      <TasksModal />
    </ScreenContainer>
  )
}

export const ColumnContainer = styled('div')`
  display: flex;
  flex: 1;
  width: 100%;
  overflow-x: auto;
  scrollbar-width: thin;
`
