import React from 'react'
import Navbar from './Navbar'

const HomePage = () => {
  return (
    <div>
    <Navbar/>
    <div className='flex h-screen items-center text-2xl flex-col mt-20'>
      WELCOME TO CUVETTE !
      <div className="text-md flex">
        World's best Job Search Site !
      </div>
    </div>
    </div>
  )
}

export default HomePage
