function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            console.log(reader.result);
            resolve(reader.result as string)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
            reject(error)
        };
    })
}



export {
    fileToBase64
}