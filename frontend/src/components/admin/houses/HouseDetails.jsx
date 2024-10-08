import { useEffect, useState } from 'react';
import React from 'react';
import useFetch from '../../../hooks/useFetch';
import useAuth from '../../../hooks/useAuth';
import {ToastContainer, toast } from 'react-toastify';
import { Link, useParams } from 'react-router-dom';
import baseURL from '../../../shared/baseURL';
import DeletePropertyModal from '../property/DeletepropertyModal';
import UpdateHouseModal from './UpdateHouseModal';


const HouseDetails = () => {
  const { auth } = useAuth();
  const fetch = useFetch();
  const url = `${baseURL}house`;
  const { id } = useParams();
  const imageUrl = `${baseURL}`;
  
  //updatemodal
  const [openUpdate, setOpenUpdate] = useState(false);
  const handleUpdateOpen = () => setOpenUpdate(true);
  const handleUpdateClose = () => setOpenUpdate(false);
  

  //deletemodal
  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleDeleteClose = () => setOpenDelete(false);
  const [propertyId, setPropertyId] = useState("")

  // State for apartment details and other shops
  const [house, setHouse] = useState(null);
  const [otherHouses, setOtherHouses] = useState([]);
  
  const handleHouseDetails = async () => {
    try {
      // Fetch the specific house details
      const result = await fetch(`${url}/${id}`, auth.accessToken);
      if (result.data) {
        setHouse(result.data); 
        console.log("House details:", result.data);
  
        // Fetch other houses
        const otherHousesResult = await fetch(`${url}`, auth.accessToken);
        console.log("Other Houses result:", otherHousesResult.data);
  
        let housesArray = [];
  
        // Determine the correct format of the data
        if (Array.isArray(otherHousesResult.data)) {
          housesArray = otherHousesResult.data;
        } else if (otherHousesResult.data && otherHousesResult.data.houses) {
          housesArray = otherHousesResult.data.houses;
        } else {
          toast.error("No other houses found or data format is incorrect.");
          return;
        }
  
        // Filter out the current house
        const filteredHouses = housesArray.filter(house => house._id !== id);
  
        if (filteredHouses.length > 0) {
          setOtherHouses(filteredHouses);
          toast.success("House details fetched successfully");
        } else {
          toast.warn("No other houses available.");
        }
        
      }
    } catch (error) {
      toast.error("Error fetching other details");
      console.log("Fetch error:", error);
    }
  };
  
  
  

  // Use useEffect to trigger the data fetching on component mount or when 'id' changes
  useEffect(() => {
    handleHouseDetails();
  }, [id]);
  console.log(otherHouses);
  console.log(house);
  return (
    <div className='mt-4'>
        <ToastContainer />
      {/* Render shop details */}
      {house ? (
        <div>
          <div className=' grid grid-cols-2 gap-4'>
            <div className=' h-auto'>
              <img className=' h-full' src={`${imageUrl}${house.image}`} />
            </div>
            <div>
              <h1 className='text-xl inline-flex gap-2 items-center'>Title: <span className='text-lg font-semi-bold text-gray-800 uppercase'>{house.title}</span></h1>
              <p className=' flex flex-col justify-start gap-2'>
                <span>Description:</span>
                <span>{house.description}</span>
              </p>
              <p>Owner: {house.owner.firstname}</p>
              <p>Price: <span>{house.price}</span></p>
              <p>Location: <span>{house.location}</span></p>
              <p>Bedrooms: <span>{house.bedrooms}</span></p>
              <p>Bathrooms: <span>{house.bathrooms}</span></p>
              <p>squareFootage: <span>{house.squareFootage}</span></p>
              <p>yearBuilt: <span>{house.yearBuilt}</span></p>
              <p>lotSize: <span>{house.lotSize}</span></p>
              <p>Stories: <span>{house.stories}</span></p>
              <p>docType: <span>{house.docType}</span></p>
              <p>Basement: <span>{house.basement}</span></p>
              <p>Amenities: <span>{house.amenities}</span></p>
              <p>exteriorFeatures: <span>{house.exteriorFeatures}</span></p>
              <p>interiorFeatures: <span>{house.interiorFeatures}</span></p>
              <p>Status: <span>{house.status}</span></p>
            </div>
          </div>
          {/* Add more shop details as needed */}
          <div className=' flex justify-start items-start gap-4 my-4 '>
            <button
              onClick={() => {
                handleUpdateOpen();
                setHouse(house);
              }}
              className=' bg-gray-300 text-gray-700 bg-opacity-70 shadow-md shadow-gray-300 rounded-lg px-2'
              >
              <span>Edit House</span>
            </button>
            <button
              onClick={() => {handleOpenDelete() 
                setPropertyId(house._id)
              }} 
              className=' bg-red-600 bg-opacity-70 text-white px-2 rounded-lg shadow-md shadow-red-300'
              >
              <span>Delete House</span>
            </button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      
      {/* Render other shops */}
      <div>
        <h2>Other Houses</h2>
        {
          otherHouses.length > 0 ? (
            <div className=' grid grid-cols-3 gap-4'>
              {otherHouses.map((house) => (
                <div key={house._id} className=' border rounded-lg p-2'>
                  <Link to={`/admin/house_details/${house._id}`}>
                    <img className=' h-40 w-full' src={`${imageUrl}${house.image}`} />
                    <p>{house.title}</p>
                    <p>{house.price}</p>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p>No other house available</p>
          )
        }
      </div>
      <UpdateHouseModal open={openUpdate} handleClose={handleUpdateClose} house={house} />
      <DeletePropertyModal open={openDelete} handleClose={handleDeleteClose} propertyId={propertyId} 
      url={url}
      />
    </div>
  )
}

export default HouseDetails
