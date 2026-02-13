"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function UpdateProductPage() {
    const { storeId, productId } = useParams();
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [productInfo, setProductInfo] = useState(null);

    const [form, setForm] = useState({
        title: "",
        description: "",
        price: "",
        stock: "",
        category: "",
        deliveryTime: "",
        discountPercentage: 0,
        isReturnable: true,
        sizes: "",
        colors: "",
        tags: "",
    });

    const [images, setImages] = useState([]);
    const [video, setVideo] = useState(null);

    // upload file
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

    // image handler
    const handleImagesChange = (e) => {
        setImages(Array.from(e.target.files));
    };

    // video handler
    const handleVideoChange = (e) => {
        setVideo(e.target.files[0]);
    };

    useEffect(() => {
        async function fetchProduct() {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/seller/store/${storeId}/products/${productId}`,
                { credentials: "include" }
            );

            const data = await res.json();
            const p = data?.data;

            setProductInfo({
                title: p.title,
                image: p.images?.[0],
            });
        }

        if (storeId && productId) fetchProduct();
    }, [storeId, productId]);

    const handleUpdate = async () => {
    try {
        setLoading(true);

        // 1️⃣ Upload new images only if user selected
        const imageUrls = images.length
            ? await Promise.all(images.map(uploadImage))
            : undefined; // undefined means no update

        const videoUrl = video ? [await uploadImage(video)] : undefined;

        // 2️⃣ Prepare payload – include only non-empty fields
        const payload = {};

        if (form.title.trim()) payload.title = form.title;
        if (form.description.trim()) payload.description = form.description;
        if (form.price) payload.price = Number(form.price);
        if (form.stock) payload.stock = Number(form.stock);
        if (form.category.trim()) payload.category = form.category;
        if (form.deliveryTime.trim()) payload.deliveryTime = form.deliveryTime;
        if (form.discountPercentage) payload.discountPercentage = Number(form.discountPercentage);
        payload.isReturnable = form.isReturnable;
        if (form.sizes.trim()) payload.sizes = form.sizes.split(",").map(s => s.trim());
        if (form.colors.trim()) payload.colors = form.colors.split(",").map(c => c.trim());
        if (form.tags.trim()) payload.tags = form.tags.split(",").map(t => t.trim());
        if (imageUrls) payload.images = imageUrls;
        if (videoUrl) payload.video = videoUrl;

        // 3️⃣ Send update request
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/seller/store/product/${productId}`,
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(payload),
            }
        );

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Update failed");
        }

        toast.success("Product updated successfully");
        router.push(`/seller/store/${storeId}/product/${productId}`);

    } catch (err) {
        toast.error(err.message);
    } finally {
        setLoading(false);
    }
};


    return (
        <div className="max-w-4xl mx-auto p-8 space-y-8">

            {productInfo && (
                <div className="flex items-center gap-4 bg-white p-6 rounded-xl shadow">
                    <img
                        src={productInfo.image}
                        className="w-24 h-24 object-cover rounded-lg"
                    />
                    <h2 className="text-lg font-medium">{productInfo.title}</h2>
                </div>
            )}

            <div className="bg-white p-8 rounded-2xl shadow space-y-5">

                <input className="input-modern" placeholder="Title"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                />

                <textarea className="input-modern" placeholder="Description"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                />

                <input type="number" className="input-modern" placeholder="Price"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                />

                <input type="number" className="input-modern" placeholder="Stock"
                    value={form.stock}
                    onChange={(e) => setForm({ ...form, stock: e.target.value })}
                />

                <input className="input-modern" placeholder="Category"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                />

                <input className="input-modern" placeholder="Delivery Time"
                    value={form.deliveryTime}
                    onChange={(e) => setForm({ ...form, deliveryTime: e.target.value })}
                />

                <input type="number" className="input-modern" placeholder="Discount %"
                    value={form.discountPercentage}
                    onChange={(e) => setForm({ ...form, discountPercentage: e.target.value })}
                />

                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={form.isReturnable}
                        onChange={(e) => setForm({ ...form, isReturnable: e.target.checked })}
                    />
                    Returnable Product
                </label>

                <input className="input-modern" placeholder="Sizes (S,M,L)"
                    value={form.sizes}
                    onChange={(e) => setForm({ ...form, sizes: e.target.value })}
                />

                <input className="input-modern" placeholder="Colors"
                    value={form.colors}
                    onChange={(e) => setForm({ ...form, colors: e.target.value })}
                />

                <input className="input-modern" placeholder="Tags"
                    value={form.tags}
                    onChange={(e) => setForm({ ...form, tags: e.target.value })}
                />

                {/* Images */}
                <div>
                    <label className="block text-sm font-medium mb-1">Upload Images (multiple)</label>
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImagesChange}
                    />
                </div>

                {/* Video */}
                <div>
                    <label className="block text-sm font-medium mb-1">Upload Video (single)</label>
                    <input
                        type="file"
                        accept="video/*"
                        onChange={handleVideoChange}
                    />
                </div>

            </div>

            <button
                onClick={handleUpdate}
                disabled={loading}
                className="w-full bg-black text-white py-3 rounded-xl"
            >
                {loading ? "Updating..." : "Update Product"}
            </button>
        </div>
    );
}
