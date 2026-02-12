"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { observer } from "mobx-react-lite";
import { authStore } from "@/stores/AuthStore";
import { useRouter } from "next/navigation";

const Navbar = observer(() => {
  // const router = useRouter();
  // const [mounted, setMounted] = useState(false);

  // // Rehydrate user from sessionStorage
  // useEffect(() => {
  //   setMounted(true);

  //   if (!authStore.user) {
  //     const storedUser = sessionStorage.getItem("user");
  //     if (storedUser) {
  //       authStore.setUser(JSON.parse(storedUser));
  //     }
  //   }
  // }, []);

  // // Prevent hydration mismatch
  // if (!mounted) return null;
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (!authStore.user) {
      const storedUser = sessionStorage.getItem("user");
      if (storedUser) {
        authStore.setUser(JSON.parse(storedUser));
      }
    }
    setIsMounted(true);
  }, []);

  // Only render after mount to prevent hydration mismatch
  if (!isMounted) {
    return (
      <nav className="border-b border-yellow-200 bg-green-200 px-10 py-4 h-20" />
    );
  }
  return (
    <nav className="border-b border-yellow-200 bg-green-200 px-10 py-4">
      <div className="flex items-center justify-between">
        {/* Left Side Links */}
        <ul className="flex gap-8 items-center">
          <li>
            <Link href="/" className="font-medium hover:text-blue-600">
              Home
            </Link>
          </li>

          <li>
            <Link href="/about" className="font-medium hover:text-blue-600">
              About
            </Link>
          </li>

          <li>
            <Link href="/contact" className="font-medium hover:text-blue-600">
              Contact
            </Link>
          </li>

          {authStore.user && (
            <li>
              <Link
                href="/dashboard"
                className="font-medium hover:text-blue-600"
              >
                Dashboard
              </Link>
            </li>
          )}
        </ul>

        {/* Right Side Auth Section */}
        <div className="flex gap-6 items-center">
          {!authStore.user ? (
            <>
              <Link href="/login" className="hover:text-blue-600">
                Login
              </Link>
              <Link href="/signup" className="hover:text-blue-600">
                Signup
              </Link>
            </>
          ) : (
            <>
              <span className="font-semibold">
                Welcome, {authStore.user.name}
              </span>

              <button
                onClick={() => {
                  authStore.logout();
                  sessionStorage.removeItem("user");
                  router.push("/login");
                }}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
});

export default Navbar;
