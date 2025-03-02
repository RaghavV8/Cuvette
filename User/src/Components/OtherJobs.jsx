import React from 'react'
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const StudentsHome = () => {
    return (
        <div className='bg-white'>
            <nav className="bg-white shadow-md border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        {/* Logo Section */}
                        <div className="flex items-center">
                            <a href="#" className="flex-shrink-0">
                                <img className="h-8 w-auto" src="/logo.svg" alt="Cuvette" />
                            </a>
                        </div>

                        {/* Profile Section */}
                        <div className="flex items-center">
                            <div className="ml-4 flex items-center">
                                <div className="flex items-center border border-gray-300 rounded-lg py-1 px-6">
                                    <img src="user.png" className="h-8 w-8 rounded-full" alt="Profile" />
                                    <select name="" id="" className='p-2 ml-4  border border-gray-300 rounded'>
                                        <option value="">Student</option>
                                        <option value="">Logout</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="flex">
                <aside className='w-64 bg-white border-r border-gray-200 h-screen'>
                    <nav className='mt-5 px-2'>
                        <Link to="/students/home" className="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50 " >
                            <svg className="mr-4 h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            Fulltime Jobs
                        </Link>
                        <Link to="/students/home/other-jobs" className="group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-blue-600 bg-gray-100" >
                            <svg className="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                            </svg>
                            Other Jobs
                            <span className="ml-auto inline-block py-0.5 px-2 text-xs font-medium rounded-full bg-green-100 text-green-800">
                                New
                            </span>
                        </Link>
                        <Link to="/students/home/applied" className="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50" >
                            <svg className="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            Applied
                        </Link>
                    </nav>
                </aside>

                <main className="flex-1 p-10 ">
                    <h1 className="text-2xl font-semibold">
                        Other Jobs
                    </h1>
                    <div className="mb-5 mt-5" >
                        <input type="text" className='p-2 border border-gray-300 rounded w-full' placeholder='Search Jobs...' />
                    </div>
                </main>
            </div>
        </div>
    )
}

export default StudentsHome
