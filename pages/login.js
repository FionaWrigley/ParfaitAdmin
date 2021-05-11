import { useState } from 'react';
import { useForm } from "react-hook-form";
import { useRouter } from 'next/router';


const login = (props) => {

    const router = useRouter();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => formSubmit(data);

     const [error, setErrorMessage] = useState('');

    const formSubmit = (user) => {

         fetch(process.env.parfaitServer+ '/login', {
                     method: 'POST',
                     body: JSON.stringify(user),
                     headers: {
                         'Content-Type': 'application/json; charset=utf-8',
                     },
                         credentials: 'include'
                      })
                      .then(res => { 
                         switch(res.status){
                         case 204:
                             router.push('/useradmin');
                             break;
                         case 401: 
                             router.push('/login');
                              setErrorMessage("Invalid username or password");
                             break;
                         case 403:
                            setErrorMessage("YOU ARE NOT AUTHORISED TO USE ADMIN PANEL")
                            break;
                         case 422: 
                             router.push('/login');
                              setErrorMessage("Invalid username or password");
                             break;
                         }
                     }).catch(err => {

                         setErrorMessage("Oops, we are currently experiencing problem, please try again later")
                //         console.log("Oops: "+err)
                     });
             }

    return (
        <div
            className="min-h-screen flex items-center justify-center to-gray-50 from-gray-50 g-gradient-to-r  dark:to-primaryDark dark:from-secondaryDark py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <img className="mx-auto h-20 w-auto"
                        src="/images/logo.svg" alt="Workflow"/>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-indigo-800 dark:text-white">
                        Admin.
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <input type="hidden" name="remember" value="true"/>
                    <div className="rounded-md shadow-sm -space-y-px dark:bg-gray-200">
                        <div>
                            <label htmlFor="email" className="sr-only">Email address</label>
                            <input id="email" name="email" type="user.email" // value={user.email
                         autoComplete="email" 
                         className="dark:bg-gray-700 dark:text-white appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" 
                         {...register("email", { required: { value: true, message: "Email is required" } })}
                         />
                         </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input id="password" name="password" type="password" // value={user.password
                         autoComplete="current-password" 
                         {...register("password", { required: { value: true, message: "Password is required" }})}
                         className="dark:bg-gray-700 dark:text-white appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
                         placeholder="Password" />
                          </div>

                    </div>
                    <div className='h-4 mt-2'>
                         {(errors.email && <p className="errorMsg text-sm text-red-500 text-center">{errors.email.message}</p> ) ||
                         (errors.password && <p className="text-center errorMsg text-sm text-red-500">{errors.password.message}</p>)} 
                        </div>
                    <div className="flex items-center justify-between">
                    
                        {/* <div className="flex items-center">
                            <input
                                id="remember_me"
                                name="remember_me"
                                type="checkbox"
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"/>
                            <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                                Remember me
                            </label>
                        </div> */}

                        {/* <div className="text-sm">
                            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Forgot your password?
                            </a>
                        </div> */}
                    </div>

                    <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 dark:bg-gray-800 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <svg
                                        className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-hidden="true">
                                        <path
                                            fillRule="evenodd"
                                            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                            clipRule="evenodd"/>
                                    </svg>
                                </span>
                                Sign in
                            </button>
                       
                    </div>
                    <div className="text-red-500  mt-2"> {error} </div>
                    <div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default login;