"use client";

import { useParams } from "next/navigation";
import { useState } from "react";

const plans = [
  { amount: 100, label: "1 Month" },
  { amount: 250, label: "3 Months" },
  { amount: 500, label: "6 Months" },
  { amount: 1000, label: "1 Year" },
];

export default function SubscriptionPage() {
  const { storeId } = useParams();
  const [loading, setLoading] = useState(false);

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (amount) => {
    try {
      setLoading(true);
      await loadRazorpay();

      // 1️⃣ Create order
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}seller/store/upgradesubscription`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount }),
        }
      );

      const { data: order } = await res.json();

      // 2️⃣ Razorpay checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "Store Subscription",
        description: "Subscription Payment",
        order_id: order.id,

        handler: async function (response) {
          await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/subscription/verify/${storeId}`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ...response,
                amount,
              }),
            }
          );

          alert("Subscription Activated Successfully ✅");
        },

        theme: {
          color: "#2563eb",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error(error);
      alert("Payment failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Choose a Subscription Plan</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.amount}
            className="border rounded-xl p-6 shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold">₹{plan.amount}</h2>
            <p className="text-gray-600 mt-2">{plan.label}</p>

            <button
              disabled={loading}
              onClick={() => handlePayment(plan.amount)}
              className="mt-4 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800"
            >
              {loading ? "Processing..." : "Activate / Upgrade"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
