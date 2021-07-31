
// import { Redirect, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { io } from "socket.io-client";
import UserList from '../components/UserList';
import { LOGOUT_USER } from '../utils/mutations';
import { QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';
import { useQuery, useMutation } from '@apollo/client';
import Public from '../components/GlobalChat'
// import Header from "../components/Header"
import {
    CalendarIcon,
    FolderIcon,
    HomeIcon,
    InboxIcon,
    UsersIcon,
    LogoutIcon,
    GlobeAltIcon,
} from '@heroicons/react/outline'



function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Dashboard() {
    const [logout] = useMutation(LOGOUT_USER);
    const { error, data, loading } = useQuery(QUERY_ME);
    const [socket, setSocket] = useState(null);
    const loggedIn = Auth.loggedIn();
    // socket info here for now.. we are prop drilling.. we need to set up a global store

    useEffect(() => {
        const newSocket = io(`http://${window.location.hostname}:3001`);
        setSocket(newSocket);
        if (data) {
            newSocket.emit('loggedIn', data?.me)
        }

        return () => newSocket.close();
    }, [setSocket, data]);


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
        { name: '', href: '', icon: GlobeAltIcon, current: true },
        { name: '', href: '/', icon: HomeIcon, current: false },
        { name: '', href: '', icon: UsersIcon, current: false },
        { name: '', href: '', icon: FolderIcon, current: false },
        { name: '', href: '', icon: CalendarIcon, current: false },
        { name: '', href: '', icon: InboxIcon, current: false },

    ];


    return (
        <>
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
                                        <Link
                                            key={idx}
                                            to={item.href}
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
                                        </Link>
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
                <>
                    {data ?
                        <div className="flex flex-row w-full flex-1 overflow-hidden">
                            <main className=" w-full min-h-screen justify-center">
                                <div className="grid grid-cols-6 w-full bg-gray-600 h-screen flex-row">
                                    {/* SIDE PANEL  */}
                                    <div className="bg-gray-700  col-start-1 col-end-7 md:col-span-1 md:h-auto flex-row justify-center p-2">
                                        <h1 className="text-2xl font-semibold text-gray-900 text-center">Proximo</h1>
                                        {!data ? <p className='p-1'>No Active Users!</p> : loading ? <p>LOADING PLEASE WAIT</p> : <UserList key={'userList' + data.me.username} socket={socket}></UserList>}

                                    </div>
                                    {/* MAIN CHAT AREA */}
                                    <div className="col-span-6 col-start-1 col-end-7  md:col-start-2 flex-row justify-center p-1 h-full">
                                        {/* Replace with your content */}
                                        {/* <div className="py-4 px-0">
                                    <div className=" bg bg-gray-500 h-96" />
                                </div> */}
                                        <Public data={data} socket={socket} loggedIn={loggedIn} className='h-screen overflow-auto'></Public>
                                        {/* /End replace */}
                                    </div>
                                </div>
                            </main>
                        </div> : null}
                </>

            </div>
        </>
    )
}