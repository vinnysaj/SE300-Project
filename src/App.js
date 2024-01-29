import './App.css';
import React, {useState} from 'react';
//import ocr from './ocrScript.mjs';
//import toBase64 from './b64Convert.js';
import { createWorker } from 'tesseract.js';
import Demo from './Crop';
import UserPlanes from './userPlanes';
global.Buffer = global.Buffer || require('buffer').Buffer





function App() {
  const [file, setFile] = useState();
  const [text, setText] = useState("");
  const [textSubmitted, setTextSubmitted] = useState(false);
  const [baseString, setBaseString] = useState("");

  function handleChange(event) {
    setFile(event.target.files[0])
  }

  function toBase64(image) {
    let base64String = "";
    let reader = new FileReader();
    reader.onload = function () {
        base64String = reader.result.replace("data:", "")
            .replace(/^.+,/, "");

        let imageBase64Stringsep = base64String;
        setBaseString(base64String);
    }
    reader.readAsDataURL(image);
  }

  async function ocr(imgBuff){
  
    const worker = await createWorker('eng');
    const ret = await worker.recognize(imgBuff);
    console.log(ret.data.text);
    setText(ret.data.text);
    await worker.terminate();
  };

  async function handleSubmit() {
    if(file) {
      toBase64(file);
      console.log(baseString);
      //let base64 = `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`;
      let imageBuffer = Buffer.from(baseString, "base64");
      console.log("Handle Submit Called");
      ocr(file);
      console.log("OCR Returned")
      setTextSubmitted(true);
    }
    
  }

  return (
    <div className="App">
      <h1>React File Upload</h1>
      <input type="file" onChange = {handleChange}/>
      <button onClick = {handleSubmit}>Upload</button>
      <h2>{textSubmitted ? text : "dont push the button before uploading file plz"}</h2>
      <UserPlanes/>
    </div>
  );
}

export default App;
