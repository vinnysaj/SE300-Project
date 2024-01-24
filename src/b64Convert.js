global.Buffer = global.Buffer || require('buffer').Buffer
function toBase64(file) {
    let base64String = "";
    let reader = new FileReader();
    reader.onload = function () {
        base64String = reader.result.replace("data:", "")
            .replace(/^.+,/, "");

        let imageBase64Stringsep = base64String;
        console.log(base64String);
    }
    reader.readAsDataURL(file);
    return base64String;
}
export default toBase64;