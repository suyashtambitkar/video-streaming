import Generalised from "../General/Generalised";
import { Link } from "react-router-dom";
import { MdVerifiedUser } from "react-icons/md";
import { useEffect, useState } from "react";
import { makeAuthGetRequest } from "../Request Handler/MakeRequest";
import { useNavigate } from 'react-router-dom';
const API_URL = process.env.REACT_APP_API_URL;

const Profile = () => {
    const [user, setUser] = useState(null);
    const [ownVideos, setOwnVideos] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            const getUser = await makeAuthGetRequest(`${API_URL}/video/profile`);
            const getVideos = await makeAuthGetRequest(`${API_URL}/video/myVideos`);

            setUser(getUser);
            setOwnVideos(getVideos);
        };

        fetchProfile();
    }, []);


    return (
        <Generalised>
            <div className="h-full w-full ">

                {/* User details Section */}
                <div className="flex items-center gap-2 md:gap-5 w-full h-[35%] px-2 md:px-14 ">
                    <div className=" w-[40%] md:w-[30%] lg:w-[20%] aspect-square p-2 lg:p-6">
                        <img src={user ? user.Profileimg:"\thumbnail.jpg"} alt="/" className="h-full w-full rounded-full bg-black object-contain" />
                    </div>
                    <div>
                        <div className="flex gap-2 items-center"><h3 className="text-2xl md:text-4xl font-semibold">{user ? user.Username : "username"}</h3><MdVerifiedUser className="text-lg" /></div>
                        <p className="text-[12px] md:text-sm text-[#909297] "> Creator - {user ? user.Fullname : "username"}</p>
                        <p className="text-[12px] md:text-sm text-[#909297]">Uploading and sharing videos with the community</p>
                    </div>
                </div>

                {/* Uploded videos Section */}
                <div className="w-full h-[65%]">

                    {/* Video Upload botton */}
                    <div className="h-[10%] pl-2">
                        <Link to={"/dduploadsfsfsd"} className="border border-[#252525] hover:border-[#565555] text-[12px] md:text-sm px-2 md:px-4 py-1 bg-[#212020] hover:bg-[#302f2f]">Upload Video +</Link>
                    </div>

                    {/* All videos */}
                    <div className="h-[90%] w-full px-2 pt-2 overflow-y-scroll scrollbar-thin scrollbar-track-rounded-full scrollbar-thumb-[#2f2f32] scrollbar-track-[#000]">
                        {
                            ownVideos && ownVideos.length > 0 ? (
                                ownVideos.map((video) => (
                                    <div key={video._id} onClick={async () => navigate(`/fdfdvideodfdfd/${video._id}`)} className="flex flex-row items-center gap-3 border border-[#494b4e] hover:border-[#7f7f8a] hover:bg-[#0b0b0b] rounded-md p1 md:p-2 mb-4 cursor-pointer">
                                        <div className=" h-[80px] md:h-[100px] w-[35%] md:w-[18%]">
                                            <img src={video.Thumbnail} alt={video.Title} className="h-full w-full object-contain" />
                                        </div>
                                        <div className="w-[60%] py-0 md:py-2">
                                            <h2 className="text-sm md:text-base pb-0 md:pb-1 overflow-hidden text-ellipsis whitespace-nowrap">{video.Title}</h2>
                                            <h3 className="text-[13px] md:text-sm text-[#909297] pb-0 md:pb-1 overflow-hidden text-ellipsis whitespace-nowrap">{video.Description}</h3>
                                            <h3 className="text-[13px] md:text-sm text-[#909297]">{video.Artist?.Username || "Unknown Artist"}</h3>
                                        </div>
                                    </div>))
                            ) : (<p className="text-[#909297] text-sm">No videos uploaded yet.</p>)

                        }

                    </div>
                </div>
            </div>
        </Generalised>
    )
}

export default Profile