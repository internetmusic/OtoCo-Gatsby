import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'

import React from 'react'

interface Props {
  icon: IconDefinition
  size?:
    | 'xs'
    | 'lg'
    | 'sm'
    | '1x'
    | '2x'
    | '3x'
    | '4x'
    | '5x'
    | '6x'
    | '7x'
    | '8x'
    | '9x'
    | '10x'
    | undefined
  spin?: boolean | undefined
}

const Icon: React.FC<Props> = ({ icon, size = '1x', spin = false }: Props) => (
  <FontAwesomeIcon icon={icon} size={size} spin={spin} />
)

export default Icon
