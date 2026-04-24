import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Generalised from "../General/Generalised";
import { makeAuthGetRequest, makeAuthDelRequest, makeAuthPostRequest } from "../Request Handler/MakeRequest";
import { MdOutlineSaveAlt } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
const API_URL = process.env.REACT_APP_API_URL;

const Videoplay1 = () => {
  const [playVideo, setPlayVideo] = useState(null);
  const [saved, setSaved] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const featchVideo = async () => {
      const getVideo = await makeAuthGetRequest(`${API_URL}/video/play/${id}`);
      const currentUser = await makeAuthGetRequest(`${API_URL}/video/user`);
      setPlayVideo(getVideo);

      const responseOfSave = getVideo?.currentVideo?.SavedVideosUser?.includes(
        currentUser?._id
      );
      setSaved(responseOfSave);
    }
    featchVideo()
  }, [id]);


  // Add Save Video
  const addSaveVideo = async () => {
    const res = await makeAuthPostRequest(`http://localhost:8080/video/saveVideo/${id}`);
    if (res && res.err) {
      console.log("faild to save");
      return
    }
    setSaved(true);
  }

  // Add Delete Video 
  const addDeleteVideo = async () => {
    const res = await makeAuthDelRequest(`http://localhost:8080/video/unsaveVideo/${id}`);

    if (res && res.err) {
      console.log("faild to delete");
      return
    }
    setSaved(false);
  }

  return (
    <Generalised>
      <div className="h-full w-full flex flex-col lg:flex-row">

        {/*video section*/}
        <div className="h-[60%] w-full sm:h-[70%] lg:h-full lg:w-[70%]">

          <div className="h-[75%] w-full">
            <video className="h-full w-full" src={playVideo?.currentVideo?.FilePath} autoPlay controls></video>
          </div>

          <div className="w-full flex gap-3 pt-2 px-2 items-center">

            <div>
              <div>
                <h3 className="text-[14px] md:text-base overflow-hidden text-ellipsis whitespace-nowrap">{playVideo?.currentVideo?.Title}</h3>
                <h3 className="text-[12px] md:text-sm text-[#909297]">{playVideo?.currentVideo?.Artist?.Username}</h3>
                <h3 className="text-[12px] md:text-sm text-[#909297] hidden lg:block line-clamp-1">{playVideo?.currentVideo?.Description}</h3>

              </div>

              <div className="flex  items-center justify-start gap-3 mt-2 md:mt-3 md:mr-10">
                {
                  saved ? (
                    <div >
                      <div onClick={() => addDeleteVideo()} className="bg-[#172215] hover:bg-[#122313] border border-[#355024] px-1 md:py-1 md:px-2 flex justify-center items-center gap-1 md:gap-2 text-[12px] md:text-[13px] text-[#8e8e9c] cursor-pointer"><MdOutlineSaveAlt className="text-sm md:text-[16px]" />Saved</div>
                    </div>

                  ) : (
                    <div>
                      <div onClick={() => addSaveVideo()} className="bg-[#212020] hover:bg-[#302f2f] border border-gray-700 px-1 md:py-1 md:px-2 flex justify-center items-center gap-1 md:gap-2 text-[12px] md:text-[13px] text-[#8e8e9c] cursor-pointer"><MdOutlineSaveAlt className="text-sm md:text-[16px]" />Save Video</div>
                    </div>
                  )
                }

              </div>
            </div>

          </div>
        </div>

        {/* Related List */}
        <div className="h-[40%] w-full sm:h-[30%] lg:h-full lg:w-[30%] pt-4 lg:pt-1 px-2 overflow-y-scroll scrollbar-thin scrollbar-track-rounded-full scrollbar-thumb-[#2f2f32] scrollbar-track-[#000]">

          {
            playVideo?.relatedVideos && playVideo?.relatedVideos?.length > 0 ? (
              playVideo?.relatedVideos?.map((video) => (
                <div key={video._id} onClick={async () => navigate(`/fdfdvideodfdfd/${video._id}`)} className="w-full flex items-center  gap-3 p-1 mb-2 cursor-pointer border border-[#494b4e] hover:border-[#7f7f8a] hover:bg-[#0b0b0b]">
                  <img className="w-16 aspect-square object-contain" src={video.Thumbnail} alt="/" />

                  <div className="w-full overflow-hidden">
                    <h3 className="text-sm md:text-base overflow-hidden text-ellipsis whitespace-nowrap">{video.Title}</h3>
                    <h4 className="text-[13px] md:text-sm text-[#909297]">{video.Artist.Username}</h4>
                  </div>
                </div>
              ))
            ) : (<></>)
          }

        </div>

      </div>
    </Generalised>
  )
}

export default Videoplay1