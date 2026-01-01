export default function UserTrackingDetails({ close, list }) {
  return (
    <div className="bg-white w-[900px] h-[80vh] rounded-3xl shadow-2xl overflow-y-auto">

      <div className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white text-xl font-bold p-4 text-center">
        My Cylinder Tracking
      </div>

      <div className="p-6 space-y-4">
       {list?.length === 0 && (
  <p className="text-center text-gray-500 mt-10">No bookings found</p>
)}

{list?.map(o => (

          <div key={o._id} className="border rounded-xl p-4 shadow bg-slate-50">
            <p><b>Cylinder ID:</b> {o.cylinder?.cylinderId}</p>
<p><b>Gas Type:</b> {o.cylinder?.gasType}</p>
<p><b>Status:</b> {o.status}</p>
<p><b>Driver:</b> {o.driver?.name || "Not Assigned"}</p>
<p><b>Driver Phone:</b> {o.driver?.phone || "-"}</p>
<p><b>Vehicle No:</b> {o.driver?.vehicleNumber || "-"}</p>
<p><b>Delivery Address:</b> {o.address}</p>

          </div>
        ))}
      </div>

      <div className="text-center p-4 border-t">
        <button onClick={close} className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-2 rounded-xl">
          Close
        </button>
      </div>

    </div>
  );
}
