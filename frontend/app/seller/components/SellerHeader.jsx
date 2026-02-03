"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SellerHeader() {
    const [user, setUser] = useState({
        username: "Seller",
        email: "",
    });

    const router = useRouter()

    useEffect(() => {
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                const userValue = parsedUser.value || {};

                setUser({
                    username: userValue.username || "Seller",
                    email: userValue.email || "",
                });
            } catch (err) {
                console.error("Error parsing user:", err);
            }
        }
    }, []);

    // Greeting based on time
    const now = new Date();
    const hour = now.getHours();

    let greeting = "Good Morning";
    if (hour >= 12 && hour < 17) greeting = "Good Afternoon";
    else if (hour >= 17) greeting = "Good Evening";

    const formattedDate = now.toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "short",
        year: "numeric",
    });

    return (
        <div className="mt-20 sm:mt-6 mb-8 px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl border bg-white p-6 shadow-sm">
                {/* Top row */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    {/* Left */}
                    <div>
                        <p className="text-xs text-gray-400 mb-1">
                            Seller / Dashboard
                        </p>

                        <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
                            Seller Overview
                        </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            {greeting},{" "}
                            <span className="font-medium text-gray-800">
                                {user.username}
                            </span>
                            <br />
                            Email:{" "}
                            <span className="font-medium text-gray-700">
                                {user.email}
                            </span>
                        </p>
                    </div>

                    {/* Right */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                        <div className="hidden sm:block text-right">
                            <p className="text-xs text-gray-400">Today</p>
                            <p className="text-sm font-medium text-gray-700">
                                {formattedDate}
                            </p>
                        </div>

                        <button
                            onClick={() => router.push("/store/create")}
                            className="rounded-xl bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-900 transition flex items-center gap-2"
                        >
                            🏪 Open Store
                        </button>
                    </div>
                </div>

                {/* Divider */}
                <div className="mt-6 h-1 w-full rounded-full bg-gradient-to-r from-black via-gray-600 to-gray-200" />
            </div>
        </div>
    );
}
