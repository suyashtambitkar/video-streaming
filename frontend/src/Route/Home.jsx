import { useEffect, useState } from "react";
import Generalised from "../General/Generalised";
import { makeAuthGetRequest } from "../Request Handler/MakeRequest";
import { useNavigate } from 'react-router-dom';
const API_URL = process.env.REACT_APP_API_URL;

const Home = () => {
  const [allVideos, setAllVideos] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const getAllVideos = await makeAuthGetRequest(`${API_URL}/video/getAllVideos`);
      setAllVideos(getAllVideos);
    };

    fetchProfile();
  }, []);

  return (
    <Generalised>
      <div className="max-h-full w-full grid grid-cols-1 px-3 pt-2 sm:grid-cols-2 md:grid-cols-3 gap-7 overflow-y-scroll scrollbar-thin scrollbar-track-rounded-full scrollbar-thumb-[#2f2f32] scrollbar-track-[#000]">

        {
          allVideos && allVideos.length > 0 ? (
            allVideos.map((video) => (
              <div key={video._id} onClick={async () => navigate(`/fdfdvideodfdfd/${video._id}`)} className="border border-transparent hover:border hover:border-[#2e2f30] cursor-pointer">
                <div className="h-[200px] bg-black my-3">
                  <img src={video.Thumbnail} className="h-full w-full object-cover" alt="/" />
                </div>

                <div className="flex my-3 mx-2 gap-5">
                  <div className="h-10 w-10">
                    <img src={video.Artist.Profileimg} className="h-full w-full object-contain rounded-full" alt="/" />
                  </div>

                  <div className="flex flex-col justify-center">
                    <h3 className="text-sm">{video.Title}</h3>
                    <h3 className="text-[12px] text-[#a2a2b1]">{video.Artist.Username}</h3>
                  </div>
                </div>
              </div>))
          ) : (<p className="text-[#909297] text-sm">Loading..</p>)
        }


      </div>
    </Generalised>
  )
}

export default Home;