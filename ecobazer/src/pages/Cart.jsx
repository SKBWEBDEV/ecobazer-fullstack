import { Link } from 'react-router-dom'
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react'
import { useCart } from '../hooks/useCart'
import { formatPrice } from '../utils/formatPrice'
import Loader from '../components/Loader'
import Button from '../components/Button'

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1595246140520-2ea3f0a1e1e9?w=300&q=60&auto=format&fit=crop'

const Cart = () => {
  const { items, loading, totalPrice, updateQuantity, removeFromCart } = useCart()

  if (loading) return <Loader full />

  if (items.length === 0) {
    return (
      <div className="container-app flex min-h-[60vh] flex-col items-center justify-center text-center">
        <span className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-moss-50 text-moss-600">
          <ShoppingBag size={28} />
        </span>
        <h1 className="text-xl font-semibold text-ink-900">Your cart is empty</h1>
        <p className="mt-1 text-sm text-ink-900/55">Browse the shop and add something you'll love.</p>
        <Link to="/products" className="btn-primary mt-6">
          Continue shopping <ArrowRight size={16} />
        </Link>
      </div>
    )
  }

  return (
    <div className="container-app py-10">
      <h1 className="mb-8 text-2xl font-semibold text-ink-900">Your cart</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {items.map((item) => {

  const product = item.product || item

  const productId = product._id
  const cartId = item._id

  const qty = item.quantity || item.qty || 1

  const price = product.price ?? item.price ?? 0

  const image = product.image || product.images?.[0] || FALLBACK_IMG

            return (
               <div key={cartId} className="card-surface flex gap-4 p-4">
                <img
                  src={image}
                  alt={product.title || product.name}
                  className="h-20 w-20 shrink-0 rounded-xl object-cover"
                  onError={(e) => (e.currentTarget.src = FALLBACK_IMG)}
                />
                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-sm font-semibold text-ink-900">{product.title || product.name}</h3>
                    <button
                      onClick={() => removeFromCart(cartId)}
                      className="text-ink-900/30 transition hover:text-red-600"
                      aria-label="Remove item"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 rounded-full border border-ink-900/10 px-2 py-1">
                      <button
                        onClick={() => updateQuantity(productId, 'minus')}
                        className="flex h-6 w-6 items-center justify-center rounded-full transition hover:bg-ink-900/5"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="w-5 text-center text-sm font-medium">{qty}</span>
                      <button
                        onClick={() => updateQuantity(productId, 'plus')}
                        className="flex h-6 w-6 items-center justify-center rounded-full transition hover:bg-ink-900/5"
                        aria-label="Increase quantity"
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                    <span className="font-semibold text-ink-900">{formatPrice(price * qty)}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="card-surface h-fit p-6">
          <h2 className="mb-4 text-lg font-semibold text-ink-900">Order summary</h2>
          <div className="space-y-2 text-sm text-ink-900/65">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-medium text-ink-900">{formatPrice(totalPrice)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="font-medium text-ink-900">Calculated at checkout</span>
            </div>
          </div>
          <div className="mt-4 flex justify-between border-t border-ink-900/8 pt-4 text-base font-semibold text-ink-900">
            <span>Total</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
          <Link to="/checkout">
            <Button className="mt-6 w-full">
              Proceed to checkout <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Cart
