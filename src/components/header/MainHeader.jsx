import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom'
import { setAIgeneratedScript, setStatus } from '../../features/script/scriptSlice';

const MainHeader = () => {
const [showNavBar, setShowNavBar] = useState(false);
const dispatch = useDispatch();

const showNavBarFn = ()=>{
    setShowNavBar(true);
}

const hideNavBarFn = ()=>{
    setShowNavBar(false);
}

  return (
    
    <>
<div className=  'flex justify-end md:mb-4'  >
    <div className= {`w-[40%] h-[100vh] bg-gray-700 fixed top-0 duration-700 text-white ${(showNavBar)? 'right-0' :  'right-[-40%]'} md:flex md:flex-row md:h-auto md:w-[100vw] md:right-0 `} >
    <button className=' text-3xl ml-1 md:hidden' onClick={hideNavBarFn}>&times;</button>
        <ul className=' flex flex-col items-center justify-between h-[40%] md:flex md:flex-row md:justify-end md:h-auto md:w-full md:items-center md:my-4'>
            <li className=' md:mx-8'>
            <NavLink onClick={()=>{
                setShowNavBar(false)
            }} to= '/'
             className={({ isActive }) =>
             `duration-200 ${
               isActive ? "text-orange-700" : "text-white"
             }`
           }
            >
           Login
            </NavLink>
            </li>

            <li className=' md:mx-8'>
            <NavLink onClick={()=>{
                setShowNavBar(false)
            }} to= '/signup'
             className={({ isActive }) =>
             `duration-200 ${
               isActive ? "text-orange-700" : "text-white"
             } `
           }
            >
           Signup
            </NavLink>
            </li>


            <li className=' md:mx-8'>
            <NavLink onClick={()=>{
              dispatch(setAIgeneratedScript())
              dispatch(setStatus())
                setShowNavBar(false)
            }} to= '/create-script'
             className={({ isActive }) =>
             `duration-200 ${
               isActive ? "text-orange-700" : "text-white"
             } `
           }
            >
           Create Script
            </NavLink>
            </li>



            <li className=' md:mx-8'>
            <NavLink onClick={()=>{
                setShowNavBar(false)
            }} to= '/dashboard'
             className={({ isActive }) =>
             `duration-200 ${
               isActive ? "text-orange-700" : "text-white"
             } `
           }
            >
           Dashboard
            </NavLink>
            </li>




    
        </ul>
    </div>
    <button className=' text-3xl mt-2 mr-4' onClick={showNavBarFn}>&#9776;</button>
    </div>

    </>
  )
}

export default MainHeader
