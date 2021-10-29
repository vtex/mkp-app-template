import type { FC } from 'react'
import React from 'react'
import { ThemeProvider } from '@vtex/admin-ui'

import MainPanel from './areas/MainPanel'

const AdminPanel: FC = () => {
  return <ThemeProvider> {<MainPanel />} </ThemeProvider>
}

export default AdminPanel
