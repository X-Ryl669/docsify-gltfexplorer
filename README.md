# docsify-gltfexplorer
A WebGL GLTF 3D explorer for docsify to present a manipulable 3D object in the documentation

# Usage
## Files
Copy the following files to where you are storing your docsified project:

 - `docsify-gltfexplorer.min.js`
 - `docsify-iframe.min.js`
 - `docsify-iframe.min.css`

## Markup
In your HTML file, you'll need to add:
```html
  <script src="//unpkg.com/docsify/lib/docsify.min.js"></script>
<!-- plugins -->
  [...]
  <script src="docsify-gltfexplorer.min.js"></script>
</body>
```

In your markdown file, you'll simply write:
````
```gltf
/path/to/model.gtlf
```
````

## Result
You'll get something like this:

