import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Button, Container } from "react-bootstrap";
import UserTable from "../../components/admin/userManagement/UsersTable";
import UserModal from "../../components/admin/userManagement/UserModal";
import { ApiConfig } from "../../api/ApiConfig";
import { useAuth } from "../../context/AuthContext";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ADMIN_USER_MANAGEMENT_TEXT } from "../../constants/textConstants";

const AdminUserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { auth } = useAuth();

  const isAdmin = useMemo(
    () => auth?.user?.authorities?.includes("ROLE_ADMIN"),
    [auth?.user?.authorities]
  );

  const fetchUsers = useCallback(async () => {
    try {
      const response = await ApiConfig.getAllUsers();
      setUsers(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAdmin) {
      fetchUsers();
    }
  }, [isAdmin, fetchUsers]);

  const handleSaveUser = async (userData) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      if (selectedUser) {
        await ApiConfig.updateUser(selectedUser.id, userData);
      } else {
        await ApiConfig.createUser(userData);
      }
      fetchUsers();
    } catch (error) {
      toast.error(error.response?.data?.message || "Operation failed");
    } finally {
      setIsSubmitting(false);
      setShowModal(false);
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await ApiConfig.deleteUser(userId);
        toast.success("User deleted successfully");
        fetchUsers();
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to delete user");
      }
    }
  };

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  if (loading) return <LoadingSpinner />;

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between mb-4">
        <h2>{ADMIN_USER_MANAGEMENT_TEXT.pageTitle}</h2>
        <Button
          variant="primary"
          onClick={() => {
            setSelectedUser(null);
            setShowModal(true);
          }}
        >
          {ADMIN_USER_MANAGEMENT_TEXT.createUser}
        </Button>
      </div>

      <UserTable
        users={users}
        onEdit={(user) => {
          setSelectedUser(user);
          setShowModal(true);
        }}
        onDelete={handleDelete}
      />

      <UserModal
        show={showModal}
        onHide={() => setShowModal(false)}
        user={selectedUser}
        onSave={handleSaveUser}
        isSubmitting={isSubmitting}
      />
    </Container>
  );
};

export default AdminUserManagementPage;
