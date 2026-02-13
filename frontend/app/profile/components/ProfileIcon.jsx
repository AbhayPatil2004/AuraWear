"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ProfileIcon() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return;

    try {
      const parsed = JSON.parse(storedUser);
      setUser(parsed.value);
    } catch {
      localStorage.removeItem("user");
    }
  }, []);

  // Close dropdown if click outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  // Avatar click handler
  const handleAvatarClick = () => {
    if (!user) {
      router.push("/auth/signin");
    } else {
      setOpen(!open);
    }
  };

  // Logout handler
  const handleLogout = async () => {
    try {
      await fetch("http://localhost:8000/user/logout", {
        method: "POST",
        credentials: "include",
      });

      localStorage.removeItem("user");
      setUser(null);
      setOpen(false);
      toast.success("Logout successful");
    } catch (err) {
      console.error("Logout failed", err);
      toast.error("Logout failed");
    }
  };

  const initials = user?.username
    ?.split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Avatar */}
      <div
        onClick={handleAvatarClick}
        className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden
                   flex items-center justify-center cursor-pointer
                   font-semibold hover:ring-2 hover:ring-gray-400 transition"
      >
        {user?.avatar ? (
          <img
            src={user.avatar}
            alt="avatar"
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-gray-700">{user ? initials : "?"}</span>
        )}
      </div>

      {/* Dropdown */}
      {open && user && (
        <div
          className="absolute right-0 mt-3 w-60 bg-white border
                     border-gray-200 rounded-xl shadow-lg z-50"
        >
          {/* User Info */}
          <div className="px-4 py-3 border-b">
            <p className="font-semibold text-sm">{user.username}</p>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          </div>

          {/* Role Based Links */}
          <div className="py-2">
            {user.role === "user" && (
              <>
                <MenuItem label="My Orders" />
                <MenuItem label="My Wishlist" />
                <MenuItem label="Open Store" />
              </>
            )}

            {user.role === "seller" && (
              <>
                <MenuItem
                  label="Seller Dashboard"
                  onClick={() => router.push("/seller/dashboard")}
                />
                <MenuItem
                  label="My Stores"
                  onClick={() => router.push("/seller/store")}
                />
                <MenuItem
                  label="Orders"
                  onClick={() => router.push("/seller/orders")}
                />
                <MenuItem
                  label="User complaints"
                  onClick={() => router.push("/seller/complaints")}
                />
                <MenuItem
                  label="Open Store"
                  onClick={() => router.push("/seller/open-store")}
                />
              </>
            )}

            {user.role === "admin" && (
              <>
                <MenuItem
                  label="Admin Dashboard"
                  onClick={() => router.push("/admin/dashboard")}
                />
                <MenuItem
                  label="Users Management"
                  onClick={() => router.push("/admin/users")}
                />
                <MenuItem
                  label="Sellers Management"
                  onClick={() => router.push("/admin/sellers")}
                />
                <MenuItem
                  label="Orders Management"
                  onClick={() => router.push("/admin/orders")}
                />
                <MenuItem
                  label="Complaints"
                  onClick={() => router.push("/admin/complaints")}
                />
              </>
            )}

            <MenuItem label="Profile" onClick={() => router.push("/profile")} />
          </div>

          {/* Logout */}
          <div className="border-t">
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm
                         text-red-600 hover:bg-red-50 transition"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* -------- Menu Item -------- */
function MenuItem({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition"
    >
      {label}
    </button>
  );
}
