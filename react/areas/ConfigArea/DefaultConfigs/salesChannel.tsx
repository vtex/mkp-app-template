import { Box } from "@vtex/admin-ui"
import React from "react"
import InputComponent from "../../../components/InputComponent"
import SelectComponent from "../../../components/SelectComponent"
import { DefaultProps } from "../props"

export interface SalesChannelProps extends DefaultProps {
  setConfig: React.Dispatch<React.SetStateAction<Configuration>>
  sc: SalesChannel[] | undefined
}

const SalesChannel: React.FC<SalesChannelProps> = ({ intl, config, setConfig, sc }) => {
  const salesChannelSelected = sc?.find(x => x.Id === config.salesChannel)
  const cultureInfo = salesChannelSelected?.CountryCode ?? ""
  const salesChannelName = salesChannelSelected?.Name ?? ""

  return (
    <Box
      csx={{ display: 'flex', alignItems: 'center' }}
    >
      <Box csx={{ flexGrow: 1 }}>
        <SelectComponent
          items={sc?.map(sc => { return sc.Name }) ?? []}
          initialSelectedItem={salesChannelName}
          label={intl.formatMessage({ id: 'admin/mkp-app-template.salesChannel.title' })}
          canEdit={true}
          tooltip={intl.formatMessage({ id: 'admin/mkp-app-template.salesChannel.tooltip' })}
          onChange={selectState => {
              if(selectState){
                var salesChannelId = sc?.find(x => x.Name === selectState)?.Id!
                setConfig(oldConfig => ({
                  ...oldConfig,
                  salesChannel: salesChannelId,
                }))
              }
            }
          }
        />
      </Box>
      <Box>
        <InputComponent
          id={'cultureInfo'}
          name={intl.formatMessage({ id: 'admin/mkp-app-template.cultureInfo.title' })}
          canEdit={false}
          initValue={cultureInfo}
          type={'text'}
          csx={{ width: 75 }}
        />
      </Box>
    </Box>
  )
}

export default SalesChannel
