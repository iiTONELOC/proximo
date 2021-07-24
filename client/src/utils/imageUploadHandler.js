export default function uploadHandler(files) {
    console.log(files)

    // const dataUrl = files.forEach(el => {
    //     console.log(el.name)
    //     return new Promise(resolve => {
    //         const file = new File(el.name, el.path);
    //         const reader = new FileReader();    // Read file content on file loaded event
    //         reader.onload = function (event) {
    //             resolve(event.target.result);
    //         };

    //         // Convert data to base64 
    //         const Str_64 = reader.readAsDataURL(file);
    //         return Str_64
    //     });
    // });
    // console.log(dataUrl)
    // // 

    // const Files = files.forEach(el => {
    //     const reader = new FileReader()

    //     reader.onabort = () => console.log('file reading was aborted')
    //     reader.onerror = () => console.log('file reading has failed')
    //     reader.onload = () => {
    //         // Do whatever you want with the file contents
    //         const binaryStr = reader.result
    //         console.log(binaryStr)
    //     }
    //     reader.readAs(el)
    // });
    // console.log(Files)
}
