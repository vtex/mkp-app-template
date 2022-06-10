import type { FC, ReactNode } from 'react'
import React, { createContext, useContext } from 'react'

interface SalesChannelCreationState {
  salesChannelConfig: SalesChannel
  setSalesChannelConfig: React.Dispatch<React.SetStateAction<SalesChannel>>
}

interface SalesChannelCreationProps extends SalesChannelCreationState {
  children: ReactNode
}

const SalesChannelCreationContext = createContext<SalesChannelCreationState>({
  salesChannelConfig: {} as SalesChannel,
  setSalesChannelConfig: () => {}
})

export const SalesChannelCreationContextProvider: FC<SalesChannelCreationProps> = ({ children, salesChannelConfig, setSalesChannelConfig}) => {

  return (
    <SalesChannelCreationContext.Provider
      value={{
        salesChannelConfig: salesChannelConfig,
        setSalesChannelConfig: setSalesChannelConfig
      }}
    >
      {children}
    </SalesChannelCreationContext.Provider>
  )
}

export const useSalesChannelCreationContext = () => useContext(SalesChannelCreationContext)
