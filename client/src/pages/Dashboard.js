
// import { Redirect, useParams } from 'react-router-dom';
import React from 'react'
import { Link } from 'react-router-dom';
import UserList from '../components/UserList';
import { LOGOUT_USER } from '../utils/mutations';
import { QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';
import { useQuery, useMutation } from '@apollo/client';
import Header from "../components/Header"
import {
    CalendarIcon,
    FolderIcon,
    HomeIcon,
    InboxIcon,
    UsersIcon,
    LogoutIcon,
} from '@heroicons/react/outline'



function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Dashboard() {
    const [logout] = useMutation(LOGOUT_USER);
    const { error, data, loading } = useQuery(QUERY_ME);

    const _id = () => {
        if (data !== undefined) return data.me._id
    }
    async function handleLogout(e) {
        e.preventDefault();
        const offline = await logout({ variables: { user_id: _id() } });
        if (offline) {
            Auth.logout()
        }
        if (error) {
            console.log(error)
        }

    }

    const navigation = [
        { name: '', href: '#', icon: HomeIcon, current: true },
        { name: '', href: '#', icon: UsersIcon, current: false },
        { name: '', href: '#', icon: FolderIcon, current: false },
        { name: '', href: '#', icon: CalendarIcon, current: false },
        { name: '', href: '#', icon: InboxIcon, current: false },

    ];
    if (loading) {
        return <h1>Loading please wait...</h1>
    }

    return (
        <>
            <Header></Header>
            <div className="h-screen flex overflow-hidden bg-gray-100">

                {/* Static sidebar for desktop */}
                <div className="h-full md:flex md:flex-shrink-0">
                    <div className="h-full flex flex-col w-20 ">
                        {/* Sidebar component, swap this element with another sidebar if you like */}
                        <div className=" h-full flex flex-col ">
                            <div className="flex items-center h-16 flex-shrink-0 px-4 bg-gray-900">
                                <Link to="/">
                                    <span className="sr-only">Proximo</span>
                                    <img
                                        // INSERT ICON HERE
                                        className="h-10 w-auto"
                                        src="https://tailwindui.com/img/logos/workflow-mark.svg?color=white"
                                        alt=""
                                    />
                                </Link>
                            </div>
                            <div className=" h-full flex-1 flex flex-col overflow-y-auto">
                                <nav className="h-full px-2 py-4 bg-gray-800 space-y-1">
                                    {navigation.map((item, idx) => (
                                        <a
                                            key={idx}
                                            href={item.href}
                                            className={classNames(
                                                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                                            )}
                                        >
                                            <item.icon
                                                className={classNames(
                                                    item.current ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300',
                                                    'mr-3 flex-shrink-0 h-6 w-6'
                                                )}
                                                aria-hidden="true"
                                            />
                                            {item.name}
                                        </a>
                                    ))}
                                    <a
                                        href="/"
                                        onClick={handleLogout}
                                        className={classNames(
                                            'text-gray-300 hover:bg-gray-700 hover:text-white',
                                            'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                                        )}
                                    >
                                        <LogoutIcon
                                            className={classNames(
                                                'text-gray-400 group-hover:text-gray-300',
                                                'mr-3 flex-shrink-0 h-6 w-6'
                                            )}
                                            aria-hidden="true"
                                        />

                                    </a>

                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-0 flex-1 overflow-hidden">
                    {/* <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
                    <button
                        className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <span className="sr-only">Open sidebar</span>
                        <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                    <div className="flex-1 px-4 flex justify-between">
                        <div className="flex-1 flex">
                            <form className="w-full flex md:ml-0" action="#" method="GET">
                                <label htmlFor="search-field" className="sr-only">
                                    Search
                                </label>
                                <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                                    <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                                        <SearchIcon className="h-5 w-5" aria-hidden="true" />
                                    </div>
                                    <input
                                        id="search-field"
                                        className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
                                        placeholder="Search"
                                        type="search"
                                        name="search"
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="ml-4 flex items-center md:ml-6">
                            <button className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                <span className="sr-only">View notifications</span>
                                <BellIcon className="h-6 w-6" aria-hidden="true" />
                            </button>

                            {/* Profile dropdown */}

                    {/* </div>
                    </div>
                </div> */}

                    <main className="flex flex-col  min-h-screen">
                        <div className="bg-gray-600 flex flex-row">
                            <div className="bg-gray-700 w-56 h-screen flex-none">
                                <h1 className="text-2xl font-semibold text-gray-900 mx-14 my-5">Proximo</h1>
                                {!data ? <p className='p-1'>No Active Users!</p> : <UserList key={'userList' + data.me.username} data={data}></UserList>}

                            </div>
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                                {/* Replace with your content */}
                                <div className="py-4 px-0">
                                    <div className=" bg bg-gray-500 h-96" />
                                </div>
                                {/* /End replace */}
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}