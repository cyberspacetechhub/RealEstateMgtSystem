import React, { useState } from 'react'
import usePost from "../../../hooks/usePost";
import useAuth from "../../../hooks/useAuth";
import baseURL from '../../../shared/baseURL';
import Modal from '@mui/material/Modal';
import { set, useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { useQueryClient, useMutation } from "react-query";
import { useNavigate } from 'react-router-dom';

const CreateOwnersModal = ({open, handleClose}) => {
  const post = usePost();
  const {auth} = useAuth();
  const navigate = useNavigate();
  const url = `${baseURL}owner`;
  const queryClient = useQueryClient();
  const { 
    register, 
    handleSubmit,
    formState: { errors },
  } = useForm();

  const createOwner = async(data) => {
    if (!auth || !auth.accessToken) {
      navigate('/login');
      return
    };
    const formData = new FormData();
    for (const key in data) {
      if (data[key]) {
        formData.append(key, data[key]);
      }
    }
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
    try {
      const response = await post(url, formData, auth.accessToken);

      console.log(response.data)
    } catch (err) {
      console.log(err);
    }
  }
  const {mutate} = useMutation(createOwner, {
    onSuccess: () => {
      queryClient.invalidateQueries("owners");
      toast.success("Owner created successfully");
     setTimeout(() => {
        handleClose();
      }, 2000);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleCreateOwner = (data) => {
   mutate(data);
    
//console.log(data);
  }
  return (
    <Modal
      open={open}
      onClose={() => {handleClose()}}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {/* <!-- Main modal --> */}
      <div
        id="defaultModal"
        className=" overflow-y-auto overflow-x-hidden absolute top-3/6   right-1/4 z-50 justify-center items-center w-2/4  h-modal md:h-full"
      >
        <ToastContainer />
        <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
          {/* <!-- Modal content --> */}
          <div className="relative p-4 bg-white rounded-lg shadow sm:p-5">
            {/* <!-- Modal header --> */}
            <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5">
              <h3 className="text-lg font-semibold text-gray-900 ">
                Create Owner
              </h3>
              <button
                type="button"
                onClick={() => {handleClose()}}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                data-modal-toggle="defaultModal"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* <!-- Modal body --> */}
            <form 
              onSubmit={handleSubmit(handleCreateOwner)} 
              method='post'
              // encType=''
            >
              <div className="grid gap-4 mb-4 sm:grid-cols-2">
                <div className=' sm:col-span-2'>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Firstname:
                  </label>
                  <input
                    type="text"
                    name="firstname"
                    id="firstname"
                    {...register("firstname", { required: true })}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
                    placeholder="Type First name"

                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="lastname"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Lastname:
                  </label>
                  <input
                    id="lastname"
                    // rows="4"
                    type='text'
                    {...register("lastname", { required: true })}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
                    placeholder="Enter Lastname here"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Email:
                  </label>
                  <input
                    id="email"
                    name='email'
                    type='email'
                    {...register("email", { required: true })}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
                    placeholder="Enter Email here"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Phone:
                  </label>
                  <input
                    id="phone"
                    name='phone'
                    type='text'
                    {...register("phone", { required: true })}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
                    placeholder="Enter Phone Number"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Password:
                  </label>
                  <input
                    id="password"
                    name='password'
                    type='password'
                    {...register("password", { required: true })}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
                    placeholder="********"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="identityNumber"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    identityNumber:
                  </label>
                  <input
                    id="identityNumber"
                    name='identityNumber'
                    type='text'
                    {...register("identityNumber", { required: true })}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
                    placeholder="Enter identityNumber here"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="identityType"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    identityType:
                  </label>
                  <input
                    id="identityType"
                    name='identityType'
                    type='text'
                    {...register("identityType", { required: true })}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
                    placeholder="Enter identityType here"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="contactAddress"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    contactAddress:
                  </label>
                  <input
                    id="contactAddress"
                    name='contactAddress'
                    type='text'
                    {...register("contactAddress", { required: true })}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
                    placeholder="Enter contactAddress here"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="text-green-50 inline-flex items-center bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                Add New Owner
              </button>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default CreateOwnersModal
