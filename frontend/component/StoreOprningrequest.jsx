import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


const StoreRequests = () => {

  const router = useRouter()

  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStores = async () => {
      try {
        console.log("Fetching stores...");

        const res = await fetch(
          "http://localhost:8000/admin/openingreq",
          {
            credentials: "include"
          }
        );

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const json = await res.json();
        console.log("API Response:", json);

        setStores(json.data ?? []);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load store requests");
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading store requests...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  if (!stores.length) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        No pending store requests
      </div>
    );
  }

  return (

  <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 p-8">
    <h1 className="text-3xl font-bold text-gray-900 mb-8 tracking-tight">
      Pending Store Requests
    </h1>

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
      {stores.map((store) => (
        <div
          key={store.id}
          className="group bg-white/80 backdrop-blur-md rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center gap-4 p-5 border-b bg-white">
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 ring-1 ring-gray-200 group-hover:ring-indigo-300 transition">
              <img
                src={store.logo}
                alt={store.storeName}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-900">
                {store.storeName}
              </h2>
              <p className="text-sm text-gray-500">
                Owned by{" "}
                <span className="font-medium text-gray-700">
                  {store.ownerName}
                </span>
              </p>
            </div>
          </div>

          {/* Products */}
          <div className="p-5">
            <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3">
              Products
            </h3>

            <div className="flex flex-wrap gap-2">
              {store.products.map((product, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-xs rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100"
                >
                  {product}
                </span>
              ))}
            </div>
          </div>

          {/* View Details */}
          <div className="p-5 pt-0">
            <button
              onClick={() => router.push(`/admin/store/${store.id}`)}
              className="w-full py-2.5 rounded-xl text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition"
            >
              View Store Details
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>


  );
};

export default StoreRequests;
