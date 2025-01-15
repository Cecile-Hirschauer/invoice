"use client";
import { UserButton } from "@clerk/nextjs";
import { Layers } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathName = usePathname();
  const navLinks = [{ href: "/", label: "Factures" }];

  const isActiveLink = (href: string) =>
    pathName.replace(/\/$/, "") === href.replace(/\/$/, "");

  const renderLinks = (className: string) =>
    navLinks.map(({ href, label }) => {
      return (
        <Link
          href={href}
          key={href}
          className={`btn btn-sm ${className} ${
            isActiveLink(href) ? "btn-accent" : ""
          }`}
        >
          {label}
        </Link>
      );
    });

  return (
    <div className="border-b border-base-300 px-5 md:px-[10%] py-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="bg-accent-content text-accent rounded-full p-2">
            <Layers className="w-6 h-6" />
          </div>
          <span className="ml-3 font-bold text-xl italic">
            In<span className="text-accent">Voice</span>
          </span>
        </div>
        <div className="flex space-x-4 items-center">
          {renderLinks("btn")}
          <UserButton />
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Navbar;
