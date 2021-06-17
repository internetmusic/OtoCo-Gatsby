// Import all js dependencies.
import 'bootstrap/js/dist/dropdown'
import 'bootstrap/js/dist/modal'
import './src/scss/main.scss'

import wrapWithProvider from './wrap-with-provider'
export const wrapRootElement = wrapWithProvider

export const onServiceWorkerUpdateReady = () => window.location.reload()
