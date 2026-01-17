"use client";

import { useEffect, useState } from "react";

export default function StoreOpeningRequests() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch pending stores
  const fetchStores = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:8000/admin/openingreq", {
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Failed to fetch stores");
        return;
      }
      setStores(data.data);
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  // Accept / Reject store
  const handleAction = async (storeId, action) => {
    try {
      const res = await fetch(
        `http://localhost:8000/store/${action}/${storeId}`,
        { method: "PATCH", credentials: "include" }
      );
      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Action failed");
        return;
      }
      // Remove store from UI after action
      setStores((prev) => prev.filter((s) => s._id !== storeId));
    } catch (err) {
      alert("Something went wrong");
    }
  };

  if (loading)
    return (
      <div className="text-gray-700 text-center mt-10 font-medium">
        Loading requests...
      </div>
    );
  if (error)
    return (
      <div className="text-red-600 text-center mt-10 font-medium">{error}</div>
    );

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <h2 className="text-gray-900 text-3xl font-bold mb-8">
        Store Opening Requests
      </h2>

      {stores.length === 0 ? (
        <p className="text-gray-500 text-center">No pending requests</p>
      ) : (
        <div className="grid gap-6">
          {stores.map((store) => (
            <div
              key={store._id}
              className="bg-white rounded-xl shadow-md p-6 flex justify-between items-start transition-transform hover:scale-[1.01]"
            >
              {/* LEFT SIDE: Logo + Info */}
              <div className="flex gap-4">
                {/* Store Logo */}
                <img
                  src={store.logo || "/default-store.png"}
                  alt={store.storeName}
                  className="w-16 h-16 rounded-lg object-cover border border-gray-200"
                />

                <div>
                  <h3 className="text-gray-900 text-xl font-semibold">
                    {store.storeName}
                  </h3>

                  {/* Owner */}
                  <p className="text-gray-600 text-sm mt-1">
                    Owner:{" "}
                    <span className="text-gray-900 font-medium">
                      {store.owner?.username || "Unknown"}
                    </span>
                  </p>

                  {/* Products */}
                  <p className="text-gray-500 text-sm mt-2">
                    <span className="font-medium text-gray-700">Products:</span>{" "}
                    {store.storeProducts.join(", ")}
                  </p>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleAction(store._id, "accept")}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-md transition-colors"
                >
                  Accept
                </button>

                <button
                  onClick={() => handleAction(store._id, "reject")}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg shadow-md transition-colors"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
