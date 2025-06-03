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

  const deleteUser = async (id) => {
    try {
      setLoading(true);
      await ApiConfig.deleteUser(id);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      toast.success(t("user.deleted"));
    } catch (err) {
      console.log(err);
      setError(err);
      toast.error(t("error.user"));
    } finally {
      setLoading(false);
    }
  }
  
  useEffect(() => {
    fetchUsers();
  }, []);

  return { users, loading, error, createUser, deleteUser,  refetch: fetchUsers };
};
