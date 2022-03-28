import { Spinner } from '@vtex/admin-ui'
import { FC, useState } from 'react'
import React from 'react'
import { useQuery } from 'react-apollo'
import getConfig from '../graphql/getConfig.gql'
import { useRuntime } from 'vtex.render-runtime'


const MkpCategoryMapperRedirect: FC = () => {
  const { navigate } = useRuntime()
  const [idNotFound, setIdNotFound] = useState(false)
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
      else
        setIdNotFound(true)
    },
  })

  if (idNotFound)
  {
    return (<div>{"Mapper Id not found, please "}</div>)
  }

  return (

    <div className="w-100 vh-50 flex items-center justify-center">
      <div className="w-100 flex justify-center">
        {idNotFound ? (<div>{"Mapper Id not found, please activate the integration"}</div>) :<Spinner /> }

      </div>
    </div>
  )
}

export default MkpCategoryMapperRedirect

