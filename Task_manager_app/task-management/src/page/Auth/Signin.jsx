import { Button, TextField } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../../ReduxToolkit/AuthSlice'
import ForgotPassword from './ForgotPassword'
import {  ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Signin = ({togglePanel}) => {
    const dispatch = useDispatch()
    const [formData,setFormData] = useState({
        email:"",
        password:""
    })

    const handleChange= (e)=>{
        const {name,value} =e.target;
        setFormData({...formData,[name]:value})
    }

    const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = () => {
    setIsOpen(true);
  };
    const handleSubmit=(e)=>{
        e.preventDefault();
        dispatch(login(formData))
        console.log("login form",formData)
        toast.success("login successful", {
            position: "top-center"
          })
    }
  return (
    <div>
        <h1 className='text-lg font-bold text-center pb-8 textStyle'>Login</h1>
        <form className='space-y-3' onSubmit={handleSubmit}>
            <TextField
            fullWidth
            label="Email"
            name='email'
            type='email'
            value={formData.email}
            onChange={handleChange}
            placeholder='emter your email'
            />

              <TextField
                  fullWidth
                  label="Password"
                  name='password'
                  type='password'
                  value={formData.password}
                  onChange={handleChange}
                  placeholder='enter your password...'
              />

              <div >
                  <Button fullWidth
                      className='customButton'
                      type='submit'
                      sx={{ padding: ".9rem" }}>
                     Login
                  </Button>
              </div>
        </form>
        <div className='mt-5 flex items-center gap-2 py-5 justify-center'>
            <span>don't have account?</span>
            <Button onClick={togglePanel}>SignUp</Button>
        </div>
        <div className=' flex items-center gap-2 justify-center'>
            <span>Forgot password?</span>
            <Button onClick={handleButtonClick}>Forgot Password</Button>
            {isOpen && <ForgotPassword />}
        </div>
       <ToastContainer/>
    </div>
  )
}

export default Signin





// import { Button, TextField } from '@mui/material'
// import React from 'react'
// import { useState } from 'react'
// import { useDispatch } from 'react-redux'
// import { login } from '../../ReduxToolkit/AuthSlice'
// import { useFormik } from 'formik'


// const formik = useFormik({
//     initialValues: {
//       email: '',
//       password: '',
//     },
//     validationSchema: validationSchema,
//     onSubmit: (values) => {
      
//       console.log(values);
//     },
//   });
  



// const Signin = ({togglePanel}) => {
//     const dispatch = useDispatch()
//     const [formData,setFormData] = useState({
//         email:"",
//         password:""
//     })

//     const handleChange= (e)=>{
//         const {name,value} =e.target;
//         setFormData({...formData,[name]:value})
//     }
//     const handleSubmit=(e)=>{
//         e.preventDefault();
//         dispatch(login(formData))
//         console.log("login form",formData)
//     }
//   return (
//     <div>
//         <h1 className='text-lg font-bold text-center pb-8 textStyle'>Login</h1>
//         <form className='space-y-3' onSubmit={handleSubmit}>
//             <TextField
//             fullWidth
//             label="Email"
//             name='email'
//             type='email'
//             value={formData.email}
//             onChange={handleChange}
//             placeholder='emter your email'
//             />

//               <TextField
//                   fullWidth
//                   label="Password"
//                   name='password'
//                   type='password'
//                   value={formData.password}
//                   onChange={handleChange}
//                   placeholder='enter your password...'
//               />

//               <div >
//                   <Button fullWidth
//                       className='customButton'
//                       type='submit'
//                       sx={{ Padding: ".9rem" }}>
//                      Login
//                   </Button>
//               </div>
//         </form>
//         <div className='mt-5 flex items-center gap-2 py-5 justify-center'>
//             <span>don't have account?</span>
//             <Button onClick={togglePanel}>SignUp</Button>
//         </div>
//     </div>
//   )
// }

// export default Signin