import { Tooltip } from '@vtex/admin-ui'
import React from 'react'
import { tooltipOpacity } from '../constants'

export interface TooltipProps {
  label?: string
  placement: "left" | "right"
}

const TooltipComponent : React.FC<TooltipProps> = props => {
	if(props.label){
		return (
			<Tooltip
				label={props.label}
				placement={props.placement}
				csx={{ opacity: tooltipOpacity }}
			>
				
				{ props.children as JSX.Element }
			</Tooltip>
		)
	}

	return <> { props.children } </>
}

export default TooltipComponent
