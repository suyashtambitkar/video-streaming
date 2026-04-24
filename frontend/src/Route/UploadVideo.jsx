import { FiUpload } from "react-icons/fi";
import { useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { makeAuthPostRequest } from "../Request Handler/MakeRequest";
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;
const CLOUD_NAME = process.env.REACT_APP_CLOUD_NAME;
const CLOUD_PRESET = process.env.REACT_APP_CLOUD_PRESET;


const UploadVideo = () => {
  const [uploading,setUploading] = useState(false);
  const [selectTitle, setSelectTitle] = useState();
  const [selectDescription, setSelectDescription] = useState();
  const [selectVideo, setSelectVideo] = useState();
  const [selectImg, setSelectImg] = useState();
  const selectVideoRef = useRef(null);
  const selectImgRef = useRef(null);
  const navigate = useNavigate();

  // function to upload data to cloud
  const uploadToCloud = async (fileData, folderName) => {
    if (!fileData) return alert("pls fill all fields");

    const formData = new FormData();
    formData.append("file", fileData);
    formData.append("upload_preset", CLOUD_PRESET);
    formData.append("folder", folderName);

    const res = await axios.post(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`, formData);
    return res.data.secure_url;
  }

  // function to send data to backend
  const submitData = async () => {
    if (!selectTitle || !selectDescription || !selectVideo || !selectImg) return alert("Fill All Fields");
    setUploading(true);
    
    const videoUrl = await uploadToCloud(selectVideo, "video");
    const thumbnailUrl = await uploadToCloud(selectImg, "thumbnail");
    

    const data = {
      Title: selectTitle,
      Description: selectDescription,
      Thumbnail: thumbnailUrl,
      FilePath: videoUrl
    }

    const res = await makeAuthPostRequest(`${API_URL}/video/uploadVideo`, data);
    if (res && res.err) {
      console.log(res.err);
      return
    }
    navigate("/sdfdsprofilefdfe");
  }

  //Cancle button handle
  const cancle = () => {

    navigate("/profile");
  }

  return (
    <div className="flex justify-center">

      <div className="border border-[#4e4e53] w-full mx-8 md:w-1/2 lg:w-1/4 p-6 md:p-7 mt-14">
        <h3 className="text-2xl mb-5 md:mb-8">Upload Video</h3>

        <div className="w-full mb-4 md:mb-7">
          <h3 className="w-full text-sm mb-2">Video Title</h3>
          <input type="text" onChange={(e) => setSelectTitle(e.target.value)} className={`border ${selectTitle ? "border-[#6bb676]" : "border-[#4e4e53]"} text-base w-full bg-black outline-none px-2 py-1`} />
        </div>

        <div className="w-full mb-4 md:mb-7">
          <h3 className="w-full text-sm mb-2"> Video Discription</h3>
          <input type="text" onChange={(e) => setSelectDescription(e.target.value)} className={`border ${selectDescription ? "border-[#6bb676]" : "border-[#4e4e53]"} text-base w-full bg-black outline-none px-2 py-1`} />
        </div>

        <div className="w-full mb-4 md:mb-7">
          <h3 className="w-full text-sm mb-2"> Video Thumbnail</h3>
          <button onClick={() => { selectImgRef.current.click() }} className={`flex items-center justify-center gap-2 border ${selectImg ? "border-[#6bb676]" : "border-[#4e4e53]"} text-xs w-full bg-black text-[#9c9da1] px-2 py-2`}>Select Thumbnail<FiUpload /></button>
          <input type="file" accept="image/*" className='hidden' onChange={(e) => { setSelectImg(e.target.files[0]) }} ref={selectImgRef} />
        </div>

        <div className="w-full mb-9">
          <h3 className="w-full text-sm mb-2"> Video File Path</h3>
          <button onClick={() => { selectVideoRef.current.click() }} className={`flex items-center justify-center gap-2 border ${selectVideo ? "border-[#6bb676]" : "border-[#4e4e53]"} text-xs w-full bg-black text-[#9c9da1] px-2 py-2`}>Select Video<FiUpload /></button>
          <input type="file" accept="video/*" className='hidden' onChange={(e) => { setSelectVideo(e.target.files[0]) }} ref={selectVideoRef} />
        </div>

        <div className="mb-7">
          <button onClick={submitData} className="w-full py-1 text-sm  bg-[#4a57bf] hover:bg-[#3f4ebe] mb-4"> {uploading ? "Uploading..." : "Submit"}</button>
          <button onClick={cancle} className="w-full py-1 text-sm border border-[#4e4e53] hover:border-[#7f7f8a]">Cancle</button>
        </div>

      </div>

    </div>
  )
}

export default UploadVideo;
