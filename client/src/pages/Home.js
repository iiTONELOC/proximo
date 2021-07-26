import React from 'react';
// import { ExternalLinkIcon } from '@heroicons/react/solid'
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';

export default function Home() {
  const logout = event => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <section className='w-full h-4/6 flex justify-center'>
      <div className="w-full relative bg-gray-800">
        <div className="h-56 bg-indigo-600 sm:h-72 md:absolute md:left-0 md:h-full md:w-1/2">
          <img
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1525130413817-d45c1d127c42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1920&q=60&blend=6366F1&sat=-100&blend-mode=multiply"
            alt=""
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="md:ml-auto md:w-1/2 md:pl-10">
            <h2 className="text-base font-semibold uppercase tracking-wider text-gray-300">Award winning support</h2>
            <p className="mt-2 text-white text-3xl font-extrabold tracking-tight sm:text-4xl">We’re here to help</p>
            <p className="mt-3 text-lg text-gray-300">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et, egestas tempus tellus etiam sed. Quam a
              scelerisque amet ullamcorper eu enim et fermentum, augue. Aliquet amet volutpat quisque ut interdum
              tincidunt duis.
            </p>
            <div className="mt-8">
              <div className="inline-flex rounded-md shadow">
                {!Auth.loggedIn() ? <> <Link
                  to="/login"
                  className="inline-block bg-indigo-500 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75"
                >
                  Sign in
                </Link>
                  <Link
                    to="/signup"
                    className="ml-4 inline-block bg-white py-2 px-4 border border-transparent rounded-md text-base font-medium text-indigo-600 hover:bg-indigo-50"
                  >
                    Sign up
                  </Link> </> : <><a
                    href="/"
                    onClick={logout}
                    className="inline-block bg-white py-2 px-4 border border-transparent rounded-md text-base font-medium text-indigo-600 hover:bg-indigo-50"
                  >Logout</a> </>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  )
}