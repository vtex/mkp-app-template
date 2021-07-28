import React, { FC } from 'react'
import { ThemeProvider } from '@vtex/admin-ui'

import MainPanel from './areas/MainPanel'

const AdminPanel: FC = () => {
  return <ThemeProvider> {<MainPanel />} </ThemeProvider>
}

export default AdminPanel
