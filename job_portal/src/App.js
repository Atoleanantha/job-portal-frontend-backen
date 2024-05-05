
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route,Routes} from 'react-router-dom'
import SeekerLoginForm from './components/authentication/SeekerLoginForm';
import SeekerRegistrationForm from './components/authentication/SeekerRegistrationForm';
import NavBar from './components/header/NavBar'
import BottomBar from './components/footer/BottomBar'
import RecruiterRegisterForm from './components/authentication/RecruiterRegister';
import LandingPage from "./LandingPage"
import RecruiterProfile from "./components/profile/RecruiterProfile"
import ApplicantProfile from './components/profile/ApplicantProfile';
import PostedJobs from './components/PostedJobs';
import ContactUs from './components/ContactUs';
import ViewJobDetails from './components/view_details/ViewJobDetails';
import PostJobs from './components/post_job/PostJobs';
import React from 'react'


function App() {


  return (
   <div className='backStyle'>
  
   <NavBar/>
   <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path='/viewJobDetails' element={<ViewJobDetails/>}/>
        <Route path='/postjob' element={<PostJobs/>}/>
        
        <Route path="/registration" element={<RecruiterRegisterForm />} />
        <Route path="/applicantRegister" element={<SeekerRegistrationForm />} />
        
        <Route path="/postedJobs" element={<PostedJobs/>} />
        <Route path="/conatctUs" element={<ContactUs/>} />
        <Route path="/logIn" element={<SeekerLoginForm />} />

        {/* <Route path="/user" element={<PrivateRoute/>}/> */}
          <Route path="/rprofile" element={<RecruiterProfile/>} />
          <Route path="/aprofile" element={<ApplicantProfile/>} />
        {/* <Route/> */}
        

      </Routes>
   <BottomBar/>
   </div>
  );
}

export default App; 
