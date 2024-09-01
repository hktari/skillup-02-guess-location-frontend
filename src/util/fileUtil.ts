function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    console.debug('converting file to base64...')
    var reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function () {
      console.debug(reader.result)
      resolve(reader.result as string)
    }
    reader.onerror = function (error) {
      reject(error)
    }
  })
}

export { fileToBase64 }
