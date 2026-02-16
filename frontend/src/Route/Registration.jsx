import { useState, useRef } from "react";
import { FiUpload } from "react-icons/fi";
import { Link } from "react-router-dom";
import { makeUnAuthRequest } from '../Request Handler/MakeRequest';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;
const CLOUD_NAME = process.env.REACT_APP_CLOUD_NAME;
const CLOUD_PRESET = process.env.REACT_APP_CLOUD_PRESET;


const Registration = () => {
    const [uploading, setUploading] = useState(false);
    const [fullname, setFulltName] = useState('');
    const [userName, setUserName] = useState('');
    const [selectImg, setSelectImg] = useState();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const selectImgRef = useRef(null);
    const navigate = useNavigate();

    const uploadToCloud = async (fileData, folderName) => {
        if (!fileData) return alert("pls fill all fields");

        const formData = new FormData();
        formData.append("file", fileData);
        formData.append("upload_preset", CLOUD_PRESET);
        formData.append("folder", folderName);

        const res = await axios.post(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`, formData);
        return res.data.secure_url;
    }

    const makeRequst = async () => {
        setUploading(true);
        const Profile_img = await uploadToCloud(selectImg, "profileimg");

        if (!email || !password || !fullname || !Profile_img || !userName) {
            console.log("empty field");
            return;
        }
        const data = { Fullname: fullname, Username: userName, Profileimg: Profile_img, Email: email, Password: password }
        const res = await makeUnAuthRequest(`${API_URL}/auth/register`, data);
        if (res && res.err) {
            console.log("registration faild");
            return
        }
        navigate("/home")
    }

    return (

        <div className="flex justify-center">

            <div className="border border-[#4e4e53] w-full mx-8 md:w-1/2 lg:w-1/4 px-6 py-4 md:px-9 md:py-6 mt-12">
                <h3 className="text-3xl mb-3">Sign Up</h3>
                <p className="text-xs text-[#909297] mb-8">Create your account to get started and access all features.</p>

                <div className="w-full mb-4">
                    <h3 className="w-full text-sm mb-2">Full Name</h3>
                    <input type="text" value={fullname} onChange={(e) => setFulltName(e.target.value)} className={`border ${fullname ? "border-[#6bb676]" : "border-[#4e4e53]"} text-base w-full bg-black outline-none px-2 py-1`} />
                </div>

                <div className="w-full mb-4">
                    <h3 className="w-full text-sm mb-2">User Name</h3>
                    <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} className={`border ${userName ? "border-[#6bb676]" : "border-[#4e4e53]"} text-base w-full bg-black outline-none px-2 py-1`} />
                </div>

                <div className="w-full mb-4">
                    <h3 className="w-full text-sm mb-2">Upload Profile Img</h3>
                    <button onClick={() => { selectImgRef.current.click() }} className={`flex items-center justify-center gap-2 border ${selectImg ? "border-[#6bb676]" : "border-[#4e4e53]"} text-xs w-full bg-black text-[#9c9da1] px-2 py-2`}>Select Image<FiUpload /></button>
                    <input type="file" accept="image/*" className='hidden' onChange={(e) => { setSelectImg(e.target.files[0]) }} ref={selectImgRef} />
                </div>

                <div className="w-full mb-4">
                    <h3 className="w-full text-sm mb-2">E-mail</h3>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className={`border ${email ? "border-[#6bb676]" : "border-[#4e4e53]"} text-base w-full bg-black outline-none px-2 py-1`} />
                </div>

                <div className="w-full mb-8">
                    <h3 className="w-full text-sm mb-2">Password</h3>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={`border ${password ? "border-[#6bb676]" : "border-[#4e4e53]"} text-base w-full bg-black outline-none px-2 py-1`} />
                </div>

                <div className="mb-5">
                    <button onClick={() => makeRequst()} className="w-full py-1  bg-[#4a57bf] hover:bg-[#3f4ebe]">{uploading ? "Uploading..." : "Submit"}</button>
                </div>

                <div>
                    <h3 className="text-xs text-[#909297]">Already Have An <Link to={"/"} className='text-[#7581df]'>Account</Link> !</h3>
                </div>

            </div>

        </div>
    )
}

export default Registration