import React from 'react'
import LaunchIcon from '@mui/icons-material/Launch';
import { Button, IconButton } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { acceptDeclineSubmission } from '../../../ReduxToolkit/SubmissionSlice';
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

const SubmissionCard = ({item}) => {

    const dispatch = useDispatch();
    const handleAcceptOrDecline = (status)=>{
        dispatch(acceptDeclineSubmission({id:item.id, status}))
        console.log(status)
    }
  return (
    <div className=' rounded-md bg-black p-5 flex items-center justify-between'>
        <div className='space-y-2'>
            <div className='flex items-center gap-2'>
                <span>Github : </span>
                <div className='flex items-center gap-2 text-[#c24dd0]'>
                    {/* <OpenInNewIcon/> */}
                    <LaunchIcon/>
                    <a href={item.githubLink} target='_blank' rel=''> Go to Link</a>

                    
                </div>

            </div>
             <div className='flex items-center gap-2 text-xs'>
                <p>Submisson time : </p>
                {/* <p className='text-gray-400'>2021-12-17T15:59:19.516010365 </p> */}
                <p className='text-gray-400'>{item.submissionTime} </p>
             </div>
        </div>
        <div>
            {
               item.status === "PENDING"?
               (<div className='flex gap-5'>
                <div className='text-green-500'>
                    <IconButton color='success' onClick={()=> handleAcceptOrDecline("ACCEPTED")}>
                        <CheckIcon/>
                    </IconButton>
                </div>
                <div className='text-red-500 '>
                <IconButton color='error' onClick={()=> handleAcceptOrDecline("DECLINED")}>
                       <CloseIcon/>
                    </IconButton>
                </div>


               </div> ):(
                 <Button color={item.status==="ACCEPTED"?"success":"error"} size='small' variant='outlined'>
                {item.status}
               </Button>
            )}
        </div>
    </div>
  )
}

export default SubmissionCard