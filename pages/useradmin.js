import { useEffect, useState } from "react";

const  useradmin = () => {

    const [members, setMembers] = useState([]);
    const [ready, setReady] = useState(false);
    const [searchVal, setSearchVal] = useState('*');
    const [hasChanged, setHasChanged] = useState(false);
    let counter = 1;

    useEffect(() => {
        fetch(process.env.parfaitServer+'/userlist/'+searchVal, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
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
                        setMembers(data);
                        setHasChanged(false);
                    })
                  }})
                  
            .catch(err => console.log("Oops: "+err));
    },[searchVal, hasChanged])

    const updateActiveFlag = (id, active) => {
        
        let flag = 1;
        if(active === 1){
            flag = 0;
        }

        let urlStr = '/activeFlag/'+id+'/'+flag;
        handleUpdate(urlStr)
    }

    const updateUserType = (id, userType) => { 
        let memberType = 'Member';

        if(userType === 'Member'){
            memberType = 'Admin';
        }
        let urlStr = '/userType/'+id+'/'+memberType;
        handleUpdate(urlStr)
    }

    const handleUpdate = (url) => {

    fetch(process.env.parfaitServer+url, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
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

              }}) 
        .catch(err => console.log("Oops: "+err));

            }
    return (

        <div>
         <div className="my-8">
                    <img className="mx-auto md:h-20 lg:h-20 w-auto h-10"
                        src="/images/logo.svg" alt="Workflow"/>
                    <h2 className="mt-3 md:mt-6 lg:mt-6 text-center text-xl lg:text-3xl md:text-3xl font-extrabold text-indigo-800 dark:text-white">
                        Admin.
                    </h2>
                </div>
<div className="flex flex-col sm:mx-4 lg:mx-8 my-4">
  <div className="text-center -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div className="py-2  align-middle inline-block min-w-full md:min-w-3/4 lg:min-w-3/4 sm:px-6 lg:px-8">
      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <div className="bg-white divide-y divide-gray-200 grid grid-col--6 min-w-full divide-y divide-gray-200">
          <div className="ml-20 bg-gray-50 col-start-1 row-start-1 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:block lg:block">
                Name
           </div>
              <div className="bg-gray-50 col-start-2 row-start-1 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:block lg:block">
                Status
              </div>
              <div className="bg-gray-50 col-start-3 row-start-1 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:block lg:block">
                Role
              </div>
              <div className="bg-gray-50 col-start-4 row-start-1 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:block lg:block">
                <span className="sr-only">Edit</span>
              </div>
            {members.map((member, index) => <> <div className="hidden">{counter++}</div>
              <div className={`text-left col-start-1 row-start-${counter} md:px-6 md:py-4 lg:px-6 lg:py-4 px-2 py-2 whitespace-nowrap`}>
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <img className="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60" alt="" />
                  </div>
                  <div className="md:ml-4 lg:ml-4 ml-2">
                    <div className="text-sm font-medium text-gray-900">
                      {member.fname} {member.lname}
                    </div>
                    <div className="text-sm text-gray-500">
                      {member.memberID}
                    </div>
                    <div className="text-sm text-gray-500">
                      {member.email}
                    </div>
                  </div>
                </div>
              </div>
              <div className={`text-left col-start-2 row-start-${counter} md:px-6 lg:px-6 px-2 py-5 whitespace-nowrap`}>
                
                <span className={`px-2 inline-flex text-xs w-15 leading-5 font-semibold rounded-full ${member.activeFlag === 1 ? 'bg-green-100 text-green-800' : 'bg-gray-300 text-gray-800' }`}>
                {member.activeFlag === 1 ? 'Active' : 'Inactive'}
                </span>
              </div>
              <div className={`text-left col-start-3 row-start-${counter} md:px-6 lg:px-6 px-2 py-6 whitespace-nowrap text-xs text-gray-500`}>
                {member.userType}
              </div>
              <div className={`col-start-4 row-start-${counter} px-6 py-4 whitespace-nowrap text-right text-sm hidden md:block lg:block font-medium`}>
              <button
                    className="mr-2 w-20 inline-flex justify-end py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick = {() => updateUserType(member.memberID,member.userType)}>
                    {member.userType === 'Admin' ? 'Demote' : 'Promote'}
                </button>
                <button
                    className="mr-2 w-50 inline-flex justify-end py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick = {() => updateActiveFlag(member.memberID,member.activeFlag)}>
                    {member.activeFlag === 1 ? 'Deactivate' : 'Reactivate'}
                </button>
                <button
                    className="w-20 inline-flex justify-end py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
                    onClick = {() => confirm('Are you sure you want to delete member '+member.fname+' '+member.lname+ "?")}   >
                    Delete
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

export default useradmin;