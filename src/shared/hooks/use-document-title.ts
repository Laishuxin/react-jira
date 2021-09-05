import { useEffect, useRef } from 'react'

export const useDocumentTitle = (newTitle: string, keepUnMount = false) => {
  const oldTitle = useRef(document.title)

  useEffect(() => {
    document.title = newTitle
    return () => {
      if (!keepUnMount) {
        document.title = oldTitle.current
      }
    }
  }, [oldTitle, keepUnMount, newTitle])
}
