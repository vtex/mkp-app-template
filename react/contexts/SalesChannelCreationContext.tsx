import type { FC, ReactNode } from 'react'
import React, { createContext, useContext } from 'react'

interface SalesChannelCreationState {
  salesChannelData: SalesChannel
  setSalesChannelData: React.Dispatch<React.SetStateAction<SalesChannel>>
}

interface SalesChannelCreationProps extends SalesChannelCreationState {
  children: ReactNode
}

const SalesChannelCreationContext = createContext<SalesChannelCreationState>({
  salesChannelData: {} as SalesChannel,
  setSalesChannelData: () => {}
})

export const SalesChannelCreationContextProvider: FC<SalesChannelCreationProps> = ({ children, salesChannelData, setSalesChannelData}) => {

  return (
    <SalesChannelCreationContext.Provider
      value={{
        salesChannelData: salesChannelData,
        setSalesChannelData: setSalesChannelData
      }}
    >
      {children}
    </SalesChannelCreationContext.Provider>
  )
}

export const useSalesChannelCreationContext = () => useContext(SalesChannelCreationContext)
