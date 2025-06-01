import { useState, useEffect } from "react";
import ApiConfig from "../../../../api/ApiConfig";

/**
 * @typedef {Object} UseUserManagementResult
 * @property {Array<Object>} users - The list of users.
 * @property {boolean} loading - Whether data is currently being fetched.
 * @property {Error|null} error - Any error encountered during fetching or creating users.
 * @property {(userData: Object) => Promise<void>} createUser - Creates a new user.
 * @property {() => Promise<void>} refetch - Refetches the user data.
 */

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
      console.error("Error fetching users:", err);
      setError(err);
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
      const response = await ApiConfig.createUser(userData);
      setUsers((prevUsers) => [...prevUsers, response]);
    } catch (err) {
      console.error("Error creating user:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return { users, loading, error, createUser, refetch: fetchUsers };
};
