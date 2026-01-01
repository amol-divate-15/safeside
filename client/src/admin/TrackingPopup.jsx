export default function TrackingPopup({ close, openHistory, openTimeline, openMap }) {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-[360px] rounded-3xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white text-lg font-bold text-center py-4">
          Tracking Options
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 text-center">

          <button
            onClick={openHistory}
            className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold transition"
          >
            Cylinder History
          </button>

          {/* future buttons kept commented (logic unchanged)
          <button onClick={openTimeline} className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition">
            Delivery Timeline
          </button>
          <button onClick={openMap} className="w-full py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold transition">
            Live QR Tracking
          </button>
          */}

          <button
            onClick={close}
            className="w-full py-2 rounded-xl border border-red-600 text-red-600 hover:bg-red-50 font-semibold transition"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
