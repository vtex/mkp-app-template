import { Spinner } from '@vtex/admin-ui'
import type { FC } from 'react'
import React from 'react'
import { useQuery } from 'react-apollo'
import getConfig from '../graphql/getConfig.gql'
import { useRuntime } from 'vtex.render-runtime'


const MkpCategoryMapperRedirect: FC = () => {
  const { navigate } = useRuntime()
  console.log("here")
  const { data } = useQuery(getConfig, {
    onCompleted: () => {
      console.log(data)
      if (!!data.getConfiguration.mapperId )
      navigate({
        page: 'admin.app.mkp-category-mapper',
        params: {
          marketplaceId: data.getConfiguration.mapperId,
        },
      })
    },
  })
  return (

    <div className="w-100 vh-50 flex items-center justify-center">
      <div className="w-100 flex justify-center">
        <Spinner />
      </div>
    </div>
  )
}

export default MkpCategoryMapperRedirect

