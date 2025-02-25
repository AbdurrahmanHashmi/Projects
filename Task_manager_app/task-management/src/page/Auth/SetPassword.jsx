import { Box, Button, Grid, Modal, TextField } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import {  toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useDispatch } from 'react-redux'

import { login, setNewPassword } from '../../ReduxToolkit/AuthSlice'
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

const SetPassword = () => {

    const [open, setOpen] = useState(true);



  const handleClose = () => {
    setOpen(false);
  };
    const dispatch = useDispatch()
    const {auth} = useSelector(store=>store)
    // const email = auth.user.email;
    const [formData,setFormData] = useState({
       newPassword:"",
       email:""

    })
    
    var data;
    const handleChange= (e)=>{
        const {name,value} =e.target;
        setFormData({...formData,[name]:value})
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
     data =   dispatch(setNewPassword(formData))

        console.log("new Password :",formData.newPassword);
        toast.success("Password reset successfully !", {
          position: "top-center"
        });
        handleClose();
    }

    
  return (
    <>

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
                          
                            <TextField
                                fullWidth
                                label="newPassword"
                                name='newPassword'
                                type='password'
                                value={formData.newPassword}
                                onChange={handleChange}
                                placeholder='enter your password...'
                            />
    
                        </Grid>
    
                        
                        <Grid item xs={12}>
                            <Button fullWidth
                            className='customButton'
                            type='submit'
                            sx={{Padding:".9rem"}}
                            onClick={handleSubmit}>
                              Confirm
                            </Button>
    
                        </Grid>
    
                    </Grid>
     </form>
      
      </Box>
    </Modal>
   
    </div>
    {/* <ToastContainer/> */}
    </>
  )
}

export default SetPassword;





