import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteScriptAsync, getAllUserScriptsAsync, getCurrentUserAsync, setAIgeneratedScript, setScript, setStatus } from './scriptSlice';
import { useNavigate } from 'react-router-dom';
import MainHeader from "../../components/header/MainHeader"

const Dashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userScripts = useSelector(state=> state.script.userScripts);
    const currentUser = useSelector(state=> state.script.currentUser);
    const status = useSelector(state=> state.script.status);
    
    useEffect(()=>{
     dispatch(getAllUserScriptsAsync())
    }, [])

    useEffect(()=>{
    dispatch(getCurrentUserAsync())
    }, [])



    const isJWTexpired = useSelector(state=> state.login.isJWTexpired);
    const tokenObj =  JSON.parse(localStorage.getItem('token'));

   useEffect(()=>{
  if(isJWTexpired || !tokenObj?.token){
   navigate('/')
  }
   }, [isJWTexpired])



  return (
   <>
   <MainHeader />

<h1 className=' text-center font-bold text-2xl mb-5'>Dashboard</h1>

{
(userScripts.length === 0 && status === "loading")? 
<div className=' flex justify-center h-[50vh] items-center'>

<div className='inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-current border-r-transparent border-gray-600 align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]'></div> 
     
     </div>


:

(userScripts.length === 0 && status === "idle")? 

<div>
<div className=' flex justify-end mb-2'>
<div className=' inline-block border-2 border-purple-500 bg-purple-100 rounded px-2'>
  <h2 className=' text-right  font-semibold'>{currentUser?.firstName} <span>{currentUser?.lastName && "  "+currentUser?.lastName }</span> </h2>
   <h2 className=' text-right  font-semibold'>{currentUser?.email}</h2>
  </div>
</div>


<h1 className=' text-center font-bold'>Unable to find a script. Please navigate to the 'Create Script' page and generate some scripts.</h1>
</div>



:



<div>

<div className=' flex justify-end mb-2'>
<div className=' inline-block border-2 border-purple-500 bg-purple-100 rounded px-2'>
  <h2 className=' text-right  font-semibold'>{currentUser?.firstName} <span>{currentUser?.lastName && "  "+currentUser?.lastName }</span> </h2>
   <h2 className=' text-right  font-semibold'>{currentUser?.email}</h2>
  </div>
</div>
 
 
<div className=' flex flex-col items-center md:flex-row md:flex-wrap md:justify-start md:items-start md:gap-5'>

   {
    userScripts?.map((script)=>(
        <div key={script._id} className=' bg-gray-700 text-white rounded mb-4 w-[260px] py-3 px-1 font-semibold md:mx-2 md:mb-5 md:w-[280px]'>
         <h1 className=' mb-2'>{(script?.scriptTitle)? <span>Title: {script?.scriptTitle}</span> : <span>Title: Untitled</span> }</h1>
         <h1 className=' mb-2'>{script?.genre && <span>Genre: {script?.genre}</span> }</h1>
         <p className=' mb-2'>Word count: {script?.wordCount}</p>
         <p className=' mb-2'>Created at: {script?.createdAtIst}</p>
         <p className=' mb-2'>{script?.updatedAtIst && <span>Updated at: {script?.updatedAtIst}</span> }</p>

       <div className=' flex flex-col items-center gap-4'>
       <button className=' bg-blue-500 rounded px-4 py-1' onClick={()=>{
            dispatch(setScript(script))
            navigate('/view-script')
         }}>View script</button>

         <button className=' bg-yellow-500 rounded px-4 py-1' onClick={()=>{
            dispatch(setStatus())
            dispatch(setScript(script))
            dispatch(setAIgeneratedScript())
            navigate('/edit-script')
         }}>Edit script</button>


        <button className=' bg-red-500 rounded px-4 py-1' onClick={()=>{
            dispatch(deleteScriptAsync(script?._id))
         }}>Delete script</button>
       </div>

      
        </div>
    ))
   }

</div>

</div>

}
   
   </>
  )
}

export default Dashboard
