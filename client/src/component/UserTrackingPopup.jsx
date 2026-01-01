import axios from "axios";
import { useEffect, useState } from "react";
import TrackingPopup from "../admin/AdminOrdersPopup"

export default function UserTrackingPopup({ close }) {

  const user = JSON.parse(localStorage.getItem("loggedUser"));
  const [list, setList] = useState([]);

  useEffect(() => {
    if (user?.customerId) {
      axios.get("http://localhost:5000/api/booking/track/" + user.customerId)
        .then(res => setList(res.data));
    }
  }, []);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
      <TrackingPopup close={close} list={list}/>
    </div>
  );
}

