import Image from "next/image";
import Link from "next/link";
import React from "react";
import SearchBar from "./SearchBar";
import { Bell, Home } from "lucide-react";
import ShoppingCartIcon from "./ShoppingCartIcon";
import SignInButton from "./SignInButton";
import { auth } from "../../auth";

const Navbar = async () => {
  const session = await auth();

  return (
    <nav className="w-full flex items-center justify-between border-b border-gray-200 pb-4 mb-10 sticky top-2 z-10 backdrop-blur-md">
      {/* LEFT SIDE */}
      <Link href={"/"} className="flex items-center">
        <Image
          src={"/logo.png"}
          alt="Love'n Shop"
          height={36}
          width={36}
          className="w-6 h-6 md:w-9 md:h-9"
        />
        <p className=" hidden md:block text-md font-medium tracking-wider">
          Love&apos;n Shop
        </p>
      </Link>
      {/* RIGHT SIDE */}
      <div className="flex items-center gap-6">
        <SearchBar />
        <Link href={"/"}>
          <Home className="w-4 h-4 text-gray-600" />
        </Link>
        <Bell className="w-4 h-4 text-gray-600" />
        <Link href={"/cart?step=1"}>
          <ShoppingCartIcon />
        </Link>
        {session?.user ? (
          <div className="flex items-center justify-center relative h-8 w-8 bg-gray-600 rounded-full">
            <Image
              src={session?.user.image || ""}
              alt="User"
              fill
              className="rounded-full"
            />
          </div>
        ) : (
          <SignInButton />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
