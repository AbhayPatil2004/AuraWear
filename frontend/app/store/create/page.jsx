"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateStorePage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    storeName: "",
    description: "",
    storeProducts: "",
    address: ""
  });

  const [logo, setLogo] = useState(null);
  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  // 🔹 Upload image using YOUR backend Cloudinary API
  async function uploadImage(file) {
    const data = new FormData();
    data.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      credentials: "include",
      body: data
    });

    const result = await res.json();

    return result.url;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      let logoUrl = "";
      let bannerUrl = "";

      if (logo) logoUrl = await uploadImage(logo);
      if (banner) bannerUrl = await uploadImage(banner);

      const payload = {
        storeName: formData.storeName,
        description: formData.description,
        storeProducts: formData.storeProducts.split(","),
        address: formData.address,
        logoUrl,
        bannerUrl
      };

      const res = await fetch(
        "http://localhost:8000/store/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include",
          body: JSON.stringify(payload)
        }
      );

      const data = await res.json();

      if (!res.ok) {
        if (data.message === "Unauthorized: Please login first") {
          router.push("/auth/signup");
          return;
        }
        throw new Error(data.message || "Store creation failed");
      }

      router.push("/")
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className=" text-black min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8">

        <h1 className="text-3xl font-semibold text-gray-900 mb-2">
          Open Your Store On AURAWEAR
        </h1>
        <p className="text-black  mb-8">
          Create your store and start selling your products
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Store Name */}
          <div>
            <label className="block text-sm font-medium text-black  mb-1">
              Store Name
            </label>
            <input
              name="storeName"
              placeholder="Enter store name"
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-black  mb-1">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Describe your store"
              rows={3}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Products */}
          <div>
            <label className="block text-sm font-medium text-black  mb-1">
              Products
            </label>
            <input
              name="storeProducts"
              placeholder="Shoes, Shirts, Watches"
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-black  mb-1">
              Store Address
            </label>
            <input
              name="address"
              placeholder="Store address"
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Upload Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-black  mb-1">
                Store Logo
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setLogo(e.target.files[0])}
                className="w-full text-sm file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:bg-gray-100 file:text-gray-700
              hover:file:bg-gray-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black  mb-1">
                Store Banner
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setBanner(e.target.files[0])}
                className="w-full text-sm file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:bg-gray-100 file:text-gray-700
              hover:file:bg-gray-200"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-xl font-medium
          hover:bg-gray-900 transition disabled:opacity-60"
          >
            {loading ? "Creating Store..." : "Create Store"}
          </button>

        </form>
      </div>
    </div>

  );
}
