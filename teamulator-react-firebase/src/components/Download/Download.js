import React, { createRef } from "react";
import { useScreenshot, createFileName } from "use-react-screenshot";

export default () => {

    const ref = createRef(null);
    const [image, takeScreenShot] = useScreenshot({
      type: "image/jpeg",
      quality: 1.0
    });

    const download = (image, { name = "img", extension = "jpg" } = {}) => {

      const a = document.createElement("a");
      a.href = image;
      a.download = createFileName(extension, name);
      a.click();
    };

    const downloadScreenshot = () => takeScreenShot(ref.current).then(download);

  return (
    <div className="bg-white">
      <button onClick={downloadScreenshot}>Download screenshot</button>
      
      <div
      className="text-dark"
        ref={ref}
        style={{
          border: "1px solid #ccc",
          padding: "40px",
          marginTop: "20px",
          height: "100vh"
        }}
      >
      </div>
    </div>
  );
};