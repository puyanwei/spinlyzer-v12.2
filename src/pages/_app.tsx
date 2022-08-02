// src/pages/_app.tsx
import { withTRPC } from "@trpc/next"
import superjson from "superjson"
import "../styles/globals.css"
import type { AppRouter } from "../server/router"
import type { AppType } from "next/dist/shared/lib/utils"
import { SessionProvider } from "next-auth/react"
import SideMenu from "../components/compositions/SideMenu"

const MyApp: AppType = ({
  Component,
  pageProps: { session, className, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <div className="grid grid-cols-12 overflow-hidden bg-[#17181C] text-white  text-lg">
        <SideMenu />
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  )
}

const getBaseUrl = () => {
  if (typeof window !== "undefined") return ""
  if (process.browser) return "" // Browser should use current path
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}` // SSR should use vercel url
  return `http://localhost:${process.env.PORT ?? 3000}` // dev SSR should use localhost
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = `${getBaseUrl()}/api/trpc`

    return {
      url,
      transformer: superjson,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    }
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: false,
})(MyApp)
