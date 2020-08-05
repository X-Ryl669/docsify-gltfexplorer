import { install } from './gltfexplorer'

if (!window.$docsify) {
  window.$docsify = {}
}

window.$docsify.plugins = (window.$docsify.plugins || []).concat(install)
