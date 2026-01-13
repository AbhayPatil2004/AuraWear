"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {

    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProfile() {
            try {
                const res = await fetch("http://localhost:8000/user/", {
                    method: "GET",
                    credentials: "include",
                });

                const data = await res.json();

                if (res.status === 401 || data?.message?.includes("Unauthorized")) {
                    router.push("/auth/signup");
                    return;
                }

                setUser(data.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        fetchProfile();
    }, [router]);

    async function handleLogout() {
        try {
            await fetch("http://localhost:8000/user/logout", {
                method: "POST",
                credentials: "include",
            });

            router.push("/auth/signup");
        } catch (error) {
            console.error("Logout error:", error);
        }
    }


    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <p className="text-gray-600 text-lg">Loading profile...</p>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center px-4 py-10">
            <div className=" relative w-full max-w-4xl bg-white rounded-2xl shadow-lg overflow-hidden">

                {/* LOGOUT BUTTON */}
                <button
                    onClick={handleLogout}
                    className="cursor-pointer absolute top-6 right-6 px-4 py-2 text-sm font-medium
                 text-red-600 border border-red-600 rounded-lg
                 hover:bg-red-600 hover:text-white transition"
                >
                    Logout
                </button>

                {/* HEADER */}
                <div className="bg-gradient-to-r from-black to-gray-800 px-8 py-10 text-center">
                    <div className="flex justify-center">
                        <img
                            src={user.avatar || "/vercel.svg"}
                            alt="avatar"
                            className="w-28 h-28 rounded-full border-4 border-white object-cover bg-white"
                        />
                    </div>

                    <h1 className="mt-4 text-2xl font-bold text-white">
                        {user.username}
                    </h1>
                    <p className="text-gray-300 text-sm">
                        {user.email}
                    </p>
                </div>

                {/* BODY */}
                <div className="p-8 space-y-10">

                    {/* ACCOUNT INFO */}
                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">
                            Account Information
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-800">
                            <div className="bg-gray-50 p-4 rounded-lg border">
                                <p className="text-sm text-gray-500">Role</p>
                                <p className="font-medium capitalize">{user.role}</p>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg border">
                                <p className="text-sm text-gray-500">Phone</p>
                                <p className="font-medium">
                                    {user.phone || "Not added"}
                                </p>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg border">
                                <p className="text-sm text-gray-500">Email Verified</p>
                                <p
                                    className={`font-medium ${user.isEmailVerified
                                            ? "text-green-600"
                                            : "text-red-600"
                                        }`}
                                >
                                    {user.isEmailVerified ? "Verified" : "Not Verified"}
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ADDRESSES */}
                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">
                            Saved Addresses
                        </h2>

                        {user.addresses?.length === 0 && (
                            <div className="bg-gray-50 border rounded-lg p-6 text-gray-600">
                                No addresses added yet
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {user.addresses?.map((addr, index) => (
                                <div
                                    key={index}
                                    className="border rounded-xl p-5 bg-white shadow-sm"
                                >
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="font-semibold text-gray-800">
                                            {addr.label}
                                        </h3>
                                        {addr.isDefault && (
                                            <span className="text-xs bg-black text-white px-3 py-1 rounded-full">
                                                Default
                                            </span>
                                        )}
                                    </div>

                                    <p className="text-sm text-gray-700">{addr.fullName}</p>
                                    <p className="text-sm text-gray-700">
                                        {addr.street}, {addr.city}
                                    </p>
                                    <p className="text-sm text-gray-700">
                                        {addr.state} - {addr.postalCode}
                                    </p>
                                    <p className="text-sm text-gray-700">{addr.country}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>


    );
}
