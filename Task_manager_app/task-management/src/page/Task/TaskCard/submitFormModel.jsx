import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import Modal from '@mui/material/Modal';
import { Autocomplete, Grid, TextField } from '@mui/material';
import { useState } from 'react';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Padding } from '@mui/icons-material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasksById, updateTask } from '../../../ReduxToolkit/TaskSlice';
import { useLocation } from 'react-router-dom';
import { submitTask } from '../../../ReduxToolkit/SubmissionSlice';
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


export default function SubmitFormModel({ item, handleClose, open }) {
  const dispatch = useDispatch()
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const taskId = queryParams.get("taskId")
  const { task } = useSelector(store => store)
  const [formData, setFormData] = useState({
    githubLink: "",
    description: "",


  });


  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };





  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(submitTask({ taskId, githubLink: formData.githubLink }))
    toast.success("task submitted",{
      position: "top-center",
      autoClose:3000
    })
    handleClose()
  };

  
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
                  label="Github Link"
                  fullWidth
                  name='githubLink'
                  value={formData.githubLink}
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
                <Button fullWidth
                  className='customButton'
                  type='submit'
                  sx={{ Padding: ".9rem" }}
                  onClick={handleSubmit}>
                  Submit
                </Button>

              </Grid>

            </Grid>
          </form>

        </Box>
      </Modal>
    </div>
  );
}

