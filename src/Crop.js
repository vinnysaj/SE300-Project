import { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
function Demo() {
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
  
    const onCropComplete = (croppedArea, croppedAreaPixels) => {
      console.log(croppedArea, croppedAreaPixels)
    }
  
    return (
    
      <Cropper
        image={"https://fki.tic.heia-fr.ch/static/img/a01-122-02.jpg"}
        crop={crop}
        zoom={zoom}
        aspect={4 / 3}
        onCropChange={setCrop}
        onCropComplete={onCropComplete}
        onZoomChange={setZoom}
        style={{width: "100%", height: "80px"}}
      />
    )
}
export default Demo;
