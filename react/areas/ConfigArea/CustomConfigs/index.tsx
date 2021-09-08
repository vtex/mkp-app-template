import React from 'react'
import { DefaultProps } from '../../../typings/props'

export interface CustomConfigsProps extends DefaultProps {
  setConfig: React.Dispatch<React.SetStateAction<Configuration>>
}

const CustomConfigsArea: React.FC<CustomConfigsProps> = () => {
  return (
    <div>      
      
    </div>
  )
}

export default CustomConfigsArea
