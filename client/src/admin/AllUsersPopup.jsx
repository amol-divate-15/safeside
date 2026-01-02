import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AllUsersPopup({ isOpen, onClose }) {
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (isOpen) fetchUsers();
  }, [isOpen]);

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:5000/api/user/all");
    setUsers(res.data);
  };

  const deleteUser = async () => {
    await axios.delete(
      `http://localhost:5000/api/user/delete/${selected._id}`
    );
    alert("User Deleted");
    setSelected(null);
    fetchUsers();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center">

      {/* Modal */}
      <div className="
        w-[95%] max-w-5xl h-[85vh]
        bg-white/90 backdrop-blur-xl
        rounded-3xl shadow-2xl
        flex flex-col overflow-hidden
        animate-fadeIn
      ">

        {/* Header */}
        <div className="
          flex justify-between items-center
          px-8 py-5
          bg-gradient-to-r from-blue-600 to-indigo-600
          text-white
        ">
          <h2 className="text-2xl font-extrabold tracking-wide">
            Registered Users
          </h2>

          <button
            onClick={onClose}
            className="text-2xl font-bold hover:scale-110 transition"
          >
            ✕
          </button>
        </div>

        {/* Table Section */}
        <div className="flex-1 overflow-auto p-6">
          <table className="w-full border-collapse text-sm md:text-base">

            <thead className="sticky top-0 bg-blue-50 z-10">
              <tr className="text-blue-700 font-bold">
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Address</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u) => (
                <tr
                  key={u._id}
                  onClick={() => setSelected(u)}
                  className={`
                    cursor-pointer transition-all
                    ${selected?._id === u._id
                      ? "bg-blue-100"
                      : "hover:bg-blue-50"}
                  `}
                >
                  <td className="p-4 font-semibold text-gray-800">
                    {u.name}
                  </td>
                  <td className="p-4 text-gray-600">
                    {u.email}
                  </td>
                  <td className="p-4 text-gray-600">
                    {u.address}
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

        {/* Delete Confirmation */}
        {selected && (
          <div className="
            mx-6 mb-4 p-5
            rounded-2xl
            bg-red-50 border border-red-200
            flex flex-col md:flex-row
            items-center justify-between gap-4
          ">
            <span className="text-red-700 text-lg font-bold">
              Delete user <span className="underline">{selected.name}</span>?
            </span>

            <button
              onClick={deleteUser}
              className="
                px-8 py-3
                bg-red-600 text-white
                font-bold rounded-xl
                hover:bg-red-700
                hover:scale-105
                transition
              "
            >
              Delete User
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="p-5 border-t text-center bg-gray-50">
          <button
            onClick={onClose}
            className="
              px-10 py-3
              rounded-xl
              font-bold text-white
              bg-gradient-to-r from-gray-700 to-gray-900
              hover:scale-105 transition
            "
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
