import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Dashboard', href: '/dashboard' },
]
function RenderLinks() {
  return (
    Auth.loggedIn() ? navigation.map((link) => (
      <Link key={link.name} to={link.href} className="text-base font-medium text-white hover:text-indigo-50">
        {link.name}
      </Link>
    )) : null
  )
}
export default function Example() {
  return (
    <header className="bg-gray-600">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="w-full py-6 flex items-center justify-between border-b border-indigo-500 lg:border-none">
          <div className="flex items-center">
            <Link to="/">
              <span className="sr-only">Proximo</span>
              <img
                // INSERT ICON HERE
                className="h-10 w-auto"
                src="https://img.icons8.com/color/48/000000/p.png"
                alt=""
              />
            </Link>
            <div className="hidden ml-10 space-x-8 lg:block">
              {RenderLinks()}
            </div>
          </div>
          <div className="ml-10 space-x-4">
            {!Auth.loggedIn() ? <> <Link
              to="/login"
              className="inline-block bg-gray-500 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75"
            >
              Sign in
            </Link>
              <Link
                to="/signup"
                className="inline-block bg-white py-2 px-4 border border-transparent rounded-md text-base font-medium text-gray-600 hover:bg-indigo-50"
              >
                Sign up
              </Link> </> : null}
          </div>
        </div>
        {/* SMALLER SCREEN LAYOUT DONT REMOVE */}
        <div className="py-4 flex flex-wrap justify-center space-x-6 lg:hidden">
          {RenderLinks()}
        </div>
        {/* SMALLER SCREEN LAYOUT DONT REMOVE */}
      </nav>
    </header>
  )
}