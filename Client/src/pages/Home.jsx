import React, { useEffect } from 'react'
import { Header, TaskList,TaskFilter } from '../components'
import { useDispatch,useSelector } from 'react-redux'
import { makeTasksEmpty,getUserTask } from '../store/Slices/taskSlice'

const Home = () => {
  const dispatch=useDispatch();
  const user=useSelector((state)=>state.auth?.userData);

  useEffect(()=>{

    if(user && user?._id){
      dispatch(getUserTask({userId:user?._id}));
    }
    return ()=>{
      dispatch(makeTasksEmpty());
    }


  },[dispatch])

  const tasks=useSelector((state)=>state.task.tasks);
  return (
    <>
      <Header/>
      <TaskFilter/>
      <TaskList tasks={tasks}/>
    </>
  )
}

export {Home}