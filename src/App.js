import "./App.css";
import { Route,Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Navbar } from "./components/common/Navbar";
import { useEffect, useState } from "react";
import {Login} from './pages/Login';
import {Signup} from './pages/Signup';
import {VerifyEmail} from './pages/VerifyEmail'
function App() {
  const [hamburgerIcons,setHamburgerIcons]=useState(false);
  const [menuPos,setMenuPos]=useState(false);
  useEffect(()=>{
    if(hamburgerIcons && menuPos)
    {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    }
    else
    {
      document.documentElement.style.overflowY = 'visible';
      document.body.style.overflowY = 'visible';
    }
  },[hamburgerIcons,menuPos])
  return (
   <div className={`w-screen min-h-screen relative bg-richblack-900 flex flex-col font-inter`}>
      <Navbar hamburgerIcons={hamburgerIcons} setHamburgerIcons={setHamburgerIcons} menuPos={menuPos} setMenuPos={setMenuPos}/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="signup" element={<Signup/>}/>
        <Route path="/verify-email" element={<VerifyEmail/>}></Route>
      </Routes>
      <div className={`w-screen h-screen ${menuPos?"visible":"invisible"} bg-black/50 absolute z-[20]`}></div>
   </div>
  );
}

export default App;
