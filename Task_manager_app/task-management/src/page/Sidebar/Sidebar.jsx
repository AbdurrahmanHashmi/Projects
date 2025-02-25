import { Avatar, Button } from '@mui/material'
import React, { useState } from 'react'
import './Sidebar.css'
import CreateNewTaskForm from '../Task/TaskCard/CreateTask'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../ReduxToolkit/AuthSlice'
import { ToastContainer, toast } from 'react-toastify'


const menu=[
    {name: "Home", value:"Home", role:["ROLE_ADMIN", "ROLE_CUSTOMER"]},
    {name: "DONE", value:"DONE", role:["ROLE_ADMIN", "ROLE_CUSTOMER"]},
    // {name: "ASSIGNED", value:"ASSIGNED", role:["ROLE_ADMIN"]},
    // {name: "NOT ASSIGNED", value:"PENDING", role:["ROLE_ADMIN"]},
    {name: "Create New Task", value:"", role:["ROLE_ADMIN"]},
    // {name: "Notification", value:"Notification", role:["ROLE_CUSTOMER" ]}
]

 const role= "ROLE_ADMIN"

  const Sidebar = () => {
    const dispatch = useDispatch();
    const {auth} = useSelector(store => store)
    const location = useLocation();
    const navigate = useNavigate();
    const [activeMenu, setActiveMenu]= useState("DONE")
    const [openCreateTaskForm, setOpenCreateTaskForm]= useState(false)
    const handleCloseCreateTaskForm = ()=>{
       setOpenCreateTaskForm(false)
    }

    const handleOpenCreateTaskModel =()=>{
        setOpenCreateTaskForm(true);
        
    }
    const handleMenuChange = (item)=>{

        const updatedParams = new URLSearchParams(location.search);

        if(item.name==="Create New Task"){
            handleOpenCreateTaskModel()
        }
        else if (item.name ==="Home"){
            updatedParams.delete("filter")
            const queryString = updatedParams.toString();
            const updatedPath = queryString?`${location.pathname}?${queryString}`
            :location.pathname;
            navigate(updatedPath);
        }
        else{
            updatedParams.set("filter", item.value);
            navigate(`${location.pathname}?${updatedParams.toString()}`)
        }
        setActiveMenu(item.name)
    }
    const handleLogout= ()=>{

        toast.success("User Logged out Successfully",{
            position:"top-center",
          
        });
        setTimeout(() => {
            dispatch(logout())
        }, 3000);
        console.log("handle")
    }
    return (
        <>
        <div className='card min-h-[75vh] flex flex-col justify-center fixed w-[20vw]  '>
            <div className='space-y-5 h-full '>
                <div className='flex justify-center'>

                    <Avatar
                    sx={{width:"8rem", height:"8rem" }} 
                    className='border-2 border-[#c24dd0]'
                    src='https://encrypted-tbn0.gstatic.com/
                    images?q=tbn:ANd9GcRtH5VMRYTxr3krSVXZjiSchqJrS0G9JQFFwXUrYsEfZXGLM6VYyg-SMC1-4oE2KGEPqT4&usqp=CAU'/>
                </div>
                {menu.filter((item)=>item.role.includes(auth.user.role))
                 .map((item)=><p onClick={()=>handleMenuChange(item)}
                  className={`py-3 px-5 rounded-full text-center 
                cursor-pointer  ${activeMenu===item.name?"activeMenuItem":"menuItem"}`}>
                   {item.name}
                </p>)}

                <Button onClick={handleLogout} sx={{padding:".7rem",borderRadius:"2rem"}} fullWidth className='logoutButton'> 
                    logout

                </Button>
            
               
            </div>
        </div>
        <CreateNewTaskForm open={openCreateTaskForm}
         handleClose={handleCloseCreateTaskForm}/>
         <ToastContainer/>
        </>
        
    )
}

export default Sidebar