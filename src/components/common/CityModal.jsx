import { useState } from "react";
import { MapPin, Search, X } from "lucide-react";

const cities = [
  { name: "Agra" },
  { name: "Ahmedabad", trending: true },
  { name: "Ambala" },
  { name: "Amritsar" },
  { name: "Aurangabad" },
  { name: "Bangalore", trending: true },
  { name: "Delhi", trending: true },
  { name: "Jaipur" },
  { name: "Mumbai", trending: true },
  {name:"Pune"},
  {name:"Surat"},
  {name:"Chennai"},
  {name:"Kolkata"},
  {name:"Hyderabad"},
  {name:"Lucknow"},
  {name:"Kanpur"}
];

const CityModal = ({ isOpen, onClose, onSelect }) => {
  const [search, setSearch] = useState("");

  if (!isOpen) return null;

  const filteredCities = cities.filter((city) =>
    city.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white w-full max-w-md rounded-xl shadow-xl p-6 relative">

        {/* ❌ Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <X />
        </button>

        {/* Title */}
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="text-pink-500" />
          <h2 className="text-xl font-bold">Select City</h2>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>

        {/* City List */}
        <div className="max-h-64 overflow-y-auto">
          {filteredCities.map((city, index) => (
            <div
              key={index}
              onClick={() => {
                onSelect(city.name);
                onClose();
              }}
              className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-100 rounded-lg"
            >
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-pink-500" />
                <span>{city.name}</span>
              </div>

              {city.trending && (
                <span className="text-xs bg-pink-100 text-pink-600 px-2 py-1 rounded-full">
                  Trending
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CityModal;
