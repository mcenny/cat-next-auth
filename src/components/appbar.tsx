import Link from "next/link"
import SignInButton from "./signInButton"

const AppBar = () => {
  return (
    <header className="flex gap-4 p-4 bg-gradient-to-b from-white to-gray-200 shadow">
      <Link href={'/'} className="transition-colors hover:text-blue-500 text-gray-500">Home Page</Link>
      <Link href={'/dashboard'} className="transition-colors hover:text-blue-500 text-gray-500">Dashboard</Link>
      <SignInButton />
    </header>
  )
}

export default AppBar