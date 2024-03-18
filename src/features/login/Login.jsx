import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { loginAsync, setTokenState } from './loginSlice';
import { Link, useNavigate } from 'react-router-dom';
import MainHeader from '../../components/header/MainHeader';

const Login = () => {
    const {register, handleSubmit} = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const status = useSelector(state=> state.login.status);
    const isJWTexpired = useSelector(state=> state.login.isJWTexpired);
    const isJWTmalformed = useSelector(state=> state.login.isJWTmalformed);
    const tokenState = useSelector(state=> state.login.tokenState);
    const tokenObj = JSON.parse(localStorage.getItem("token"));

    useEffect(()=>{
   if(tokenState?.token){
    dispatch(setTokenState())
    navigate('/dashboard');
   }
    }, [tokenState])
    
  return (
    <div>
     
     {tokenObj?.token && <MainHeader />}
     <h1 className=' text-center font-bold text-2xl mb-4'>Login</h1>
      <h1 className=' text-center font-semibold'>{isJWTexpired && !isJWTmalformed && <span>The JSON web token has expired</span>}</h1>
      <h1 className=' text-center font-semibold'>{isJWTmalformed && <span>Unauthorized</span> }</h1>

      <form onSubmit={handleSubmit((formVal)=>{
       
        dispatch(loginAsync(formVal));
      })}>
        <div className=' flex flex-col items-center bg-gray-100 border-gray-400 w-[95%] mx-auto rounded border-2 my-4 md:w-[500px] '>

   
   <div className=' my-5 flex flex-col items-center md:my-6'>
    <div className=' flex justify-center'>
    <div className=' flex flex-col items-start'>

<label htmlFor="email">Email</label>
<input 
className=' border border-black w-[220px] rounded focus:bg-indigo-100 md:w-[300px] '
type="text"
id='email'
{...register("email")}
/>

</div>
    </div>
  
    <p className=' text-red-500 w-[220px] md:w-[300px]'>{status?.error?.emailError}</p>
   </div>


       
   
     {isPasswordVisible? 
     <div className=' flex flex-col items-center md:my-6'>

<div className=' flex justify-center'>
     <div className=' flex flex-col items-start'>
<label htmlFor="password">Password</label>

<div>
<input
      type="text" 
      id='password'
      className=' border border-black w-[200px] focus:bg-indigo-100 rounded md:w-[280px]' 
      {...register("password")}
      /> 


<button type='button' onClick={()=>{
       setIsPasswordVisible(!isPasswordVisible)
      }}>{isPasswordVisible? <i className="fa-solid fa-eye-slash"></i> : <i className="fa-solid fa-eye"></i>}
      </button>
</div>

     </div>

     </div>

     <p className=' text-red-500 w-[220px] md:w-[300px]'>{status?.error?.passwordError}</p>
     </div>


 


    
      
      :

     <div className=' flex flex-col items-center md:my-6'>

<div className=' flex justify-center'>
     <div className=' flex flex-col items-start'>
<label htmlFor="password">Password</label>

<div>
<input
      type="password" 
      id='password'
      className=' border border-black w-[200px] focus:bg-indigo-100 rounded md:w-[280px]' 
      {...register("password")}
      /> 


<button type='button' onClick={()=>{
       setIsPasswordVisible(!isPasswordVisible)
      }}>{isPasswordVisible? <i className="fa-solid fa-eye-slash"></i> : <i className="fa-solid fa-eye"></i>}
      </button>
</div>

     </div>
     
     </div>

     <p className=' text-red-500 w-[220px] md:w-[300px]'>{status?.error?.passwordError}</p>
     </div>
    }
     
    
      

      <button className=' bg-green-500 px-4 py-1 rounded text-white font-semibold my-5'>Login</button>

      </div>
      </form>

     {
      !tokenObj?.token && <p className=' text-center'>Don't have an account ?
      <Link to="/signup" className= ' text-violet-500 font-semibold'>Signup</Link> </p>
     }
      
    </div>
  )
}

export default Login
