import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { KeyRound, MailCheck } from 'lucide-react'
import toast from 'react-hot-toast'
import { forgotPassword } from '../services/authService'
import { getErrorMessage } from '../utils/getErrorMessage'
import Input from '../components/Input'
import Button from '../components/Button'

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(false)

  const onSubmit = async ({ email }) => {
    setSubmitting(true)
    try {
      await forgotPassword(email)
      setSent(true)
      toast.success('Reset link sent')
    } catch (error) {
      toast.error(getErrorMessage(error, 'Could not send reset link.'))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="container-app flex min-h-[80vh] items-center justify-center py-14">
      <div className="w-full max-w-md card-surface p-8 text-center animate-fadeUp">
        {sent ? (
          <>
            <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-moss-50 text-moss-600">
              <MailCheck size={26} />
            </span>
            <h1 className="text-xl font-semibold text-ink-900">Check your inbox</h1>
            <p className="mt-2 text-sm text-ink-900/55">
              If an account exists for that email, a password reset link is on its way.
            </p>
          </>
        ) : (
          <>
            <span className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-moss-600 text-white">
              <KeyRound size={20} />
            </span>
            <h1 className="text-xl font-semibold text-ink-900">Forgot your password?</h1>
            <p className="mt-1 text-sm text-ink-900/55">
              Enter your email and we'll send you a reset link.
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4 text-left">
              <Input
                label="Email address"
                type="email"
                placeholder="you@example.com"
                error={errors.email?.message}
                {...register('email', {
                  required: 'Email is required',
                  pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' },
                })}
              />
              <Button type="submit" loading={submitting} className="w-full">
                Send reset link
              </Button>
            </form>
          </>
        )}

        <p className="mt-6 text-center text-sm text-ink-900/55">
          Remembered your password?{' '}
          <Link to="/login" className="font-medium text-moss-700 hover:text-moss-800">
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default ForgotPassword
