"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import toast from "react-hot-toast";


export default function UpdateStorePage() {
    const [formData, setFormData] = useState({
        storeName: "",
        description: "",
        storeProducts: "",
        address: {
            street: "",
            city: "",
            state: "",
            postalCode: "",
            country: "India",
        },
    });
    const router = useRouter();
    const { storeId } = useParams();

    const [logo, setLogo] = useState(null);
    const [banner, setBanner] = useState(null);
    const [loading, setLoading] = useState(false);


    async function uploadImage(file) {
        const data = new FormData();
        data.append("file", file);

        const res = await fetch("/api/upload", {
            method: "POST",
            credentials: "include",
            body: data,
        });

        const result = await res.json();
        return result.url;
    }

    function handleChange(e) {
        const { name, value } = e.target;

        if (name.startsWith("address.")) {
            const field = name.split(".")[1];
            setFormData((prev) => ({
                ...prev,
                address: { ...prev.address, [field]: value },
            }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

        try {
            let logoUrl = "";
            let bannerUrl = "";

            // upload images first
            if (logo) logoUrl = await uploadImage(logo);
            if (banner) bannerUrl = await uploadImage(banner);

            const payload = {
                storeName: formData.storeName,
                description: formData.description,
                storeProducts: formData.storeProducts.split(","),
                address: formData.address,
                logo: logoUrl,
                banner: bannerUrl
            };

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/seller/store/${storeId}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify(payload),
                }
            );

            if (!res.ok) throw new Error("Update failed");

            toast.success("Store updated successfully");

            router.push(`/seller/store/${storeId}`);
        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    }


    return (
        <div className="min-h-screen bg-gray-50 px-4 py-14">
            <div className="mx-auto max-w-5xl bg-white rounded-3xl shadow-xl p-6 md:p-10">

                {/* <h1 className="text-3xl font-bold mb-8">Update Store Details</h1> */}

                <form onSubmit={handleSubmit} className="space-y-8">

                    {/* BASIC INFO */}
                    <section className="space-y-4">
                        <h2 className="text-lg font-semibold">Basic Information</h2>

                        <div className="grid gap-4">
                            <div>
                                <label className="text-sm text-gray-600">Store Name</label>
                                <input
                                    name="storeName"
                                    placeholder="Enter store name"
                                    onChange={handleChange}
                                    className="border rounded-xl px-4 py-3 w-full"
                                />
                            </div>

                            <div>
                                <label className="text-sm text-gray-600">Store Description</label>
                                <textarea
                                    name="description"
                                    placeholder="Describe your store"
                                    rows={3}
                                    onChange={handleChange}
                                    className="border rounded-xl px-4 py-3 w-full"
                                />
                            </div>

                            <div>
                                <label className="text-sm text-gray-600">
                                    Store Products (comma separated)
                                </label>
                                <input
                                    name="storeProducts"
                                    placeholder="Shoes, Shirts, Watches"
                                    onChange={handleChange}
                                    className="border rounded-xl px-4 py-3 w-full"
                                />
                            </div>
                        </div>
                    </section>

                    {/* ADDRESS */}
                    <section className="space-y-4">
                        <h2 className="text-lg font-semibold">Store Address</h2>

                        <input
                            name="address.street"
                            placeholder="Street Address"
                            onChange={handleChange}
                            className="border rounded-xl px-4 py-3 w-full"
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                name="address.city"
                                placeholder="City"
                                onChange={handleChange}
                                className="border rounded-xl px-4 py-3"
                            />
                            <input
                                name="address.state"
                                placeholder="State"
                                onChange={handleChange}
                                className="border rounded-xl px-4 py-3"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                name="address.postalCode"
                                placeholder="Postal Code"
                                onChange={handleChange}
                                className="border rounded-xl px-4 py-3"
                            />
                            <input
                                value="India"
                                disabled
                                className="border rounded-xl px-4 py-3 bg-gray-100"
                            />
                        </div>
                    </section>

                    {/* BRANDING */}
                    <section className="space-y-4">
                        <h2 className="text-lg font-semibold">Branding</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="text-sm text-gray-600">Store Logo</label>
                                <input type="file" onChange={(e) => setLogo(e.target.files[0])} />
                            </div>

                            <div>
                                <label className="text-sm text-gray-600">Store Banner</label>
                                <input type="file" onChange={(e) => setBanner(e.target.files[0])} />
                            </div>
                        </div>
                    </section>

                    <button className="w-full bg-black text-white py-3 rounded-xl">
                        {loading ? "Updating..." : "Update Store"}
                    </button>


                </form>
            </div>
        </div>
    );
}
