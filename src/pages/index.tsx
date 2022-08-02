import type { NextPage } from "next"
import { useRouter } from "next/router"
import Head from "next/head"
import { useSession } from "next-auth/react"
import { trpc } from "../utils/trpc"
import Link from "next/link"
import UploadPage from "./upload"
import { useEffect } from "react"
import SignIn from "./signIn"

const HomePage: NextPage = () => {
  const { data: session } = useSession()
  const router = useRouter()

  return (
    <div>
      <Head>
        <title>Spinlyzer</title>
        <meta name="description" content="Welcome to Spinlyzer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {session ? <UploadPage /> : <SignIn />}
    </div>
  )
}

export default HomePage
