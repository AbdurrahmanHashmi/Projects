import { ThemeProvider } from "@mui/material";
import { darkTheme } from "./theme/darktheme";
import Navbar from "./page/Navbar/Navbar";
import Home from "./page/Home/Home";
import Auth from "./page/Auth/auth";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchTasks } from "./ReduxToolkit/TaskSlice";
import { getUserProfile } from "./ReduxToolkit/AuthSlice";
import EditTaskForm from "./page/Task/TaskCard/EditTaskForm";
import {BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ForgotPassword from "./page/Auth/ForgotPassword";
import SetPassword from "./page/Auth/SetPassword";
import Signin from "./page/Auth/Signin";




function App() {

  const dispatch = useDispatch();
  const {task,auth} = useSelector(store => store)
 
  useEffect(()=>{
    dispatch(fetchTasks({}));
    dispatch(getUserProfile( auth.jwt ||localStorage.getItem("jwt")))
  },[auth.jwt]);
   //const user = true;
   return (
    

    <ThemeProvider theme={darkTheme}>

       <Routes>
         <Route path="/forgot" element={<SetPassword />} />
        
       </Routes>
     


      {
         


        auth.user ? <div>
          <Navbar />
          <Home />
          
          
        </div> : 
          <Auth />
        
           

         
         
       
    }


     
   
    
   
   </ThemeProvider>
  // <Router>
  //     <Routes>
  //       <Route path="/forgot" element={<SetPassword/>}/>
  //     </Routes>
  //   </Router>
    
  );
}

export default App;
