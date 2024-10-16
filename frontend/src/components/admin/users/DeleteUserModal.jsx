import useDelete from "../../../hooks/useDelete";
import useAuth from "../../../hooks/useAuth";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { Modal } from "@mui/material";
import {CircularProgress} from "@mui/material";
import { useNavigate } from "react-router-dom";

const DeleteUserModal = ({ openDelete, handleDeleteClose, userId, url}) => {
  const { auth } = useAuth();
  const deleteUser = useDelete();
  const queryClient = useQueryClient()
  const navigate = useNavigate();

  const handleDeleteUser = async () => {
    if (!auth || !auth.accessToken) {
      toast.error("You are not authorized to perform this action");
      navigate("/login");
      return;
    }

    try {
      const response = await deleteUser(`${url}/${userId}`, auth.accessToken);
      if (response.status === 200 ) {
        toast.success("User deleted successfully");
        queryClient.invalidateQueries("users");
        setTimeout(() => {
          handleDeleteClose();
        }, 1000);

      } else {
        toast.error("Failed to delete user");
      }
      console.log(response);
      
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };
  // console.log(userId);
  return (
    <Modal 
    open={openDelete}
    onClose={handleDeleteClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
   >
    <div>
      <div
        id="deleteModal"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 w-full max-w-md bg-white rounded-lg shadow-lg"
      >
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Confirm Delete user
          </h3>
          <p className="text-gray-700 mb-6">
            Are you sure you want to delete this user? This action cannot be undone.
          </p>
            <div className="flex justify-center gap-4">
              <button
                className=" bg-red-600 px-2 rounded-lg text-white"
                onClick={handleDeleteUser}
              >
                Delete
              </button>
              <button
                className=" bg-gray-300 px-2 rounded-lg text-gray-800"
                onClick={handleDeleteClose}
              >
                Cancel
              </button>
            </div>
        </div>
      </div>
    </div>
  </Modal>
  )
}

export default DeleteUserModal
