import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import { useDispatch, useSelector } from 'react-redux'
import { jobLoadAction } from '../redux/actions/jobAction'
import { useParams } from 'react-router-dom';
import JobCard from './JobCard';

const Home = () => {
    // const { jobs, SetUniqueLocation, pages, loading } = useSelector(state => state.loadJobs);
    const dispatch = useDispatch();
    const { keyword, location } = useParams();


    const [page, setPage] = useState(1);
    const [cat, setCat] = React.useState('');
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedJobType, setSelectedJobType] = useState("");

    //To search for jobs in the search bar and for that to get job data from Redux store
    const { jobs, loading, error } = useSelector(state => state.loadJobs);

    useEffect(() => {
        dispatch(jobLoadAction(page, keyword, cat, location));
    }, [page, keyword, cat, location]);

    const filteredJobs = Array.isArray(jobs) ? jobs.find((job) => {
        const matchesSearch = searchTerm
            ? job.title.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
            job.location.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
            job.description.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
            job.salary.toLowerCase().includes(searchTerm.toLocaleLowerCase())
            : true;

        const matchesJobType = selectedJobType
            ? job.title.toLowerCase().includes(selectedJobType.toLowerCase())
            : true;

        return matchesSearch && matchesJobType
    }) : [];

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
                        <Link to="/students/home" className="group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-blue-600 bg-gray-100" >
                            <svg className="mr-4 h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            Fulltime Jobs
                        </Link>
                        <Link to="/students/home/other-jobs" className="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50" >
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
                        Job Listings
                    </h1>

                    {/* //Search bar                     */}
                    <div className="mb-5 mt-5" >
                        <input type="text" className='p-2 border border-gray-300 rounded w-full' placeholder='Search Jobs...'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    {/* //Show Loading, Error, or Filtered Jobs */}
                    {loading ? (
                        <p className='text-center text-gray-500'> Loading...</p>
                    ) : error ? (
                        <p className='text-center text-gray-500'>{error}</p>
                    ) : searchTerm ? (
                        filteredJobs ? (
                            <JobCard
                                key={filteredJobs._id}
                                title={filteredJobs.title}
                                location={filteredJobs.location}
                                description={filteredJobs.description}
                                salary={filteredJobs.salary}
                                createdAt={filteredJobs.createdAt}
                            />
                        ) : (
                            <p className='text-gray-500'> No Jobs Found</p>
                        )
                    ) : (
                        jobs && jobs.length > 0 ? (
                            jobs.map((job) => (
                                <JobCard
                                    key={job._id}
                                    title={job.title}
                                    location={job.location}
                                    description={job.description}
                                    salary={job.salary}
                                    createdAt={job.createdAt}
                                />
                            ))
                        ) : (
                            <p className='text-gray-500'>No jobs found</p>
                        )
                    )}

                </main>
                <div className="w-64 p-6 bg-white border-l border-gray-200">
                    <h2 className="text-lg font-medium">Filters</h2>
                    <div className="flex flex-col gap-4 mt-2">
                        {/* Job Type Dropdown */}
                        <select
                            className="p-2 border border-gray-300 rounded"
                            value={selectedJobType}
                            onChange={(e) => setSelectedJobType(e.target.value)}>
                            <option value="">All Job Types</option>
                            <option value="backend">Backend</option>
                            <option value="frontend">Frontend</option>
                        </select>

                        {loading ? (
                            <p className="text-center text-gray-500">Loading...</p>
                        ) : error ? (
                            <p className="text-center text-red-500">{error}</p>
                        ) : Array.isArray(filteredJobs) && filteredJobs.length > 0 ? (
                            filteredJobs.map((job) => (
                                <JobCard
                                    key={job._id}
                                    title={job.title}
                                    location={job.location}
                                    description={job.description}
                                    salary={job.salary}
                                    createdAt={job.createdAt}
                                />
                            ))
                        ) : (
                            <p className="text-gray-500">No jobs found</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home

