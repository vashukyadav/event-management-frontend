import { useEffect, useState } from "react";
import api from "../../api/axois.js";

const UserOverview = () => {
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
    fetchUserEvents();
  }, []);

  const fetchUserData = async () => {
    const res = await api.get("/user/profile");
    setUser(res.data);
  };

  const fetchUserEvents = async () => {
    try {
      const res = await api.get("/user/events");
      setEvents(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin h-10 w-10 border-b-2 border-pink-600 rounded-full"></div>
      </div>
    );
  }

  return (
    <>
      {/* WELCOME */}
      <h2 className="text-2xl font-bold mb-6">
        Welcome back, {user?.name}
      </h2>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Stat title="Events Attended" value={events.filter(e => e.status === "attended").length} />
        <Stat title="Upcoming Events" value={events.filter(e => e.status === "upcoming").length} />
        <Stat title="Favorite Events" value={events.filter(e => e.isFavorite).length} />
      </div>

      {/* RECENT EVENTS */}
      <div className="bg-white border rounded-lg">
        <div className="px-6 py-4 border-b font-semibold">
          Recent Events
        </div>

        <div className="p-6 space-y-4">
          {events.length > 0 ? (
            events.slice(0, 5).map((event, i) => (
              <div
                key={i}
                className="flex justify-between items-center border p-4 rounded-lg"
              >
                <div>
                  <p className="font-medium">
                    {event.title || "Event"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {event.date || "TBD"} • {event.location || "TBD"}
                  </p>
                </div>

                <span className="text-sm px-3 py-1 rounded-full bg-gray-100">
                  {event.status || "registered"}
                </span>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">
              No events yet
            </p>
          )}
        </div>
      </div>
    </>
  );
};

const Stat = ({ title, value }) => (
  <div className="bg-white border rounded-lg p-6">
    <p className="text-sm text-gray-500">{title}</p>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

export default UserOverview;
