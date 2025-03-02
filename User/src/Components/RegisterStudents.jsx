import React from 'react'
import Navbar from './Navbar';
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';


const Register = () => {
    const { 
        register,
        handleSubmit,
        watch,
        formState: {errors},
    } = useForm();

    const onSubmit = async (data) => {
      
      let r = await fetch("http://localhost:3000/")
      let res = await r.text()
        console.log(data, res);
    }
  return (
    <form onSubmit={handleSubmit(onSubmit)}> 
    <div className='w-full flex flex-col items-center justify-center text-center'>
      <Navbar /> 
      <div className='  w-5/12 h-4/6 bg-white border-2 mt-20 rounded-md shadow-lg'>
        <div className='text-3xl font-semibold m-9'>Register Students</div>
        <div>
            <div className='flex flex-row'>
              <button className=' rounded-md ml-auto p-2 m-2 bg-[#142683]   text-white border-2 '>
                <Link to='/students/register' > Job Seeker</Link>
              </button>
              <button className='rounded-md mr-auto p-2 m-2 bg-white   text-bg-[#142683] border-2 border-[#142683]'>
                <Link to='/company/register'>Employer</Link>
              </button>
              </div>
          <div className='m-4'>
            <div className='text-lg font-normal text-left'>Email</div>
            <input type="text" className='w-full border-2 border-black rounded-xl p-3' placeholder='Enter your email' 
            {...register("name")}/>
          </div>
          <div className='m-4'>
            <div className='text-lg font-normal text-left'>Password</div>
            <input type="password" className='w-full border-2 border-black rounded-xl p-3' placeholder='Enter your password' 
            {...register("password")}
            />
          </div>
          <div>
            Already have an account ?
            <Link to="/students/login" className='no-underline text-blue-700'> Login</Link>
          </div>
          <button type='submit' className='cursor-pointer px-8 py-2 mb-8 text-lg rounded-md bg-[#142683] text-white mt-10 hover:bg-blue-800 ease-in-out duration-100 hover:scale-105'>Register</button>
        </div>
      </div>
    </div>
    </form>
  )
}

export default Register
