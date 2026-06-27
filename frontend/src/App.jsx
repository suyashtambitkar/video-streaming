import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Route/Login";
import Registration from "./Route/Registration";
import Home from "./Route/Home";
import Saved from "./Route/Saved";
import Profile from "./Route/Profile";
import UploadVideo from "./Route/UploadVideo";
import Videoplay from "./Route/Videoplay";
import SearchResult from "./Route/SearchResult";


function App() {
  
  return (
    <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/shjkjrjdhomefdf" element={<Home />} />
            <Route path="/sdfdsprofilefdfe" element={<Profile />} />
            <Route path="/dduploadsfsfsd" element={<UploadVideo />} />
            <Route path="/fdfdvideodfdfd/:id" element={<Videoplay />} />
            <Route path="/fdfdsavedfddsd" element={<Saved />} />
            <Route path="/search/:videoSearch" element={<SearchResult />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
