import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { register } from '../../ReduxToolkit/AuthSlice'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'

const SignUp = ({ togglePanel }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName:"",
        email: "",
        password: "",
        role:""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(register(formData))
        console.log("login form", formData)
        toast.success("registered successfully !", {
            position: "top-center"
          })
          navigate('/login');
    }
    return (
        <div>
            <h1 className='text-lg font-bold text-center pb-2 textStyle'>SignUp</h1>
            <form className='space-y-1' onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Full Name"
                    name='fullName'
                    value={formData.name}
                    onChange={handleChange}
                    placeholder='emter your fullName'
                />

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

                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Role</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={formData.role}
                        label="Role"
                       name='role'
                        onChange={handleChange}
                    >
                        <MenuItem value={"ROLE_CUSTOMER"}>USER</MenuItem>
                        <MenuItem value={"ROLE_ADMIN"}>ADMIN</MenuItem>
                       
                    </Select>
                </FormControl>

                <div >
                    <Button fullWidth
                        className='customButton'
                        type='submit'
                        sx={{ Padding: ".9rem" }}>
                        SignUp
                    </Button>
                </div>
            </form>
            <div className='mt-5 flex items-center gap-2 py-5 justify-center'>
                <span>already have an account?</span>
                <Button onClick={togglePanel}>Signin</Button>
            </div>
        </div>
    )
}

export default SignUp