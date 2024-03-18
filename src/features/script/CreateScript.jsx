import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { completeTheParaAsync, correctSpellingAndGrammarAsync, createScriptAsync, getCurrentUserAsync, setIsScriptCreated, setStatus } from './scriptSlice';
import MainHeader from '../../components/header/MainHeader';
import { useNavigate } from 'react-router-dom';

const CreateScript = () => {
    const [scriptTitle, setScriptTitle] = useState("");
    const [genre, setGenre] = useState("");
    const [script, setScript] = useState("");
    const navigate = useNavigate();

    const AIgenScript = useSelector(state=> state.script.AIgeneratedScript); 
    const status = useSelector(state=> state.script.status);

    const SandGstatus = useSelector(state=> state.script.SandGstatus);
    const completeTheParaStatus = useSelector(state=> state.script.completeTheParaStatus);
    const isScriptCreated = useSelector(state=> state.script.isScriptCreated);

    const dispatch = useDispatch();

    const handleSubmit = function(e){

      e.preventDefault();

     

      dispatch(createScriptAsync({scriptTitle, genre, script}))

    }


    useEffect(()=>{
if(AIgenScript?.AIanswer){
  setScript(AIgenScript?.AIanswer)
}
 }, [AIgenScript])


 
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


    useEffect(()=>{
if(isScriptCreated){
  dispatch(setIsScriptCreated())
  navigate('/dashboard')
}
    },  [isScriptCreated])

    
  return (
    <div>
      <MainHeader />
      <h1  className=' font-bold text-center text-2xl mb-4'>Create Script</h1>
      <form className='font-semibold' onSubmit={handleSubmit}>


      <div>

     
     <div className=' mb-4 flex flex-col pl-2'>
     <label htmlFor="scriptTitle">Title</label>

<input
 type="text" 
id='scriptTitle'
name='scriptTitle'
value={scriptTitle}
onChange={(e)=>setScriptTitle(e.target.value)}
className=' border-2 border-gray-500 w-[220px] rounded focus:bg-indigo-100 md:w-[350px] '
/>
     </div>

       
<div className=' flex flex-col pl-2 mb-4'>
       <label htmlFor="genre">Genre</label>

        <select name="genre" id="genre" value={genre} onChange={(e)=>setGenre(e.target.value)} className=' border-2 border-gray-500 w-[220px] rounded focus:bg-indigo-100 md:w-[350px]'>
        <option value=""></option>
            <option value="Action">Action</option>
            <option value="Adventure">Adventure</option>
            <option value="Comedy">Comedy</option>
            <option value="Drama">Drama</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Horror">Horror</option>
            <option value="Mystery">Mystery</option>
            <option value="Thriller">Thriller</option>
            <option value="Sci-Fi">Sci-Fi</option>
            <option value="Story">Story</option>
            <option value="Other">Other</option>
        </select>

        </div>


<div className=' flex flex-col px-2 mb-5'>
<label htmlFor="script">Script</label>
        <textarea name="script" id="script" value={script} onChange={(e)=>setScript(e.target.value)} className=' border-2 border-gray-500 w-full min-h-[30vh] rounded md:w-[90%]'>

        </textarea>
        <p className=' text-red-500 w-[250px] text-sm font-semibold md:w-[90%]'>{status?.createScriptError}</p>
</div>
         

<div className=' flex flex-col items-center'>

  <div className=' mb-5 w-[250px] flex flex-col items-center'>
  <button type='button' onClick={()=>{
    dispatch(setStatus())
          dispatch(correctSpellingAndGrammarAsync({script: script}))
        }} className={` ${(SandGstatus === "loading")? "bg-red-400" : "bg-blue-400"} px-4 py-1 rounded text-white `} disabled = { (SandGstatus === "loading")? true : false } > {(SandGstatus === "loading")? <span>Wait...</span> : <span> Correct spelling and grammar</span> }</button>
<p className=' text-red-500 w-[250px] text-sm font-semibold'>{SandGstatus?.SandGbigError && <span>You have exceeded your current quota. Please try to use this feature again after some time.</span> }</p>
<p className=' text-red-500 w-[250px] text-sm font-semibold'>{SandGstatus?.SandGerror }</p>
  </div>

<div className=' mb-5 w-[250px] flex flex-col items-center'>
<button type='button' onClick={()=>{
  dispatch(setStatus())
          dispatch(completeTheParaAsync({script: script}))
        }} className={` ${(completeTheParaStatus === "loading")? "bg-red-400" : "bg-blue-400"} px-4 py-1 rounded text-white `} disabled = { (completeTheParaStatus === "loading")? true : false }>{(completeTheParaStatus === "loading")? <span>Wait...</span> : <span> Complete the paragraph</span> }</button>
        <p className=' text-red-500 w-[250px] text-sm font-semibold'>{completeTheParaStatus?.completeParaBigError && <span>You have exceeded your current quota. Please try to use this feature again after some time.</span> }</p>
<p className=' text-red-500 w-[250px] text-sm font-semibold'>{completeTheParaStatus?.completeParaError }</p>
</div>


        <button className=' bg-green-500 px-4 py-1 rounded text-white mb-4'>Create</button>


</div>
     


        </div>
      </form>
    </div>
  )
}

export default CreateScript
