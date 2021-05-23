import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';

const  sessionadmin = () => {

    const [sessions, setSessions] = useState([]);
    const [ready, setReady] = useState(false);
    const [hasChanged, setHasChanged] = useState(false);
    const router = useRouter();
    let counter = 1;

    useEffect(() => {

        fetch(process.env.parfaitServer+'/sessions', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json; charset=utf-8',
          },
            credentials: 'include'
        }).then((res) => {
          switch (res.status) {
              case 401:
                  router.push('/login');
                  break;
              case 403:
                  router.push('/login');
                  break;
              case 200:
                  res.json()
                      .then((data) => {
                        setSessions(data);
                        setHasChanged(false);
                    })
          }})
                  
            .catch(err => console.log("Oops: "+err));
                
    },[hasChanged])

    const deleteSession = (id) => {

      let warningMsg = 'Are you sure you want to end session '+id+'?';
      
      if(id === '*'){

          warningMsg = 'Are you sure you want to end all sessions? This will log all users out of Parfait, including yourself';
      }

      let urlStr = '/deletesession/'+id

      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <div className="py-2 align-middle inline-block min-w-full md:min-w-3/4 lg:min-w-3/4 sm:px-6 lg:px-8">
            <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
              <div className='bg-white min-w-1/2 text-center px-6'>
              <div className='p-6 text-center justify-center text-gray-800 flex min-w-full'>
            <svg className="h-12 w-12 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            
  </svg>
        
        <h1 className ='font-extrabold text-2xl text-center ml-5 mt-3'>Delete session</h1>
        </div>
        <p className='p-8 text-black text-xl'>{warningMsg}</p>
        <div className = 'p-6'>
        <button
          className="w-20 mr-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={onClose}>No</button>
        <button
        className="w-20 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
        onClick ={ () => { 
          handleUpdate(urlStr);
          onClose();
        }}>
          Yes</button>
        </div>
        </div>
        </div>
        </div>
      )}})
    }
      
    

    const handleUpdate = (url) => {

    fetch(process.env.parfaitServer+url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
      },
        credentials: 'include'
    }).then((res) => {
      switch (res.status) {
     
          case 401:
              router.push('/login');
              break;
          case 403:
              router.push('/login');
              break;
          case 204: 
            setHasChanged(true);
            break;
          default: 
            setHasChanged(true);
            break;
              }}) 
        .catch(err => console.log("Oops: "+err));

            }

            const logOut = () => {
                fetch(process.env.parfaitServer+'/logout', {
                    method: 'GET',
                     headers: {'Content-Type': 'application/json; charset=utf-8'},
                    credentials: 'include'
                }).then((res) => {
                        if(res.status == 204){
                            router.push('/login');
                        }
                    }).catch(err => console.log("Oops: "+err));
            }

         


    return (

        <div>
          <div className = "w-full md:w-auto fixed md:absolute  lg:absolute lg:ml-2 md:ml-2 -left-0 lg:top-2 md:top-2 -bottom-1">
          <button className="bg-gray-700 md:w-auto lg:w-auto hover:bg-blue-dark text-white font-bold py-2 px-4 hover:bg-gray-800 lg:rounded md:rounded w-1/2"
            onClick={() => router.push('/useradmin')}>
            User Admin
          </button>
          <button className="bg-gray-800 md:w-auto lg:w-auto lg:ml-2 md:ml-2 hover:bg-blue-dark text-white font-bold py-2 px-4 hover:bg-gray-800 lg:rounded md:rounded w-1/2"
            onClick={() => router.push('/sessions')}>
            Session Admin
          </button>
          
        </div>
        <button className="absolute mr-2 -right-0 top-2 bg-gray-700 hover:bg-blue-dark text-white font-bold py-2 px-4 hover:bg-gray-800 rounded"
            onClick={logOut}>
            Log out
        </button>
           
         <div className="my-8">
                    <img className="mx-auto md:h-20 lg:h-20 w-auto h-10"
                        src="/images/logo.svg" alt="Workflow"/>
                    <h2 className="mt-3 md:mt-6 lg:mt-6 text-center text-xl lg:text-3xl md:text-3xl font-extrabold text-indigo-800 dark:text-white">
                        Session Admin.
                    </h2>
                </div>

<div className="flex flex-col sm:mx-4 lg:mx-8 my-4">
  <div className="text-center -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div className="py-2  align-middle inline-block min-w-full md:min-w-3/4 lg:min-w-3/4 sm:px-6 lg:px-8">
      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg lg:mb-0 md:mb-0 mb-5">
        <div className="bg-white divide-y divide-gray-200 grid lg:grid-col-3 md:grid-col-2 grid-col-1 min-w-full max-width-full divide-y divide-gray-200">
          <div className="ml-20 bg-gray-50 col-start-1 row-start-1 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:block lg:block">
                Session
           </div>
              <div className="bg-gray-50 lg:col-start-2 md:hidden sm:hidden row-start-1 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:block lg:block">
                Data
              </div>
              <div className="text-center bg-gray-50 lg:col-start-3 md:col-start-1 col-start-1 lg:col-span-1 md:col-span-1 col-span-1 row-start-1 px-2 py-1 text-center text-xs font-medium text-gray-500 uppercase tracking-wider md:block lg:block">
              <button
                    className="w-20 inline-flex justify-end py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
                    onClick = {() => deleteSession('*')}   >
                    End all sessions
                </button>
              </div>
         
            {sessions.map((session, index) => 
         <>
                 
  
  <div className="hidden">{counter++}</div>
              <div className={`text-left col-start-1 row-start-auto lg:row-start-${counter} md:px-6 md:py-4 lg:px-6 lg:py-4 px-2 py-2 whitespace-nowrap`}>
                <div className="flex items-center">
                  <div className="md:ml-4 lg:ml-4 ml-2">
                    <div className="text-sm font-medium text-gray-900">
                      {session.session_id}
                    </div>
                  </div>
                </div>
              </div>
              <div className={`text-left lg:col-start-2 md:col-start-1 md:col-span-1 col-start-1 col-span-1 lg:col-span-1 row-start-auto  md:px-6 lg:px-6 px-2 py-6 text-xs text-gray-500 break-all`}>
                {session.data}
              </div>
              <div className={`lg:col-start-3 md:col-start-1 col-start-1 row-start-auto md:col-span-1 col-span-1 lg:col-span-1 md:col-span-1 px-6 py-4 whitespace-nowrap  lg:text-right md:text-right sm:text-right text-center text-sm md:block lg:block font-medium`}>
                <button
                    className="mr-2 w-50 inline-flex justify-end py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"                    onClick = {() => deleteSession(session.session_id)}   >
                    End session
                </button>
              </div> </>)}
        </div> 
      </div>
    </div>
  </div>
</div>
</div>      
    )
}

export default sessionadmin;