import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import MainHeader from '../../components/header/MainHeader';

const ViewScript = () => {
    const navigate = useNavigate();
    const script = useSelector(state=> state.script.script)

    useEffect(()=>{
    if(!script._id){
     navigate("/dashboard");
    }
    }, [script])




    const isJWTexpired = useSelector(state=> state.login.isJWTexpired);
    const tokenObj =  JSON.parse(localStorage.getItem('token'));

   useEffect(()=>{
  if(isJWTexpired || !tokenObj?.token){
   navigate('/')
  }
   }, [isJWTexpired])
  return (
    <div>
      <MainHeader />
      <h1 className=' font-bold text-center text-2xl mb-4'>View Script</h1>
      <div className=' mb-3 font-bold border-2 border-gray-500 bg-gray-100 rounded w-[260px] md:w-[350px] md:ml-2'>
      <h1>Title</h1>
      <h1>{(script?.scriptTitle)? <span> {script?.scriptTitle}</span> : <span>Untitled</span> }</h1>
      </div>
 
 <div className={`${script?.genre && " mb-3 font-bold border-2 bg-gray-100 border-gray-500 rounded w-[260px] md:w-[350px] md:ml-2" }`}>
  <h1>{script?.genre && <span>Genre</span> }</h1>
  <h1>{script?.genre && <span> {script?.genre}</span> }</h1>
 </div>


<div className=' mb-3 border-2 bg-gray-100 border-gray-500 rounded font-semibold md:w-[90%] md:ml-2'>
 <h1 className=' font-bold text-2xl'>Script</h1>
<p>{script?.script}</p>
</div>
        <div className=' border-2 mb-3 bg-gray-100 border-gray-500 rounded w-[260px] font-bold md:w-[350px] md:ml-2'>
          <h1>Word count</h1>
        <p> {script?.wordCount}</p>
        </div>
         
         <div className=' border-2 mb-3 bg-gray-100 border-gray-500 rounded w-[260px] font-bold md:w-[350px] md:ml-2'>
          <h1>Created at</h1>
         <p>{script?.createdAtIst}</p>
         </div>
        
        <div className={`${script?.updatedAtIst && "border-2 mb-3 bg-gray-100 border-gray-500 rounded w-[260px] font-bold md:w-[350px] ml-2" }`}>
          <h1>{script?.updatedAtIst && <span>Updated at</span> }</h1>
        <p>{script?.updatedAtIst && <span> {script?.updatedAtIst}</span> }</p>
        </div>
         
    </div>
  )
}

export default ViewScript
