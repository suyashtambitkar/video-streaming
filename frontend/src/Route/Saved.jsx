import { useEffect, useState } from "react";
import Generalised from "../General/Generalised";
import { makeAuthGetRequest } from "../Request Handler/MakeRequest";
import { useNavigate } from "react-router-dom";
const API_URL = process.env.REACT_APP_API_URL;

const Saved = () => {
    const [showVideo, setShowVideo] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const featchVideos = async () => {
            const res = await makeAuthGetRequest(`${API_URL}/video/savedVideos`);
            setShowVideo(res);
        }
        featchVideos()
    }, []);
    return (
        <Generalised>
            <div className="h-full w-full px-3">
                <div className="h-[8%] w-full">
                    <h3 className="py-2 px-4 bg-[#181717]">Saved Videos</h3>
                </div>

                <div className="h-[92%] w-full px-2 overflow-y-scroll scrollbar-thin scrollbar-track-rounded-full scrollbar-thumb-[#2f2f32] scrollbar-track-[#000]">
                    {
                        showVideo && showVideo.length > 0 ? (
                            showVideo.map((video) => (
                                <div key={video._id} onClick={async()=>navigate(`/fdfdvideodfdfd/${video._id}`)} className="flex flex-row items-center gap-3 border border-[#494b4e] hover:border-[#7f7f8a] hover:bg-[#0b0b0b] rounded-md p-2 mb-4 cursor-pointer">
                                    <div className=" h-[100px] w-[35%] md:w-[18%]">
                                        <img src={video.Thumbnail} alt="/" className="h-full w-full object-contain" />
                                    </div>
                                    <div className="w-[60%] py-2">
                                        <h2 className="text-base pb-1 overflow-hidden text-ellipsis whitespace-nowrap">{video.Title}</h2>
                                        <h3 className="text-[13px] md:text-sm text-[#909297] pb-1 overflow-hidden text-ellipsis whitespace-nowrap">{video.Description}</h3>
                                        <h3 className="text-[13px] md:text-sm text-[#909297]">{video.Artist.Username}</h3>
                                    </div>
                                </div>
                            ))) : (<><p className="text-[#909297] text-sm">No videos saved yet.</p></>)
                    }


                </div>
            </div>
        </Generalised>
    )
}

export default Saved