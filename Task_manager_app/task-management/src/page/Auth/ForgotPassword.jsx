// import { Button, TextField } from '@mui/material'
// import React from 'react'
// import { useState } from 'react'
// import { useDispatch } from 'react-redux'
// import { forgotPassword, login } from '../../ReduxToolkit/AuthSlice'



// const ForgotPassword = () => {
//     const dispatch = useDispatch()
//     const [formData,setFormData] = useState({
//         email:"",
        
//     })

//     const handleChange= (e)=>{
//         const {name,value} =e.target;
//         setFormData({...formData,[name]:value})
//     }
//     const handleSubmit=(e)=>{
//         e.preventDefault();
//         dispatch(forgotPassword(formData.email))
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

             

//               <div >
//                   <Button fullWidth
//                       className='customButton'
//                       type='submit'
//                       sx={{ padding: ".9rem" }}>
//                      Send Link
//                   </Button>
//               </div>
//         </form>
//         {/* <div className='mt-5 flex items-center gap-2 py-5 justify-center'>
//             <span>don't have account?</span>
//             <Button onClick={togglePanel}>SignUp</Button>
//         </div> */}
//     </div>
//   )
// }

// export default ForgotPassword;


import { Box, Button, Grid, Modal, TextField } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import {  ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import { useDispatch } from 'react-redux'

import { forgotPassword, login, setNewPassword } from '../../ReduxToolkit/AuthSlice'
import { useDispatch, useSelector } from 'react-redux'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  
const ForgotPassword = () => {

    const [open, setOpen] = useState(true);

     

  const handleClose = () => {
    setOpen(false);
  };
  const dispatch = useDispatch()
      const [formData,setFormData] = useState({
          email:"",
          
      })

      let data;
  
      const handleChange= (e)=>{
          const {name,value} =e.target;
          setFormData({...formData,[name]:value})
      }
      const handleSubmit=(e)=>{
          e.preventDefault();
         data= dispatch(forgotPassword(formData.email))
         toast.success("check your email", {
          position: "top-center"
        })

          handleClose();
        
      }
  
  return (
    <div>
     
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
     <form onSubmit={handleSubmit}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12}>
                           
                              <TextField
                                  fullWidth
                                  label="Email"
                                  name='email'
                                  type='email'
                                  value={formData.email}
                                  onChange={handleChange}
                                  placeholder='emter your email'
                              />
    
                        </Grid>
    
                       
    
                        
    
                       
    
    
                        
                        <Grid item xs={12}>
                            <Button fullWidth
                            className='customButton'
                            type='submit'
                            sx={{Padding:".9rem"}}
                            onClick={handleSubmit}>
                              Send Email
                            </Button>
    
                        </Grid>
    
                    </Grid>
     </form>
      
      </Box>
    </Modal>
    <ToastContainer/ >
    </div>
  )
}

export default ForgotPassword;





