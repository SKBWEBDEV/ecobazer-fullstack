import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { CheckCircle2, XCircle } from 'lucide-react'
import { verifyEmail } from '../services/authService'
import { getErrorMessage } from '../utils/getErrorMessage'
import Loader from '../components/Loader'

const MailVerification = () => {
  const { token } = useParams()
  const [status, setStatus] = useState('loading') // loading | success | error
  const [message, setMessage] = useState('')

  useEffect(() => {
    const run = async () => {
      try {
        await verifyEmail(token)
        setStatus('success')
      } catch (error) {
        setStatus('error')
        setMessage(getErrorMessage(error, 'This verification link is invalid or has expired.'))
      }
    }
    run()
  }, [token])

  return (
    <div className="container-app flex min-h-[80vh] items-center justify-center py-14">
      <div className="w-full max-w-md card-surface p-8 text-center animate-fadeUp">
        {status === 'loading' && <Loader label="Verifying your email" />}

        {status === 'success' && (
          <>
            <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-moss-50 text-moss-600">
              <CheckCircle2 size={28} />
            </span>
            <h1 className="text-xl font-semibold text-ink-900">Email verified</h1>
            <p className="mt-2 text-sm text-ink-900/55">Your account is now active. You can log in.</p>
            <Link to="/login" className="btn-primary mt-6 inline-flex">
              Go to login
            </Link>
          </>
        )}

        {status === 'error' && (
          <>
            <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600">
              <XCircle size={28} />
            </span>
            <h1 className="text-xl font-semibold text-ink-900">Verification failed</h1>
            <p className="mt-2 text-sm text-ink-900/55">{message}</p>
            <Link to="/register" className="btn-outline mt-6 inline-flex">
              Back to sign up
            </Link>
          </>
        )}
      </div>
    </div>
  )
}

export default MailVerification
