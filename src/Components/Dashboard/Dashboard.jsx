import React, { useState } from "react";
import UserTable from "./../UserTable/UserTable";
import EditUserModal from "./../Modal/EditUserModal";
import EditRoleModal from "./../Modal/EditRoleModal";
import Header from "./../Header/Header";

import './Dashboard.css'
import UserModal from "./../Modal/UserModal";
const Dashboard = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "Shashank Kumar", email: "shashank@gmail.com", role: "Admin", status: "Active" },
    { id: 2, name: "Ravi Maurya", email: "ravi233@gmail.com", role: "Editor", status: "Inactive" },
    { id: 3, name: "Shreya Raj", email: "shreya43@gmail.com", role: "Viewer", status: "Inactive" },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [isEditRoleModalOpen, setIsEditRoleModalOpen] = useState(false);

  const roles = ["Admin", "Editor", "Viewer"]; 

  const handleEditUser = (userId) => {
    const user = users.find((u) => u.id === userId);
    setSelectedUser(user);
    setIsEditUserModalOpen(true);
  };

  const handleEditRole = (userId) => {
    const user = users.find((u) => u.id === userId);
    setSelectedUser(user);
    setIsEditRoleModalOpen(true);
  };

  const handleSaveUser = (updatedUser) => {
    if (updatedUser.id) {
  
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        )
      );
    } else {
  
      setUsers((prevUsers) => [
        ...prevUsers,
        { ...updatedUser, id: prevUsers.length + 1 }, 
      ]);
    }
  };
  const handleToggleStatus = (userId) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId
          ? { ...user, status: user.status === "Active" ? "Inactive" : "Active" }
          : user
      )
    );
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((user) => user.id !== userId));
    }
  };
  const handleAddUser = () => {
    setSelectedUser(null); 
    setIsModalOpen(true);
  };
  return (
    <div className="dashboard-container">
     <Header handleAddUser={handleAddUser} />
      <UserTable
        users={users}
        onEditUser={handleEditUser}
        onEditRole={handleEditRole}
        onToggleStatus={handleToggleStatus}
        onDeleteUser={handleDeleteUser}
      />
      {isEditUserModalOpen && (
        <EditUserModal
          user={selectedUser}
          onClose={() => setIsEditUserModalOpen(false)}
          onSave={handleSaveUser}
        />
      )}
      {isEditRoleModalOpen && (
        <EditRoleModal
          user={selectedUser}
          roles={roles}
          onClose={() => setIsEditRoleModalOpen(false)}
          onSave={handleSaveUser}
        />
      )}
      {isModalOpen && (
        <UserModal
          user={selectedUser}
          roles={roles}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveUser}
        />
      )}
    </div>
  );
};

export default Dashboard;
