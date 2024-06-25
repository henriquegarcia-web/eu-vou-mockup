import React, { createContext, useContext, useMemo, useState } from 'react'

import { ITemplateContextData } from '@/@types/contexts'

export const TemplateContext = createContext<ITemplateContextData>(
  {} as ITemplateContextData
)

const TemplateProvider = ({ children }: { children: React.ReactNode }) => {
  // ========================================================================

  const [isTemplate, setIsTemplate] = useState<boolean>(false)

  // ========================================================================

  const TemplateContextData: ITemplateContextData = useMemo(() => {
    return {
      isTemplate
    }
  }, [isTemplate])

  return (
    <TemplateContext.Provider value={TemplateContextData}>
      {children}
    </TemplateContext.Provider>
  )
}

function useTemplate(): ITemplateContextData {
  const context = useContext(TemplateContext)

  if (!context) throw new Error('useAuth must be used within a UserProvider')

  return context
}

export { TemplateProvider, useTemplate }
