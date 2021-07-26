import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import { validateEmail } from '../utils/helpers'

export default function Example() {
  const [formState, setFormState] = useState({ username: '', email: '', password: '' });
  const [addUser, { error }] = useMutation(ADD_USER);
  const [errorMessage, setErrorMessage] = useState([]);
  // update state based on form input changes

  // useEffect(() => {

  // })

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
    if (e.target.name === 'email') {
      const isValid = validateEmail(e.target.value);
      console.log(isValid);
      if (!isValid) {
        setErrorMessage({ email: 'Your email is invalid.' });
      } else {
        setErrorMessage('');
      }
    } else if (e.target.name === 'username') {
      if (e.target.value.length < 2) {
        setErrorMessage({ username: `Username's must be at least 2 characters!` })
      } else {
        setErrorMessage({ username: `` })
      }
    } else {
      if (e.target.value.length < 5) {
        setErrorMessage({ password: `Password's must be at least 5 characters!` })
      } else {
        setErrorMessage({ password: `` })
      }
    }

  };
  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      // execute addUser mutation and pass in variable data from form
      const { data } = await addUser({
        variables: { ...formState }
      });
      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div className="h-full bg-gray-800 flex sm:p-4">
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>

            <h2 className="mt-6 text-3xl font-extrabold text-gray-100">Create an account</h2>


            <div className="mt-6">
              <form onSubmit={handleFormSubmit}>
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                    User Name
                    {errorMessage.username && (<div className='py-3 text-red-500'>{errorMessage.username}</div>)}
                  </label>
                  <div className="mt-1">
                    <input
                      placeholder='Your username'
                      name='username'
                      type='username'
                      id='username'
                      value={formState.username}
                      onChange={handleChange}
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                    {errorMessage.email && (<div className='py-3 text-red-500'>{errorMessage.email}</div>)}
                  </label>
                  <div className="mt-1">
                    <input
                      placeholder='Your email'
                      name='email'
                      type='email'
                      id='email'
                      value={formState.email}
                      onChange={handleChange}
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                    {errorMessage.password && (<div className='py-3 text-red-500'>{errorMessage.password}</div>)}
                  </label>
                  <div className="mt-1">
                    <input
                      placeholder='******'
                      name='password'
                      type='password'
                      id='password'
                      value={formState.password}
                      onChange={handleChange}
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>



                <div>
                  <button
                    type="submit"
                    className="w-full mt-5 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Create Account
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:block relative w-0 flex-1">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
          alt=""
        />
      </div>
    </div>
  )
}