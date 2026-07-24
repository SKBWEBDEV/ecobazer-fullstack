import { Link } from 'react-router-dom'
import { Leaf } from 'lucide-react'

const NotFound = () => {
  return (
    <div className="container-app flex min-h-[70vh] flex-col items-center justify-center text-center">
      <span className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-moss-50 text-moss-600">
        <Leaf size={28} />
      </span>
      <h1 className="text-5xl font-semibold text-ink-900">404</h1>
      <p className="mt-2 text-sm text-ink-900/55">This page has wandered off the path.</p>
      <Link to="/" className="btn-primary mt-6">
        Back to home
      </Link>
    </div>
  )
}

export default NotFound
