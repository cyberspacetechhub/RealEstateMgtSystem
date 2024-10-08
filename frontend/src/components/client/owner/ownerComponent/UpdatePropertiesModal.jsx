import React, { useState, useEffect } from 'react';
import useAuth from "../../../../hooks/useAuth";
import baseURL from '../../../../shared/baseURL';
import Modal from '@mui/material/Modal';
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { useQueryClient, useMutation } from "react-query";
import { useNavigate } from 'react-router-dom';
import useFetch from "../../../../hooks/useFetch"; 
import useUpdate from "../../../../hooks/useUpdate" // Custom hook for fetching data
import { CircularProgress } from '@mui/material';

const UpdatePropertiesModal = ({property, openUpdate, handleCloseUpdate}) => {
  const queryClient = useQueryClient();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const fetch = useFetch();
  const update = useUpdate();
  const [isLoading, setIsLoading] = useState(false);
  const url = `${baseURL}property`;

  const [selectedProperty, setSelectedProperty] = useState(null)
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ mode: "all" });

  // Set the form fields with the fetched data
  useEffect(() => {
    if (property) {
      Object.entries(property).forEach(([key, value]) => {
        setValue(key, value);
      });
      setSelectedProperty(property.type);
    }
  }, [property, setValue]);

  const handleFileUpload = (e) => {
    if (e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const updateProperty = async (data) => {
    if (!auth || !auth?.accessToken) {
      navigate('/login');
      return;
    }
    const formData = new FormData();

   // Append form fields
   for (const key in data) {
    if (data[key]) {
      formData.append(key, data[key]);
    }
  }
    //console.log(data)

    try {
      const response = await update(url, data, auth?.accessToken);
      console.log(response);
      setTimeout(() => {
        handleCloseUpdate();
      }, 3000);
      toast.success('Property updated successfully');
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    }
  };

  const { mutate } = useMutation(updateProperty, {
    onSuccess: () => {
      queryClient.invalidateQueries('properties');
    }
  });

  const handlePropertyUpdate = (data) => {
    mutate(data);
    
  };

  if (isLoading) {
    return <p>{CircularProgress}</p>;
  }
  return (
    <Modal
      open={openUpdate}
      onClose={() => {handleUpdateClose()}}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {/* <!-- Main modal --> */}
      { property ? (
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
                Update
              </h3>
              <button
                type="button"
                onClick={() => {handleCloseUpdate()}}
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
              onSubmit={handleSubmit(handlePropertyUpdate)} 
              method='post'
              encType='multipart/form-data'
            >
              <div className="grid gap-4 mb-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    {...register("title", { required: true })}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
                    placeholder="Type House name"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="framework"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Description
                  </label>
                  <textarea
                    rows='4'
                    type="text"
                    name="description"
                    id="description"
                    {...register("description", { required: true })}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
                    placeholder="Enter the Description"
                    required=""
                    >
                  </textarea>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Price
                  </label>
                  <input
                    id="price"
                    // rows="4"
                    type='text'
                    {...register("price", { required: true })}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
                    placeholder="Enter Price here"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Location
                  </label>
                  <input
                    id="location"
                    name='location'
                    type='text'
                    {...register("location", { required: true })}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
                    placeholder="Enter Location here"
                  />
                </div>
                <div className="sm:col-span-2">
                  <input 
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 " 
                    value={auth?.user?._id}
                    {...register("owner")}
                    type="hidden" 
                  />
                </div>

                {
                  selectedProperty === 'House' && (
                    <div className='gap-4 mb-4 grid sm:grid-cols-2'>
                      <div className="sm:col-span-2">
                        <label
                          htmlFor="bedrooms"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Bedrooms
                        </label>
                        <input
                          id="bedrooms"
                          name='bedrooms'
                          type='text'
                          {...register("bedrooms", { required: true })}
                          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
                          placeholder="Enter Number of bedrooms"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label
                          htmlFor="bathroom"
                          className="block mb-2 text-sm font-medium text-gray-900 "
                        >
                          Bathrooms
                        </label>
                        <input
                          id="bathrooms"
                          name='bathrooms'
                          type='text'
                          {...register("bathrooms", { required: true })}
                          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
                          placeholder="Enter Number of bathrooms here"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label
                          htmlFor="squareFootage"
                          className="block mb-2 text-sm font-medium text-gray-900 "
                        >
                          squareFootage:
                        </label>
                        <input
                          id="squareFootage"
                          name='squareFootage'
                          type='text'
                          {...register("squareFootage", { required: true })}
                          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
                          placeholder="Enter squareFootage here"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label
                          htmlFor="yearBuilt"
                          className="block mb-2 text-sm font-medium text-gray-900 "
                        >
                          yearBuilt:
                        </label>
                        <input
                          id="yearBuilt"
                          name='yearBuilt'
                          type='text'
                          {...register("yearBuilt", { required: true })}
                          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
                          placeholder="Enter yearBuilt here"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label
                          htmlFor="lotSize"
                          className="block mb-2 text-sm font-medium text-gray-900 "
                        >
                          lotSize:
                        </label>
                        <input
                          id="lotSize"
                          name='lotSize'
                          type='text'
                          {...register("lotSize", { required: true })}
                          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
                          placeholder="Enter lotSize here"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label
                          htmlFor="stories"
                          className="block mb-2 text-sm font-medium text-gray-900 "
                        >
                          Stories:
                        </label>
                        <input
                          id="stories"
                          name='stories'
                          type='text'
                          {...register("stories", { required: true })}
                          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
                          placeholder="Enter stories here"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label
                          htmlFor="docType"
                          className="block mb-2 text-sm font-medium text-gray-900 "
                        >
                          docType:
                        </label>
                        <input
                          id="docType"
                          name='docType'
                          type='text'
                          {...register("docType", { required: true })}
                          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
                          placeholder="Enter docType here"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label
                          htmlFor="basement"
                          className="block mb-2 text-sm font-medium text-gray-900 "
                        >
                          Basement:
                        </label>
                        <input
                          id="basement"
                          name='basement'
                          type='text'
                          {...register("basement", { required: true })}
                          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
                          placeholder="Enter basement here"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label
                          htmlFor="amenities"
                          className="block mb-2 text-sm font-medium text-gray-900 "
                        >
                          Amenities:
                        </label>
                        <input
                          id="amenities"
                          name='amenities'
                          type='text'
                          {...register("amenities", { required: true })}
                          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
                          placeholder="Enter amenities here"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label
                          htmlFor="exteriorFeatures"
                          className="block mb-2 text-sm font-medium text-gray-900 "
                        >
                          exteriorFeatures:
                        </label>
                        <input
                          id="exteriorFeatures"
                          name='exteriorFeatures'
                          type='text'
                          {...register("exteriorFeatures", { required: true })}
                          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
                          placeholder="Enter exteriorFeatures here"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label
                          htmlFor="interiorFeatures"
                          className="block mb-2 text-sm font-medium text-gray-900 "
                        >
                          interiorFeatures:
                        </label>
                        <input
                          id="interiorFeatures"
                          name='interiorFeatures'
                          type='text'
                          {...register("interiorFeatures", { required: true })}
                          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
                          placeholder="Enter interiorFeatures here"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label
                          htmlFor="livingRoomFeatures"
                          className="block mb-2 text-sm font-medium text-gray-900 "
                        >
                          livingRoomFeatures:
                        </label>
                        <input
                          id="livingRoomFeatures"
                          name='livingRoomFeatures'
                          type='text'
                          {...register("livingRoomFeatures", { required: true })}
                          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
                          placeholder="Enter livingRoomFeatures here"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label
                          htmlFor="kitchenFeatures"
                          className="block mb-2 text-sm font-medium text-gray-900 "
                        >
                          kitchenFeatures:
                        </label>
                        <input
                          id="kitchenFeatures"
                          name='kitchenFeatures'
                          type='text'
                          {...register("kitchenFeatures", { required: true })}
                          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
                          placeholder="Enter kitchenFeatures here"
                        />
                      </div>
                    </div>
                  )
                }
                {
                  selectedProperty === 'Apartment' && (
                    <div className='gap-4 mb-4'>
                      <div className="sm:col-span-2">
                        <label
                          htmlFor="shopType"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Bedrooms:
                        </label>
                        <input
                          id="bedrooms"
                          type="text"
                          {...register("bedrooms", { required: true })}
                          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500"
                          placeholder="Enter Number of bedrooms here"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label
                          htmlFor="bathrooms"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Bathrooms:
                        </label>
                        <input
                          id="bathrooms"
                          type="text"
                          {...register("bathrooms", { required: true })}
                          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500"
                          placeholder="Enter Number Bathroom here"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label
                          htmlFor="floorArea"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Floor Area
                        </label>
                        <input
                          id="floorArea"
                          type="text"
                          {...register("floorArea", { required: true })}
                          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500"
                          placeholder="Enter Lease Duration here"
                        />
                      </div>
                    </div>
                  )
                }

                {
                  selectedProperty === 'Land' && (
                    <div className='gap-4 mb-4'>
                      <div className="sm:col-span-2">
                        <label
                          htmlFor="plots"
                          className="block mb-2 text-sm font-medium text-gray-900 "
                        >
                          Plots:
                        </label>
                        <input
                          id="plots"
                          name='plots'
                          type='text'
                          {...register("plots", { required: true })}
                          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
                          placeholder="Enter plots here"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="Document Type"
                          className="block mb-2 text-sm font-medium text-gray-900 "
                        >
                          Document Type:
                        </label>
                        <input
                          id="docType"
                          name='docType'
                          type='text'
                          {...register("docType", { required: true })}
                          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
                          placeholder="Enter docType here"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="ownershipType"
                          className="block mb-2 text-sm font-medium text-gray-900 "
                        >
                          Ownership Type
                        </label>
                        <input
                          id="ownershipType"
                          name='ownershipType'
                          type='text'
                          {...register("ownershipType", { required: true })}
                          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 "
                          placeholder="Enter ownershipType here"
                        />
                      </div>
                    </div>
                  )
                }
                {
                  selectedProperty === 'Shop' && (
                    <div className=' gap-4 mb-4'>
                      <div className="sm:col-span-2">
                        <label
                          htmlFor="shopType"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Shop Type
                        </label>
                        <input
                          id="shopType"
                          type="text"
                          {...register("shopType", { required: true })}
                          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500"
                          placeholder="Enter Shop Type here"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label
                          htmlFor="shopCategory"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Shop Category
                        </label>
                        <input
                          id="shopCategory"
                          type="text"
                          {...register("shopCategory", { required: true })}
                          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500"
                          placeholder="Enter Shop Category here"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label
                          htmlFor="leaseDuration"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Lease Duration
                        </label>
                        <input
                          id="leaseDuration"
                          type="number"
                          {...register("leaseDuration", { required: true })}
                          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500"
                          placeholder="Enter Lease Duration here"
                        />
                      </div>
                    </div>
                  )
                }
              </div>
              <button
                type="submit"
                className="text-green-50 inline-flex items-center bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </div> 
      ) : (
        <div>
          <p>Property details loading</p>
        </div>
      )}
    </Modal>
  )
}

export default UpdatePropertiesModal
