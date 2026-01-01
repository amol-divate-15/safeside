import axios from "axios";
import { useEffect, useState } from "react";
import UserTrackingDetails from "./UserTrackingDetails";

export default function UserTrackingPopup({ close, email }) {

  const [list, setList] = useState(null);   // <-- null first
  const [error, setError] = useState("");

  useEffect(() => {
    if (!email) {
      setError("User email not found");
      return;
    }

    axios.get("http://localhost:5000/api/booking/track/" + email)
      .then(res => setList(res.data))
      .catch(() => setError("Tracking API Failed"));
  }, [email]);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">

      {error && (
        <div className="bg-white p-6 rounded-xl text-red-600 font-bold">{error}</div>
      )}

      {list && <UserTrackingDetails close={close} list={list} />}

    </div>
  );
}
