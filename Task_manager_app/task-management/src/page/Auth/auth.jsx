import React, { useState } from 'react'
import "./Auth.css"
import Signin from './Signin';
import SignUp from './SignUp';


const Auth = () => {
    const [isRegister,setIsRegister] = useState(false);
    const togglePanel=()=>{
        setIsRegister(!isRegister)
    }
  return (

   
      <div className='flex justify-center h-screen items-center overflow-hidden'>
         
          <div className='box lg:max-w-4xl'>
              <div className={`cover ${isRegister ? "rotate-active" : ""}`}>
                  <div className='front'>
                      <img src="https://w0.peakpx.com/wallpaper/989/825/HD-wallpaper-laptop-open-amoled-apple-black-colourfull-hey-laptop-logo-pink-premium.jpg" alt="" />
                      <div className='text'>
                          <span className='text-1'> Success is built upon well-organised tasks</span>
                          <span className='text-2 text-xs'> Lets get Connected</span>
                      </div>
                  </div>
                    <div className='back'>
                        <img src="https://w0.peakpx.com/wallpaper/276/446/HD-wallpaper-little-girl-pretty-grass-adorable-sightly-sweet-nice-beauty-face-child-bonny-lovely-lying-pure-blonde-laptop-baby-cute-feet-white-computer-hair-little-nexus-beautiful-dainty.jpg"
                         alt="" />
                    </div>
              </div>
                <div className='forms h-full'>
                    <div className='form-content h-full'>
                        <div className='login-form'>
                           <Signin togglePanel={togglePanel}/>
                        </div>
                        <div className='signup-form'>
                           <SignUp togglePanel={togglePanel}/>
                        </div>

                    </div>
                </div>
          </div>
      </div>
  )
}

export default Auth