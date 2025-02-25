import React, { useEffect } from 'react'
import TaskCard from '../TaskCard'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTasks, fetchUsersTasks } from '../../../../ReduxToolkit/TaskSlice';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

const TaskList = () => {

  // Pagination
  // const [currentPage, setCurrentPage] = useState(1);
  // const roomsPerPage = 2;
  // const indexOfLastRoom = currentPage * roomsPerPage;
  // const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  // const currentRooms = task.tasks.slice(indexOfFirstRoom, indexOfLastRoom);

  // const paginate = (pageNumber) => setCurrentPage(pageNumber);


  const dispatch = useDispatch();
  const { task, auth } = useSelector(store => store)
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const filterValue = queryParams.get("filter")

  useEffect(() => {
    if (auth.user?.role === "ROLE_ADMIN") {
      dispatch(fetchTasks({ status: filterValue }));
    }
    else {
      dispatch(fetchUsersTasks({ status: filterValue }));
      console.log("abdul :", task.usersTask)
    }

  }, [filterValue]);
  // console.log("task", task);
  return (
    <div className=' w-[67vw]'>
      <div className='space-y-3'>
        {
          auth.user?.role === "ROLE_ADMIN" ?
            task.tasks.map((item) =>
              (<TaskCard item={item} />)) :
            task.usersTask.map((item) =>
              (<TaskCard item={item} />))
        }
      </div>
    </div>

  );
}

export default TaskList