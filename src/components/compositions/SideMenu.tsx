import React from "react"
import Link from "next/link"
import { Component } from "../../types"

interface Props extends Component {}

export default function SideMenu({ children }: Props) {
  return (
    <>
      <nav className="bg-[#1E1F25] grid col-span-2 p-8 content-between">
        <div className="flex flex-col">
          <div className="text-white">Spinlyzer</div>
          <Link href="/api/auth/signout">
            <a className="text-blue-400">Analysis</a>
          </Link>
          <Link href="/api/auth/signout">
            <a className="text-blue-400">Upload</a>
          </Link>
          <Link href="/api/auth/signout">
            <a className="text-blue-400">History</a>
          </Link>
        </div>
        <div className="flex flex-col">
          <Link href="/api/auth/signout">
            <a className="text-blue-400">Settings</a>
          </Link>
          <Link href="/api/auth/signout">
            <a className="text-blue-400">Sign Out</a>
          </Link>
        </div>
        {children}
      </nav>
    </>
  )
}
