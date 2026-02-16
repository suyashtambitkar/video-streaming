import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Request Handler/AuthContext";
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
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/upload" element={<UploadVideo />} />
            <Route path="/video/:id" element={<Videoplay />} />
            <Route path="/saved" element={<Saved />} />
            <Route path="/search/:videoSearch" element={<SearchResult />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
