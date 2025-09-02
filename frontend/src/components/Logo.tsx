import { Link } from "react-router-dom"

export const Logo = () => {
  return (
    <div className="flex justify-center mb-5">
      <Link to="/">
        <img src="/logo.svg" className="w-72 h-auto" />
      </Link>
    </div>
  )
}
