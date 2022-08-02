import type { NextPage } from "next"
import { useRouter } from "next/router"
import Head from "next/head"
import { useSession } from "next-auth/react"

import AnalysisPage from "./analysis"
import SignInPage from "./signIn"

const HomePage: NextPage = () => {
  const { data: session } = useSession()

  return (
    <div>
      <Head>
        <title>Spinlyzer</title>
        <meta name="description" content="Welcome to Spinlyzer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {session ? <AnalysisPage /> : <SignInPage />}
    </div>
  )
}

export default HomePage
