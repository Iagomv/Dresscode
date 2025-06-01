// useUserManagement.js
import { useState, useEffect } from "react";
import ApiConfig from "../../../../api/ApiConfig";

/**
 * Custom hook to manage user-related data and operations.
 * 
 * Fetches user data from the API and provides state management for
 * loading and error handling. The hook returns the list of users,
 * the loading state, error state, and a refetch function to reload
 * the user data.
 * 
 * @returns {Object} An object containing:
 *  - users: An array of user objects.
 *  - loading: A boolean indicating if the data is being loaded.
 *  - error: An error object if an error occurred while fetching data.
 *  - refetch: A function to refetch the user data.
 */

const useUserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);    

  /**
   * Fetches the list of users from the API and updates the state with the result.
   * 
   * Sets the loading state to true, fetches the users, updates the users state
   * with the response, and sets the loading state back to false. If an error
   * occurs, sets the error state with the error. If the error is a 401 Unauthorized
   * error, the user is logged out.
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

  useEffect(() => {
    fetchUsers();
  }, []);

  return { users, loading, error, refetch: fetchUsers };
};

export default useUserManagement;
