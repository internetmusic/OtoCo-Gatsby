import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library, IconName } from '@fortawesome/fontawesome-svg-core'
import {
  faCog,
  faTimes,
  faExclamationTriangle,
  faCopy,
  faDownload,
} from '@fortawesome/free-solid-svg-icons'
import React from 'react'

import './style.scss'

library.add(faCog, faTimes, faCopy, faExclamationTriangle, faDownload)

interface Props {
  name: IconName
  title: string
}

const Icon: React.FC<Props> = ({ name, title }: Props) => (
  <div className="icon" title={title}>
    <FontAwesomeIcon icon={['fab', name as IconName]} />
  </div>
)

export default Icon
