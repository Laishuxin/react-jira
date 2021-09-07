import styled from '@emotion/styled'
import { ScreenContainer } from 'components/common/lib'
import React from 'react'
import { useDocumentTitle } from 'shared/hooks/use-document-title'
import { useKanbans } from 'shared/hooks/use-kanban'
import { useKanbanSearchParams, useProjectInUrl } from './hooks/use-url'
import { KanbanColumn } from './kanban-column'
import { SearchPanel } from './search-panel'

export const KanbanScreen = () => {
  useDocumentTitle('看板列表')
  const { data: kanbans = [] } = useKanbans(useKanbanSearchParams())
  const { data: currentProject } = useProjectInUrl()

  return (
    <ScreenContainer>
      <h1>{currentProject?.name}看板</h1>
      <SearchPanel />
      <ColumnContainer>
        {kanbans.map(kanban => (
          <KanbanColumn key={kanban.id} kanban={kanban} />
        ))}
      </ColumnContainer>
    </ScreenContainer>
  )
}

const ColumnContainer = styled('div')`
  display: flex;
  flex: 1;
  overflow-x: scroll;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
`
