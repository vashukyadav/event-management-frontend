import { useEffect } from "react";
import api from "../../api/axois.js";

function UserDashboard() {

  useEffect(() => {
    console.log("API CALL TRIGGERED");

    api.get("/user/profile")
      .then((res) => {
        console.log("Vendor profile:", res.data);
      })
      .catch((err) => {
        console.error(err);
      });

  }, []);

  return (
    <div>
      <h1>User Dashboard</h1>
    </div>
  );
}

export default UserDashboard;
