import React from "react"
import Link from "next/link"

export default function SideMenu() {
  return (
    <nav className="bg-[#1E1F25] max-w-[200px] font-semibold">
      <div className="p-8 text-lg">Spinlyzer</div>
      <div className="flex flex-col justify-between h-[90vh]">
        <div className="flex flex-col px-4">
          <Link href="/">
            <a className="p-2">Analysis</a>
          </Link>
          <Link href="/upload">
            <a className="p-2">Upload</a>
          </Link>
          <Link href="/history">
            <a className="p-2">History</a>
          </Link>
        </div>
        <div className="flex flex-col p-4">
          <Link href="/settings">
            <a className="p-2">Settings</a>
          </Link>
          <Link href="/api/auth/signout">
            <a className="p-2">Sign Out</a>
          </Link>
        </div>
      </div>
    </nav>
  )
}
