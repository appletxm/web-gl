function getContentType(extendsName){
  switch(extendsName){
    case 'js':
      return 'application/x-javascript'
    case 'css':
      return 'text/css'
    case 'html':
    case 'htm':
      return 'text/html'
    case 'icon':
      return 'image/x-icon'
    case 'png':
      return 'application/x-png'
    case 'gif':
      return 'image/gif'
    case 'jpg':
      return 'image/jpeg'
    case 'pdf':
      return 'application/pdf'
    default:
      return 'text/plain'
  }
}

module.exports = getContentType
