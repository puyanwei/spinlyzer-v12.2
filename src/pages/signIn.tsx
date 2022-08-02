import Link from "next/link"

export default function SignInPage() {
  return (
    <Link href="/api/auth/signin">
      <a className="text-blue-400">Sign In</a>
    </Link>
  )
}
