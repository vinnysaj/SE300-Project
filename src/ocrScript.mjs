import { createWorker } from 'tesseract.js';




async function ocr(imageBuffer){
  
  const worker = await createWorker('eng');
  const ret = await worker.recognize(imageBuffer);
  console.log(ret.data.text);
  await worker.terminate();
};

export default ocr;