"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const StoreDetailsPage = () => {
    const params = useParams();
    const storeId = Array.isArray(params.storeId)
        ? params.storeId[0]
        : params.storeId;

    const router = useRouter();

    const [store, setStore] = useState(null);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {

        console.log(storeId)
        const fetchStoreDetails = async () => {
            try {
                const res = await fetch(
                    `http://localhost:8000/admin/${storeId}`,
                    {
                        credentials: "include"
                    }
                );
                const data = await res.json();

                if (data.statusCode !== 200) throw new Error(data.message);
                setStore(data.data);
            } catch (err) {
                console.error(err);
                setError(err.message || "Failed to load store details");
            } finally {
                setLoading(false);
            }
        };

        fetchStoreDetails();
    }, [storeId]);

    // Approve / Reject
    const handleAction = async (type) => {
        try {
            setActionLoading(true);
            const res = await fetch(
                `http://localhost:8000/admin/store/${storeId}/${type}`,
                {
                    method: "POST",
                }
            );
            const data = await res.json();
            if (data.statusCode !== 200) throw new Error(data.message);

            alert(`Store ${type}d successfully`);
            router.push("/admin/openingreq"); // back to list
        } catch (err) {
            console.error(err);
            alert(err.message || "Action failed");
        } finally {
            setActionLoading(false);
        }
    };

    if (loading)
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-500">
                Loading store details...
            </div>
        );

    if (error)
        return (
            <div className="min-h-screen flex items-center justify-center text-red-500">
                {error}
            </div>
        );

    if (!store)
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-500">
                Store not found
            </div>
        );

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            {/* Back Button */}
            <button
                onClick={() => router.back()}
                className="mb-6 text-sm font-medium text-indigo-600 hover:underline"
            >
                ← Back
            </button>

            {/* Store Card */}
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
                {/* Banner */}
                <div className="h-56 bg-gray-200">
                    <img
                        src={store.banner || store.logo}
                        alt={store.storeName}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Content */}
                <div className="p-6">
                    <div className="flex items-center gap-4 mb-6">
                        <img
                            src={store.owner.avatar || store.logo}
                            className="w-20 h-20 rounded-xl object-cover"
                        />
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                {store.storeName}
                            </h1>
                            <p className="text-gray-500 mt-1">
                                Owner: {store.owner.username} | Email: {store.owner.email} | Phone: {store.owner.phone}
                            </p>
                        </div>
                    </div>

                    <p className="text-gray-700 mb-6">{store.description}</p>

                    <h3 className="text-sm font-semibold uppercase text-gray-500 mb-2">
                        Products
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-6">
                        {store.storeProducts.map((product, index) => (
                            <span
                                key={index}
                                className="px-3 py-1 text-xs rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100"
                            >
                                {product}
                            </span>
                        ))}
                    </div>

                    <h3 className="text-sm font-semibold uppercase text-gray-500 mb-2">
                        Address
                    </h3>
                    <p className="text-gray-700 mb-6">
                        {store.address.street}, {store.address.city}, {store.address.state}, {store.address.postalCode}, {store.address.country}
                    </p>

                    {/* Actions */}
                    <div className="flex gap-4">
                        <button
                            onClick={() => handleAction("approve")}
                            disabled={actionLoading}
                            className="flex-1 py-3 rounded-xl bg-green-600 text-white font-medium hover:bg-green-700 transition"
                        >
                            Approve
                        </button>

                        <button
                            onClick={() => handleAction("reject")}
                            disabled={actionLoading}
                            className="flex-1 py-3 rounded-xl bg-red-600 text-white font-medium hover:bg-red-700 transition"
                        >
                            Reject
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StoreDetailsPage;
