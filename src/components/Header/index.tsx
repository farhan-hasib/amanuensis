"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";

const Header = () => {
  const [sticky, setSticky] = useState(false);
  const handleStickyNavbar = () => {
    if (window.scrollY >= 80) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleStickyNavbar);
  });

  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <>
      <header
        className={`header left-0 top-0 z-40 flex w-full items-center ${
          sticky
            ? "dark:bg-gray-dark fixed z-[9999] bg-white !bg-opacity-80 shadow-sticky backdrop-blur-sm transition dark:shadow-sticky-dark"
            : "absolute bg-transparent"
        }`}
      >
        <div className="container">
          <div className="relative flex">
            <div
              className={`header-logo block w-full px-4 ${
                sticky ? "py-6 lg:py-2" : "py-8"
              }`}
            >
              <Image
                src="/images/logo/logo.svg"
                alt="logo"
                width={300}
                height={300}
                className="logo-image"
              />
            </div>
            <div className="flex w-full items-center justify-between px-8">
              <div></div>
              <div className="flex items-center justify-end pr-16 lg:pr-0">
                {(pathname === "/" || pathname === "/note") &&
                  (session ? (
                    <button
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="ease-in-up hidden rounded-full bg-primary px-8 py-3 text-base font-medium text-white shadow-btn transition duration-500 hover:bg-opacity-50 hover:shadow-btn-hover md:block md:px-9 lg:px-6 xl:px-9"
                    >
                      Sign out
                    </button>
                  ) : (
                    <Link
                      href="/signin"
                      className="ease-in-up hidden rounded-full bg-primary px-8 py-3 text-base font-medium text-white shadow-btn transition duration-500 hover:bg-opacity-50 hover:shadow-btn-hover md:block md:px-6 lg:px-6 xl:px-9"
                    >
                      Sign in
                    </Link>
                  ))}
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
