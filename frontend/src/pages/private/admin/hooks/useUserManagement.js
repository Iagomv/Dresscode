import { useState, useEffect } from "react";
import ApiConfig from "../../../../api/ApiConfig";
import { toast } from 'react-toastify'
import { useTranslation } from "react-i18next";

/**
 * Custom hook to manage user-related data and operations.
 *
 * Fetches user data from the API and provides state management
 * for loading and error handling. The hook also provides methods
 * to create a new user and to refetch the user list.
 *
 * @returns {UseUserManagementResult} The state and functions to manage users.
 */
export const useUserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const { t } = useTranslation("common");
  /**
   * Fetches the list of users from the API.
   *
   * Sets the loading state, calls the API to fetch users,
   * updates the users state, and handles errors.
  */
 const fetchUsers = async () => {
   try {
     setLoading(true);
     const response = await ApiConfig.getAllUsers();
     setUsers(response);
    } catch (err) {
      setError(err);
      toast.error(t("error.fetch"));
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  /**
   * Creates a new user and updates the users state.
   *
   * @param {Object} userData - The data for the new user.
   * @returns {Promise<void>} A promise that resolves when the user is created.
   */
  const createUser = async (userData) => {
    try {
      setLoading(true);
      const response = await ApiConfig.adminUserCreation(userData);
      setUsers((prevUsers) => [...prevUsers, response]);
      toast.success(t("user.created"));
    } catch (err) {
      console.log(err);
      setError(err);
      toast.error(t("error.user"));
    } finally {
      setLoading(false);
    }
  };

  
  const toggleStatus = async (id) => {
    try {
      setLoading(true);
      await ApiConfig.toggleUserStatus(id);
      setUsers((prevUsers) => prevUsers.map((user) => user.id === id ? { ...user, active: !user.active } : user));
      toast.success(t("user.updated"));
    } catch (err) {
      console.log(err);
      setError(err);
      toast.error(t("error.user"));
    } finally {
      setLoading(false);
    }
  }
// Phase 1: Request deletion — open the modal
  const requestDelete = (id) => {
    setUserIdToDelete(id);
    setShowConfirmModal(true);
  };

  // Phase 2: Confirm deletion — call API and update state
  const confirmDelete = async () => {
    if (!userIdToDelete) return;
    try {
      setLoading(true);
      await ApiConfig.deleteUser(userIdToDelete);
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.id !== userIdToDelete)
      );
      toast.success(t("user.deleted"));
    } catch (err) {
      console.error(err);
      setError(err);
      toast.error(t("error.user"));
    } finally {
      setLoading(false);
      setShowConfirmModal(false);
      setUserIdToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowConfirmModal(false);
    setUserIdToDelete(null);
  };
  
  return {
    users,
    loading,
    error,
    createUser,
    requestDelete,
    confirmDelete,
    cancelDelete,
    showConfirmModal,
    toggleStatus,
    refetch: fetchUsers,
  };
};
