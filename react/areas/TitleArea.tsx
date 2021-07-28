import React, { FC } from 'react'
import { Grid, Label, Box, Divider } from '@vtex/admin-ui'
import { useIntl } from 'react-intl'

const TitleArea: FC = () => {
  const intl = useIntl()

  return (
    <Grid.Item area="title">
      <Box csx={{ marginY: 5 }}>
        <Label
          csx={{
            fontSettings: 'bold',
            fontSize: 32,
            textAlign: 'left',
          }}
        >
          { intl.formatMessage( { id: "admin/mkp-app-template.title" } ) }
        </Label>
      </Box>
      <Divider />
    </Grid.Item>
  )
}

export default TitleArea
