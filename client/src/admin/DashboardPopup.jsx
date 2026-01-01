import React, { useState } from "react";
import RegisterModal from "../component/RegisterModal";
import AllUsersPopup from "./AllUsersPopup";

export default function DashboardPopup({ isOpen, onClose }) {
  const [openRegister, setOpenRegister] = useState(false);
  const [openAllUsers, setOpenAllUsers] = useState(false);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-40">

        <div className="bg-white w-[420px] rounded-3xl shadow-2xl overflow-hidden animate-fadeIn">

          {/* Header */}
          <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white text-center py-5 text-xl font-bold">
            User Management Panel
          </div>

          {/* Body */}
          <div className="p-8 flex flex-col gap-5 text-red-700 font-semibold">

            <button 
              onClick={() => setOpenRegister(true)}
              className="flex items-center justify-between bg-red-50 hover:bg-red-100 p-4 rounded-xl transition"
            >
              <span>➕ Add New User</span>
              <span>→</span>
            </button>

            <button 
              onClick={() => setOpenAllUsers(true)}
              className="flex items-center justify-between bg-red-50 hover:bg-red-100 p-4 rounded-xl transition"
            >
              <span>👥 View All Users</span>
              <span>→</span>
            </button>

          </div>

          {/* Footer */}
          <div className="p-6 border-t text-center">
            <button
              onClick={onClose}
              className="bg-gradient-to-r from-red-600 to-orange-500 text-white px-8 py-2 rounded-xl hover:scale-[1.05] transition"
            >
              Close Panel
            </button>
          </div>
        </div>
      </div>

      {/* Register Popup */}
      <RegisterModal 
        isOpen={openRegister}
        onClose={() => setOpenRegister(false)}
        openLogin={() => {}}
      />

      {/* All Users */}
      <AllUsersPopup 
        isOpen={openAllUsers}
        onClose={() => setOpenAllUsers(false)} 
      />
    </>
  );
}
