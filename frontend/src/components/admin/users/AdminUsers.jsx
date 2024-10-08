import useAuth from "../../../hooks/useAuth";
import { QueryClient, useQuery } from "react-query";
import { useState } from 'react';
import useFetch from "../../../hooks/useFetch";
import { Link } from "react-router-dom";
import { Add } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
import { CircularProgress } from '@mui/material';
import baseURL from '../../../shared/baseURL';
import UsersStatusModal from '../users/UsersStatusModal';
import DeleteUserModal from '../users/DeleteUserModal';
import { Pagination } from "@mui/material";

const AdminUsers = () => {
  const queryClient = new QueryClient();
  const {auth} = useAuth();
  const fetch = useFetch();
  const url = `${baseURL}user`
  const [openModal, setOpenModal] = useState(false)
  const [loading, setLoading] = useState(false)

  // pagingation
  const [page, setPage] = useState(1)
  const handleChange = (event, value) =>{
    setPage(value)
  }

  const handleOpen = () => setOpenModal(true)
  const handleClose = () => setOpenModal(false)

  const [openUpdate, setOpenUpdate] = useState(false);
  const handleUpdateOpen = () => setOpenUpdate(true);
  const handleUpdateClose = () => setOpenUpdate(false);
  const [customer, setCustomer] = useState({})

  const [openStatus, setOpenStatus] = useState(false);
  const handleOpenStatus = () => setOpenStatus(true);
  const handleCloseStatus = () => setOpenStatus(false);

  //delete modal
  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleDeleteClose = () => setOpenDelete(false);
  const [userId, setUserId] = useState("")


  const [tools, setTools] = useState(false)
  const handleTools = (_id) => {
    if (tools === _id) {
      setTools(false)
    } else {
      setTools(_id)
    }
  }
  const getUsers = async () => {
    const result = await fetch(`${url}?page=${page}&limit=5`, auth.accessToken);

    return result.data;
  };
  

  const { data, isError, isLoading, isSuccess } = useQuery(
    ["users", page],
    getUsers,
    { keepPreviousData: true,
        staleTime: 10000,
        refetchOnMount:"always" }
  );
  return (
    <div className=' pt-5 max-sm:mt-10 h-auto'>
      <ToastContainer />
      <div className=' mb-4 max-md:w-full'>
        <div className=' block bg-cyan-500 w-20 min-w-max p-1 rounded-xl'>
          <span className=' text-cyan-50 text-center block'>
            All Users  
          </span>
        </div>
        {/* <div className=' block bg-cyan-500 w-10 min-w-max p-1 rounded-xl'>
          <span className=' text-cyan-50 text-center block'>
            {0}
          </span>
        </div> */}
      </div>
      <div className=" border-dashed border rounded-md border-red-900 h-auto">
        <div className="overflow-auto w-full rounded-lg border border-gray-200 shadow-md p-2">
          <table className="w-full min-w-max border-collapse bg-white text-left text-sm text-gray-500 max-lg:w-full">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-4 font-medium text-gray-900"
                >
                  User Info
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 font-medium text-gray-900"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 font-medium text-gray-900"
                >
                  Date Created
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 font-medium text-gray-900"
                >
                  Type
                </th>
                <th
                
                  scope="col"
                  className="px-6 py-4 font-medium text-gray-900"
                >Tools</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 border-t border-gray-100">
              { Array.isArray(data?.users) && data?.users.length > 0 ?(
                 data.users.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50">
                
                <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                  <div className="relative h-10 w-10">
                    <img
                      className="h-full w-full rounded-full object-cover object-center"
                      src=''
                      alt="Profile"
                    />
                    <span className={`absolute right-0 bottom-0 h-2 w-2 rounded-full ${user.status === 'Active' ? 'bg-green-400' : 'bg-red-600'} ring ring-white`}></span>
                  </div>
                  <div className="text-sm">
                    <div className="font-medium text-gray-700 text-start">{`${user.firstname} ${user.lastname}`}</div>
                    <div className="text-gray-400">{user.email}</div>
                  </div>
                </th>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold ${user.status === 'Active' ? 'text-green-600' : 'text-red-600 bg-red-50'}`}>
                    <span className={`${user.status === 'Active' ? 'h-1.5 w-1.5 rounded-full bg-green-600' : 'h-1.5 w-1.5 rounded-full bg-red-600'}`}></span>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4">{user.createdAt.substring(0,10)}</td>
                <td className="px-6 py-4">{user.type}</td>
                <td className="px-6 py-4">
                  <div className="">
                    <button onClick={() => handleTools(user._id)}>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      height="24px" 
                      viewBox="0 0 24 24" 
                      width="24px" 
                      fill="#6b7280"
                      >
                        <path d="M0 0h24v24H0V0z" 
                        fill="none"
                      />
                      <path d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.97.89 1.66.89H22c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14z"/><circle cx="9" cy="12" r="1.5"/><circle cx="14" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/></svg>
                    </button>
                    {
                      tools === user._id && (
                        <div className=' flex justify-end gap-4 absolute right-20 bg-sky-100 rounded-md p-1'>
                    <button
                      onClick={() => {handleOpenDelete() 
                        setUserId(user._id)
                      }}
                      x-data="{ tooltip: 'Delete' }"
                      href="#"
                      className=' text-red-600'
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-6 w-6"
                        x-tooltip="tooltip"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                    <button
                        onClick={() => {
                          handleOpenStatus();
                          setUserId(user._id);
                        }}
                      >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        height="24px" 
                        viewBox="0 0 24 24" 
                        width="24px" 
                        fill="#15803d">
                        <rect fill="none" 
                        height="24" 
                        width="24"/>
                        <path d="M22,5.18L10.59,16.6l-4.24-4.24l1.41-1.41l2.83,2.83l10-10L22,5.18z M19.79,10.22C19.92,10.79,20,11.39,20,12 c0,4.42-3.58,8-8,8s-8-3.58-8-8c0-4.42,3.58-8,8-8c1.58,0,3.04,0.46,4.28,1.25l1.44-1.44C16.1,2.67,14.13,2,12,2C6.48,2,2,6.48,2,12 c0,5.52,4.48,10,10,10s10-4.48,10-10c0-1.19-0.22-2.33-0.6-3.39L19.79,10.22z"/></svg>
                    </button>
                    </div>
                      )
                    }
                  </div>
                </td>
              </tr>
                ))
            ): (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No user available
                </td>
              </tr>
            )}
            </tbody>
          </table>
          <div className=" flex justify-center mt-4 mb-">
            <Pagination count={data?.totalPage} page={page} onChange={handleChange} />
          </div>
        </div>
      </div>
      <UsersStatusModal openStatus={openStatus} handleCloseStatus={handleCloseStatus}
        userId={userId}
      />
      <DeleteUserModal 
        openDelete={openDelete} 
        handleDeleteClose={handleDeleteClose} 
        // shop={shop}
        userId={userId}
        // propertyType="shop" 
        url={`${url}`} />
    </div>
  )
}

export default AdminUsers
