import { Link } from "react-router-dom";
import { useState } from "react";
import { makeUnAuthRequest } from '../Request Handler/MakeRequest';
import { useNavigate } from 'react-router-dom';
const API_URL = process.env.REACT_APP_API_URL;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const makeRequst = async () => {
    if (!email || !password) {
      console.log("empty field");
      return;
    }
    const data = { Email: email, Password: password };
    const res = await makeUnAuthRequest(`${API_URL}/auth/login`, data);
    if (res && res.err) {
      console.log("faild to login");
      return
    }
    navigate("/home");
  }

  return (
    <div className="flex justify-center">

      <div className="border border-[#4e4e53] w-full mx-8 md:w-1/2 lg:w-1/4 p-6 md:p-9 mt-28">
        <h3 className="text-3xl mb-3">Sign In</h3>
        <p className="text-xs text-[#909297] mb-10">Welcome back! Please log in to your account.</p>

        <div className="w-full mb-8">
          <h3 className="w-full text-sm mb-2">E-mail</h3>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="border border-[#4e4e53] text-base w-full bg-black outline-none px-2 py-1" />
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();   // stop page reload
            makeRequst();         // call submit function
          }}
        >
          <div className="w-full mb-8">
            <h3 className="w-full text-sm mb-2">Password</h3>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="border border-[#4e4e53] text-base w-full bg-black outline-none px-2 py-1" />
          </div>

          <div className="mb-7">
            <button onClick={() => makeRequst()} className="w-full py-1  bg-[#4a57bf] hover:bg-[#3f4ebe]">Submit</button>
          </div>
        </form>
        <div>
          <h3 className="text-xs text-[#909297]">Create An <Link to={"/registration"} className='text-[#7581df]'>Account</Link></h3>
        </div>

      </div>

    </div >
  )
}

export default Login;