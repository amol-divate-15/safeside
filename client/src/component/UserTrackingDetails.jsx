export default function UserTrackingDetails({ close, list }) {
  return (
    <div className="
      bg-white/90 backdrop-blur-xl
      w-[900px] h-[80vh]
      rounded-3xl shadow-2xl
      flex flex-col overflow-hidden
    ">

      {/* ================= HEADER ================= */}
      <div className="
        flex justify-between items-center
        px-8 py-5
        bg-gradient-to-r from-blue-600 to-indigo-600
        text-white
      ">
        <h2 className="text-2xl font-extrabold tracking-wide">
          My Cylinder Tracking
        </h2>

        <button
          onClick={close}
          className="text-2xl font-bold hover:scale-110 transition"
        >
          ✕
        </button>
      </div>

      {/* ================= BODY ================= */}
      <div className="flex-1 overflow-y-auto p-8 space-y-6">

        {list?.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <span className="text-5xl mb-4">📦</span>
            <p className="text-lg font-semibold">No bookings found</p>
          </div>
        )}

        {list?.map(o => (
          <div
            key={o._id}
            className="
              bg-white rounded-2xl
              p-6 shadow-md
              border border-gray-100
              hover:shadow-xl transition
            "
          >
            <div className="grid md:grid-cols-2 gap-4 text-gray-700">

              <Info label="Cylinder ID" value={o.cylinder?.cylinderId} />
              <Info label="Gas Type" value={o.cylinder?.gasType} />
              <Info label="Status" value={o.status} />

              <Info
                label="Driver"
                value={o.driver?.name || "Not Assigned"}
              />
              <Info
                label="Driver Phone"
                value={o.driver?.phone || "-"}
              />
              <Info
                label="Vehicle No"
                value={o.driver?.vehicleNumber || "-"}
              />

              <div className="md:col-span-2">
                <Info label="Delivery Address" value={o.address} />
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* ================= FOOTER ================= */}
      <div className="p-5 border-t bg-gray-50 text-center">
        <button
          onClick={close}
          className="
            px-12 py-3
            rounded-xl font-bold text-white
            bg-gradient-to-r from-blue-600 to-indigo-600
            hover:scale-105 transition
          "
        >
          Close
        </button>
      </div>

    </div>
  );
}

/* ================= SMALL UI COMPONENT ================= */
function Info({ label, value }) {
  return (
    <p className="text-sm md:text-base">
      <span className="font-bold text-gray-900">{label}:</span>{" "}
      <span className="text-gray-700">{value || "-"}</span>
    </p>
  );
}
