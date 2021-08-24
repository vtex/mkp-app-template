import { Tooltip } from '@vtex/admin-ui'
import React from 'react'
import { tooltipOpacity } from '../constants'

export interface TooltipProps {
  label?: string
  placement: "left" | "right"
}

const TooltipComponent : React.FC<TooltipProps> = ({
	placement,
	label,
	children
}) => {
	if(label){
		return (
			<Tooltip
				label={label}
				placement={placement}
				csx={{ opacity: tooltipOpacity }}
			>
				
				{ children as JSX.Element }
			</Tooltip>
		)
	}

	return <> { children } </>
}

export default TooltipComponent
