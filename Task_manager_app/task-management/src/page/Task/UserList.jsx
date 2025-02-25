import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import Modal from '@mui/material/Modal';
import { Avatar, Divider, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { getUserList } from '../../ReduxToolkit/AuthSlice';
import { useEffect } from 'react';
import { AssignedTaskToUser } from '../../ReduxToolkit/TaskSlice';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const style = { 
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  outline:"none",
  boxShadow: 24,
  p: 2,
};

const tasks =[1,1,1,1];

export default function UserList({handleClose, open}) {
  const dispatch = useDispatch();
  const {auth} = useSelector(store=>store)
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const taskId = queryParams.get("taskId")

  useEffect(()=>{
   dispatch(getUserList(localStorage.getItem("jwt")))
  },[])

  const handleAssignTask = (user)=>{
   dispatch(AssignedTaskToUser({userId: user.id, taskId:taskId}))
   toast.success("User assigned",{
    position: "top-center",
    autoClose: 3000
   })
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
         {
          auth.users.map((item,index)=><><div className='flex items-center
           justify-between w-full'>
            <div>
              <ListItem>
                <ListItemAvatar>
                  <Avatar src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtH5VMRYTxr3krSVXZjiSchqJrS0G9JQFFwXUrYsEfZXGLM6VYyg-SMC1-4oE2KGEPqT4&usqp=CAU' />
                </ListItemAvatar>
                <ListItemText
                  secondary={`@${item.fullName.split(" ").join("_").toLowerCase()}`}
                 primary={item.fullName} />
                   {/* secondary="something"
                  primary='somthing' />  */}
              </ListItem>
            </div>
            <div>
              <Button onClick={()=>handleAssignTask(item)} className='customButton'>Select</Button>
            </div>



          </div>
         {index!==tasks.length-1&& <Divider variant='inset' />}
          </>)
         }
         
        </Box>
      </Modal>
    </div>
  );
}