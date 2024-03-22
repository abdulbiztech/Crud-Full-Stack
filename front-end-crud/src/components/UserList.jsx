import React from "react";
import axios from "axios";

const UserList = ({ users, handleUpdate, handleDelete }) => {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold my-4">User List</h1>
      <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="py-2 px-4 text-center">Name</th>
            <th className="py-2 px-4 text-center">Email</th>
            <th className="py-2 px-4 text-center">Date of Birth</th>
            <th className="py-2 px-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.userId}
              className="hover:bg-gray-100 border-b border-gray-200"
            >
              <td className="py-2 text-center px-4">{user.name}</td>
              <td className="py-2 text-center px-4">{user.email}</td>
              <td className="py-2 text-center px-4">{user.dob}</td>
              <td className="py-2 text-center px-4">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                  onClick={() => handleUpdate(user.userId)}
                >
                  Update
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                  onClick={() => handleDelete(user.userId)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
