import "./App.css";
import { Route,Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Navbar } from "./components/common/Navbar";
import { useEffect, useState } from "react";
import {Login} from './pages/Login';
import {Signup} from './pages/Signup';
import {VerifyEmail} from './pages/VerifyEmail'
import { ForgotPassword } from "./pages/ForgotPassword";
import { UpdatePassword } from "./pages/UpdatePassword";
import { About } from "./pages/About";
import { OpenRoute } from "./components/core/Auth/OpenRoute";
import Error from "./pages/Error";
import Contact from "./pages/Contact";
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
        <Route 
          path="login" 
          element={
            <OpenRoute>
              <Login/>
            </OpenRoute>
          }
        />
        <Route path="signup" 
          element=
          {
            <OpenRoute>
              <Signup/>
            </OpenRoute>
          }
          />
        <Route path="verify-email"
         element={
          <OpenRoute>
            <VerifyEmail/>
          </OpenRoute>
         }>
         </Route>
        <Route path="forgotPassword" 
        element={
          <OpenRoute>
            <ForgotPassword/>
          </OpenRoute>
        }>
        </Route>
        <Route path="update-password/:id" 
        element={
          <OpenRoute>
            <UpdatePassword/>
          </OpenRoute>
        }>

        </Route>
        <Route path="about" 
        element={
          <OpenRoute>
            <About/>
          </OpenRoute>
        }>
        </Route>

        <Route path="contact" element={<Contact/>}>

        </Route>

        <Route path="*" element={<Error/>} />
      </Routes>
      <div className={`w-screen h-screen ${menuPos?"visible":"invisible"} bg-black/50 absolute z-[20]`}></div>
   </div>
  );
}

export default App;
