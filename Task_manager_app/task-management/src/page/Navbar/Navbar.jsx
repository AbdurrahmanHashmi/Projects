import { Avatar } from '@mui/material'
import React from 'react'
import "./Navbar.css"
import { useSelector } from 'react-redux'
import store from '../../ReduxToolkit/Store'

const Navbar = () => {
const {task,auth} = useSelector(store=>store)
    return (
        <div className='container mx-auto z-10 sticky left-0 right-0 top-0 py-3 px-5
    lg:px-10, flex justify-between items-center'>

            <p className='font-bold text-lg'>
                My Task Manager
            </p>

            <div className='flex items-center gap-5'>
                <p>{auth.user?.fullName} </p>
                <Avatar src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtH5VMRYTxr3krSVXZjiSchqJrS0G9JQFFwXUrYsEfZXGLM6VYyg-SMC1-4oE2KGEPqT4&usqp=CAU'>C</Avatar>
            </div>

        </div>
    )
}

export default Navbar