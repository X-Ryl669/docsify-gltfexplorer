//import skin from './skin'
//import { encode } from 'plantuml-encoder'
//import { GLTFExplorer } from './explorer'

var LANG = 'gltf'
var SELECTOR = 'pre[data-lang="' + LANG + '"]'

function insertCode(content, config) {
//  var elementHTML = `<div id='gltfExplorer' class='dark' style="height: 80vh; position: absolute"><ul><li><a href="javascript:selectObject(false)">Unselect</a></li></ul></div>`
//  return elementHTML;
  var scriptUrl = createUrls('docsify-iframe.js'), objUrl = createUrls(content);
  var srcDoc = `<!DOCTYPE html><head><link href='docsify-iframe.min.css' rel='stylesheet'/><script src='${scriptUrl}'></script><body><div id='gltfExplorer' class='dark'><ul><li><a href='javascript:selectObject(false)'>Unselect</a></li></ul></div></body>
    <script>  
      window.onload = function() {
        GLTFExplorer('gltfExplorer', [
        {
            src: '${objUrl}',
            ghosted: ${'ghosted' in config ? config.ghosted : false},
            fixColors: ${'fixColors' in config ? config.fixColors : false},
        }
    ])}
    </script>`; 
  return `<div class="gltfExplorer" style="position:relative"><iframe srcdoc="${srcDoc}" style="height:100%;margin:0"/></div>`
}

function insertStyle() {
  return "div.gltfExplorer::before { content: ''; position: absolute; box-shadow: inset 0px 0px 7px 0px #333; top: 0; right: 0; bottom: 0; left: 0; pointer-events: none; } div.gltfExplorer { position:relative; height: 80vh; }"
}

function startExplorer(content, config) {
  var url = createUrls(content)
  GLTFExplorer("gltfExplorer", [
        {
            src: url,
            ghosted: "ghosted" in config ? config.ghosted : false,
            fixColors: "fixColors" in config ? config.fixColors : false,
        }
    ])
}


function createUrls(content) {
  var location = window.location.toString();
  var currenturl = location.substring(0, location.lastIndexOf('/') + 1)

  return content.replace(/\[\[\$((?:\.?\.\/)*)/g, resolvePath)

  // solution taken from docsify codebase
  function resolvePath(_, path) {
    var segments = (currenturl + path).split('/')
    var resolved = []
    for (var i = 0, len = segments.length; i < len; i++) {
      var segment = segments[i]
      if (segment === '..') {
        resolved.pop()
      } else if (segment !== '.') {
        resolved.push(segment)
      }
    }
    return '[[' + resolved.join('/')
  }
}

var styleIncluded = false

export function replace(content, selector, config) {
  var dom = window.Docsify.dom
  var $ = dom.create('span', content)

  if (!$.querySelectorAll) {
    return content
  }

  (dom.findAll($, selector) || []).forEach(function (element) {
    var parent = element.parentNode

    if (!styleIncluded) {
      styleIncluded = true
      var style = dom.create('style', insertStyle())
      if (parent) parent.insertBefore(style, element)
    }
    var explorer = dom.create('p', insertCode(element.innerText, config))
    if (parent) {
      explorer.dataset.lang = LANG
      element.parentNode.replaceChild(explorer, element)
    }
  })
  return $.innerHTML
}

export function install(hook, vm) {
  const config = Object.assign({}, {
    colorize: false,
  }, vm.config.gltfexplorer)
  hook.afterEach(function (content) {
    return replace(content, SELECTOR, config)
  })
}
