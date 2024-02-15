import "./App.css";
import { Route,Routes,useNavigate} from "react-router-dom";
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
import PrivateRoute from "./components/core/Auth/PrivateRoute"
import { Dashboard } from "./pages/Dashboard";
import { useDispatch, useSelector } from "react-redux";
import EnrolledCourses from './components/core/dashboard/EnrolledCourses'
import MyProfile from "./components/core/dashboard/MyProfile";
import Error from "./pages/Error";
import Settings from "./components/core/dashboard/settings";
import Contact from "./pages/Contact";
import Cart from "./components/core/dashboard/cart";
import { ACCOUNT_TYPE } from "./utils/constants";
import AddCourse from "./components/core/dashboard/AddCourse";
import MyCourses from "./components/core/dashboard/MyCourses";
import EditCourse from "./components/core/dashboard/EditCourse";
import Catalog from "./pages/Catalog"
import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./components/core/ViewCourse/VideoDetails";
import CourseDetails from "./pages/CourseDetails";
import Instructor from "./components/core/dashboard/Instructor";
function App() {
  console.log("App is re rendering");
  const [hamburgerIcons,setHamburgerIcons]=useState(false);
  const [menuPos,setMenuPos]=useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { user } = useSelector((state) => state.profile)
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
        <Route path="catalog/:catalogName" element={<Catalog />} />
        <Route path="courses/:courseId" element=<CourseDetails/>/>
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
        <Route 
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          >
            <Route path="dashboard/my-profile" element={<MyProfile />} />
            <Route path="dashboard/Settings" element={<Settings />} />
            {
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
              <Route path="dashboard/cart" element={<Cart />} />
              <Route path="dashboard/enrolled-courses" element={<EnrolledCourses />} />
              </>
            )
            }
            {
              user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
                <>
                <Route path="dashboard/add-course" element={<AddCourse />} />
                <Route path="dashboard/instructor" element={<Instructor />} />
                <Route path="dashboard/my-courses" element={<MyCourses/>}/>
                <Route
                path="dashboard/edit-course/:courseId"
                element={<EditCourse />}
              />
                </>
              )
            }
            
        </Route>
        <Route
          element={
            <PrivateRoute>
              <ViewCourse />
            </PrivateRoute>
          }
        >
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route
                path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                element={<VideoDetails />}
              />
            </>
          )}
        </Route>
        <Route path="*" element={<Error/>} />
      </Routes>
      <div className={`w-screen h-screen ${menuPos?"visible":"invisible"} bg-black/50 absolute z-[20]`}></div>
   </div>
  );
}

export default App;
