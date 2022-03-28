import type { FC } from 'react'
import React from 'react'
import { ThemeProvider } from '@vtex/admin-ui'
import MkpCategoryMapperRedirect from './components/MkpCategoryMapperRedirect'


const MkpCategoryMapperSpinner: FC = () => {
  return <ThemeProvider> {<MkpCategoryMapperRedirect />} </ThemeProvider>
}

export default MkpCategoryMapperSpinner
