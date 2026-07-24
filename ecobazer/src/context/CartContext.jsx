import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { AuthContext } from './AuthContext'
import {
  addToCartApi,
  getCartApi,
  removeFromCartApi,
  updateCartQtyApi,
} from '../services/cartService'
import { getErrorMessage } from '../utils/getErrorMessage'

export const CartContext = createContext(null)

export const CartProvider = ({ children }) => {
  const { user, isAuthenticated } = useContext(AuthContext)
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)

const fetchCart = useCallback(async () => {

  if (!isAuthenticated || !user?.id) {
    setItems([])
    return
  }

  setLoading(true)

  try {

    const { data } = await getCartApi(user.id)

    console.log("CART RESPONSE:", data)


    setItems(
      data?.cart || []
    )


  } catch(error){

    toast.error(
      getErrorMessage(error,'Could not load your cart.')
    )

  } finally {

    setLoading(false)

  }

},[isAuthenticated,user?.id])

  useEffect(() => {
    fetchCart()
  }, [fetchCart])

const addToCart = useCallback(
  async (proid) => {

    console.log("Product ID:", proid)
    console.log("User:", user)
    console.log("User ID:", user?.id)

    if (!isAuthenticated) {
      toast.error('Please log in to add items to your cart.')
      return { success: false }
    }

    try {

      await addToCartApi(proid, user.id)

      await fetchCart()

      toast.success('Added to cart')

      return { success: true }

    } catch (error) {

      toast.error(
        getErrorMessage(error, 'Could not add item to cart.')
      )

      return { success:false }
    }

  },
  [isAuthenticated, user?.id, fetchCart]
)

  const updateQuantity = useCallback(
    async (id, type) => {
      try {
        await updateCartQtyApi(id, type, user.id)
        await fetchCart()
      } catch (error) {
        toast.error(getErrorMessage(error, 'Could not update quantity.'))
      }
    },
    [user?.id, fetchCart]
  )

  const removeFromCart = useCallback(
    async (id) => {
      try {
        await removeFromCartApi(id)
        await fetchCart()
        toast.success('Item removed')
      } catch (error) {
        toast.error(getErrorMessage(error, 'Could not remove item.'))
      }
    },
    [fetchCart]
  )

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + (item.quantity || item.qty || 1), 0),
    [items]
  )

const totalPrice = useMemo(
  () =>
    items.reduce(
      (sum,item)=> sum + (item.totalPrice || 0),
      0
    ),
  [items]
)

  return (
    <CartContext.Provider
      value={{
        items,
        loading,
        totalItems,
        totalPrice,
        fetchCart,
        addToCart,
        updateQuantity,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
