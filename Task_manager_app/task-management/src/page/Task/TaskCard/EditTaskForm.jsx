import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {  Autocomplete, Grid, TextField } from '@mui/material';
import { useState } from 'react';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Padding } from '@mui/icons-material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasksById, updateTask } from '../../../ReduxToolkit/TaskSlice';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

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

const tags = ["Angular","React","Vuejs","Spring boot", "Node js", "Python"]

export default function EditTaskForm({item, handleClose, open}) {
  const dispatch = useDispatch()
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const taskId = queryParams.get("taskId")
  const {task} = useSelector(store=>store)
 const [formData, setFormData] = useState({
    title: "",
    image: "",
    description: "",
    tags:[],
    deadline: new Date(),

 });

 const [selectedtags, setSelectedtags] = useState([])

 const handleChange= (e)=>{
    const {name,value} = e.target;

    setFormData({
        ...formData,
        [name]: value,
    });
 };

 const handleTagsChange= (event,value)=>{
    setSelectedtags(value);

 }

 const handleDeadlinechange= ( date)=>{
    setFormData({
        ...formData,
        deadline:date
    })
 }

 const formatDate=(input)=>{
    let{
        $y: year,
        $M: month,
        $D: day,
        $H: hours,
        $s: seconds,
        $ms: milliseconds,
    } = input;


    const date = new Date(year,month,day,hours,seconds,milliseconds);

    const formattedDate= date.toISOString();

    return formattedDate;
 }

 const handleSubmit= (e)=>{
    e.preventDefault();
    const {deadline} = formData;
    formData.deadline=formatDate(deadline);
    formData.tags = selectedtags;
    console.log("formData",formData, "deadline : ", formData.deadline)
    dispatch(updateTask({id: taskId, updatedTaskData: formData}  ))
    toast.success("Tas updated", {
      position:"top-center",
      autoClose: 3000
    })
    handleClose()
 }
 
 useEffect(()=>{
  dispatch(fetchTasksById(taskId))
 },[taskId])
   
 useEffect(()=>{
  if(task.taskDetails) setFormData(task.taskDetails);
 },[task.taskDetails])
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
                                  label="Title"
                                  fullWidth
                                  name='title'
                                  value={formData.title}
                                  onChange={handleChange}
                              />

                          </Grid>

                          <Grid item xs={12}>
                              <TextField
                                  label="Image"
                                  fullWidth
                                  name='image'
                                  value={formData.image}
                                  onChange={handleChange}
                              />

                          </Grid>

                          <Grid item xs={12}>
                              <TextField
                                  label="Description"
                                  fullWidth
                                  multiline
                                  rows={4}
                                  name='description'
                                  value={formData.description}
                                  onChange={handleChange}
                              />

                          </Grid>

                          <Grid item xs={12}>
                           <Autocomplete
                           multiple
                           id="multiple-limit-tags"
                           options={tags}
                           onChange={handleTagsChange}
                           getOptionLabel={(option)=>option}
                           renderInput={(params)=><TextField
                            label="Tags"
                            fullWidth
                            {...params}
                            
                        />
}
                           />
                              
                          </Grid>

                          <Grid item xs={12}>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                  
                                      <DateTimePicker
                                      onChange={handleDeadlinechange}
                                      className='w-full' label="DeadLine"
                                      renderInput ={(params)=><TextField {...params}/>} />
                                 
                              </LocalizationProvider>

                          </Grid>

                          <Grid item xs={12}>
                              <Button fullWidth
                              className='customButton'
                              type='submit'
                              sx={{Padding:".9rem"}}
                              onClick={handleSubmit}>
                                Update
                              </Button>

                          </Grid>

                      </Grid>
       </form>
        
        </Box>
      </Modal>
    </div>
  );
}