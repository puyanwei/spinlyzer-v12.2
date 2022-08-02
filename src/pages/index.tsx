import type { NextPage } from "next"
import Head from "next/head"
import { useSession } from "next-auth/react"
import { trpc } from "../utils/trpc"
import Link from "next/link"
import UploadPage from "./UploadPage"

const HomePage: NextPage = () => {
  const { data: session } = useSession()
  return (
    <>
      <Head>
        <title>Spinlyzer</title>
        <meta name="description" content="Welcome to Spinlyzer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        className="grid w-screen min-h-screen p-4 overflow-hidden place-items-center"
        data-testid="homepage"
      >
        {session ? (
          <UploadPage />
        ) : (
          <Link href="/api/auth/signin">
            <a className="text-blue-400">Sign In</a>
          </Link>
        )}
      </div>
    </>
  )
}

export default HomePage
