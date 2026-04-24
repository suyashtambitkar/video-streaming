import { useState } from "react";
import { Link } from "react-router-dom";
import { IoLogoXing } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { FaBars } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { TiHomeOutline } from "react-icons/ti";
import { IoCloudUploadSharp } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { MdOutlineSaveAlt } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const Generalised = ({ children }) => {
  const [show, setShow] = useState(false);
  const [videoSearch, setVideoSearch] = useState("");
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full">

      {/* Navigation */}
      <nav className="h-[10%] w-full flex items-center justify-between px-3 md:px-10">
        <div className="flex items-center gap-5">
          <IoLogoXing className="text-3xl md:text-4xl" />
        </div>

        <div className="flex items-center">
          <input value={videoSearch} onChange={(e) => setVideoSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                navigate(`/search/${videoSearch}`);
              }
            }} type="text" placeholder="Search" className="w-[160px] md:w-[300px] lg:w-[340px] outline-none rounded-l-full px-4 py-1 placeholder-[#8f8f8f] bg-[#010101] text-white border border-[#4e4e53] " />
          <div onClick={async () => navigate(`/search/${videoSearch}`)} className="px-3 py-2 rounded-r-full flex items-center bg-[#1e1e1f] border border-[#4e4e53] cursor-pointer "><IoSearch className="text-base" /></div>
        </div>

        <div className="hidden md:flex items-center"><CgProfile onClick={() => navigate("/sdfdsprofilefdfe")} className="text-xl md:text-2xl cursor-pointer text-[#a0a0a6]" /></div>

        <div className="flex md:hidden"><FaBars onClick={() => setShow(!show)} className="text-xl cursor-pointer" /></div>
      </nav>

      {/* Mob Responsive Navigation */}
      <nav className={`h-screen w-full flex flex-col fixed z-20 top-0 right-0 ${show ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 bg-[#010101] md:hidden px-3 py-6`}>

        <div className="flex justify-end"><RxCross2 onClick={() => setShow(!show)} className="text-3xl cursor-pointer" /></div>

        <ul className="w-full flex flex-col items-center justify-center mt-5 px-2">
          <li className="py-3 w-full text-center border-t border-gray-500">Home</li>
          <li className="py-3 w-full text-center border-t border-gray-500">Uploads</li>
          <li className="py-3 w-full text-center border-t border-gray-500">Liked</li>
          <li className="py-3 w-full text-center border-y border-gray-500">Saved</li>
        </ul>
      </nav>

      {/* Main body */}
      <div className="h-[90%] w-full flex">

        {/* Side-bar */}
        <div className="h-full hidden md:flex w-[20%] px-4 py-2">
          <ul className="w-full">
            <Link to={"/shjkjrjdhomefdf"} className="flex items-center gap-3 px-3 py-3 mt-3 border border-[#4e4e53] hover:border-[#a6a6b3] cursor-pointer"><TiHomeOutline className="text-xl" />Home</Link>
            <Link to={"/sdfdsprofilefdfe"} className="flex items-center gap-3 px-3 py-3 mt-3 border border-[#4e4e53] hover:border-[#a6a6b3] cursor-pointer"><IoCloudUploadSharp className="text-xl" />Uploads</Link>
            <Link to={"/fdfdsavedfddsd"} className="flex items-center gap-3 px-3 py-3 mt-3 border border-[#4e4e53] hover:border-[#a6a6b3] cursor-pointer"><MdOutlineSaveAlt className="text-xl" />Saved</Link>
            <Link to={"/"} className="flex items-center gap-3 px-3 py-3 mt-3 border border-[#4e4e53] hover:border-[#a6a6b3] cursor-pointer"><CiLogout className="text-xl" />Logout</Link>
          </ul>
        </div>

        {/* children */}
        <div className="h-full w-full md:w-[80%]">
          {children}
        </div>
      </div>

    </div>
  )
}

export default Generalised;