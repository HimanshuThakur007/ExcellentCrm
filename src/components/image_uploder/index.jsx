
import React, { useEffect, useState } from 'react'
import './img.css'

const ImagesUploder = (props) => {
  const [selectedFiles, setSelectedFiles] = useState(null);

//   const handleImageChange = (e) => {
//     //  console.log("FFFFFFFFF",e.target)
// // setSelectedFiles(prevImages =>   []);
//     if (e.target.files) {
//       const filesArray = Array.from(e.target.files).map((file) =>
//         URL.createObjectURL(file)
//       );
  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFiles(URL.createObjectURL(event.target.files[0]));
    }
  }

  console.log(selectedFiles)
      

//     // console.log("filesArray: ", filesArray.length);   

//  setSelectedFiles((prevImages) =>{ 
//   if(filesArray.length > 1){
//     alert("Image length less than two")
//     return prevImages
//   }else{
//     return [...filesArray]}
//   }); 



//   Array.from(e.target.files).map(
//     (file) => URL.revokeObjectURL(file) // avoid memory leak
//   );
//   }};
  
// console.log("SSSSSSSS",selectedFiles)
  // const renderPhotos = (source) => {
  //   //  console.log("source: ", source);
  //   return source.map((photo) => {
  //     return <img className='img_upload' src='blob:http://localhost:3001/e2d6a785-4045-4223-aa46-500817c56422' alt="" key={photo} />;
  //   })
  // };
  React.useEffect(()=>{
    props.imageHandler(selectedFiles)
  },[selectedFiles])

  // console.log('selectedFile', selectedFiles)
  return (
    <div className='row'>
      <input type="file" id="file" onChange={handleImageChange} />
      <div className="col-md-4">
        <label htmlFor="file" className="label" style={{ width: "100%", margin: 0, height: "110px" }}>
          <i className="material-icons">add_a_photo</i>
        </label>
      </div>
      <img src={selectedFiles} />
      {/* <div className="result col-md-8 ">
          <div style={{border: "2px solid #404040",borderRadius:"20px" }}>{renderPhotos(selectedFiles)}</div>
      </div> */}
    </div>
  );
};

export default ImagesUploder;
