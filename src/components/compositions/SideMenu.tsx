import React from "react"
import Link from "next/link"
import { UploadIcon } from "../Icons/UploadIcon"
import { PieChartIcon } from "../Icons/PieChartIcon"
import { CalendarIcon } from "../Icons/CalendarIcon"
import { GearIcon } from "../Icons/GearIcon"
import { LogoutIcon } from "../Icons/LogoutIcon"

export default function SideMenu() {
  return (
    <nav className="bg-[#1E1F25] font-semibold">
      <div className="flex flex-col justify-between h-screen p-12">
        <div className="flex flex-col">
          <div className="pb-8 text-xl">Spinlyzer</div>
          <span className="flex items-center py-4">
            <PieChartIcon />
            <Link href="/">
              <a className="ml-4">Analysis</a>
            </Link>
          </span>
          <span className="flex items-center py-4">
            <UploadIcon />
            <Link href="/upload">
              <a className="ml-4">Upload</a>
            </Link>
          </span>
          <span className="flex items-center py-4">
            <CalendarIcon />
            <Link href="/history">
              <a className="ml-4">History</a>
            </Link>
          </span>
        </div>
        <div className="flex flex-col">
          {/* <span className="flex items-center py-4">
            <GearIcon />
            <Link href="/settings">
              <a className="ml-4">Settings</a>
            </Link>
          </span> */}
          <span className="flex items-center py-4">
            <LogoutIcon />
            <Link href="/api/auth/signout">
              <a className="ml-4">Sign Out</a>
            </Link>
          </span>
        </div>
      </div>
    </nav>
  )
}
