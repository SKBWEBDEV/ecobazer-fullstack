import { Link } from 'react-router-dom'
import { CheckCircle2, XCircle, CircleSlash } from 'lucide-react'
import { useEffect } from 'react'
import api from '../services/axios'

const config = {
  success: {
    icon: CheckCircle2,
    iconClass: 'bg-moss-50 text-moss-600',
    title: 'Payment successful',
    message:
      'Thank you! Your order has been placed and a confirmation has been sent to your email.',
    cta: {
      to: '/profile',
      label: 'View my orders',
    },
  },

  fail: {
    icon: XCircle,
    iconClass: 'bg-red-50 text-red-600',
    title: 'Payment failed',
    message:
      'We could not process your payment. Please check your details and try again.',
    cta: {
      to: '/checkout',
      label: 'Try again',
    },
  },

  cancel: {
    icon: CircleSlash,
    iconClass: 'bg-ink-900/5 text-ink-900/60',
    title: 'Payment cancelled',
    message:
      'Your payment was cancelled. Your cart items are still saved.',
    cta: {
      to: '/cart',
      label: 'Back to cart',
    },
  },
}


const PaymentResult = ({ status = 'success' }) => {

  const {
    icon: Icon,
    iconClass,
    title,
    message,
    cta
  } = config[status]


  useEffect(() => {

    const completePayment = async () => {

      if (status === "success") {

        try {

          await api.post("/api/payment/success")

        } catch (error) {

          console.log(
            "Payment success update failed:",
            error.message
          )

        }

      }

    }


    completePayment()


  }, [status])


  return (

    <div className="container-app flex min-h-[70vh] items-center justify-center py-14">

      <div className="w-full max-w-md card-surface p-8 text-center animate-fadeUp">

        <span
          className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full ${iconClass}`}
        >
          <Icon size={30} />
        </span>


        <h1 className="text-xl font-semibold text-ink-900">
          {title}
        </h1>


        <p className="mt-2 text-sm text-ink-900/55">
          {message}
        </p>


        <div className="mt-6 flex justify-center gap-3">

          <Link
            to={cta.to}
            className="btn-primary"
          >
            {cta.label}
          </Link>


          <Link
            to="/"
            className="btn-outline"
          >
            Home
          </Link>

        </div>

      </div>

    </div>

  )
}


export default PaymentResult