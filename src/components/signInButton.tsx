'use client'

import { useSession } from "next-auth/react";
import Link from "next/link";

const SignInButton = () => {
  const { data: session } = useSession();
  if (session && session.user)
    return (
      <div className="flex gap-4 ml-auto">
        <p className="text-sky-600">{session.user.name}</p>
        <Link href={'/api/auth/signout'} className="text-red-600 flex gap-4 ml-auto">Sign out</Link>
      </div>
    )

  return (
    <div className="flex gap-4 ml-auto">
      <Link href={'/api/auth/signin'} className="text-green-600 flex gap-4 ml-auto">Sign In</Link>
      <Link href={'/signup'} className="flex gap-4 ml-auto bg-green-600 text-green-200 rounded p-2">Sign Up</Link>
    </div>
  )
}

export default SignInButton