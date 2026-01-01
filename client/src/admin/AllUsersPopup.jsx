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
    await axios.delete(`http://localhost:5000/api/user/delete/${selected._id}`);
    alert("User Deleted");
    setSelected(null);
    fetchUsers();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50">

      <div className="bg-white w-[950px] h-[600px] rounded-3xl shadow-2xl overflow-hidden animate-fadeIn">

        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white py-4 text-center text-xl font-bold">
          Registered Users
        </div>

        {/* Table */}
        <div className="overflow-auto h-[420px] p-6">
          <table className="w-full text-sm border-collapse">
            <thead className="sticky top-0 bg-red-50 text-red-700">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Address</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u) => (
                <tr
                  key={u._id}
                  onClick={() => setSelected(u)}
                  className={`cursor-pointer transition 
                    ${selected?._id === u._id
                      ? "bg-red-100"
                      : "hover:bg-red-50"}`}
                >
                  <td className="p-3">{u.name}</td>
                  <td className="p-3">{u.email}</td>
                  <td className="p-3">{u.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Delete Panel */}
        {selected && (
          <div className="mx-6 mb-4 p-4 rounded-xl bg-red-50 border border-red-200 flex items-center justify-between">
            <span className="text-red-700 font-semibold">
              Delete user <b>{selected.name}</b>?
            </span>
            <button
              onClick={deleteUser}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-xl"
            >
              Delete User
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="p-4 text-center border-t">
          <button
            onClick={onClose}
            className="bg-gradient-to-r from-red-600 to-orange-500 text-white px-8 py-2 rounded-xl hover:scale-[1.05] transition"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
