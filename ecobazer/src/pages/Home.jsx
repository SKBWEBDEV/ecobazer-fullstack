import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Leaf, Truck, ShieldCheck, RotateCcw } from 'lucide-react'
import { getProducts } from '../services/productService'
import ProductCard from '../components/ProductCard'
import Loader from '../components/Loader'

const perks = [
  { icon: Leaf, title: 'Sustainably sourced', desc: 'Every listing is vetted for materials and origin.' },
  { icon: Truck, title: 'Fast delivery', desc: 'Tracked shipping on every order, nationwide.' },
  { icon: ShieldCheck, title: 'Secure checkout', desc: 'Payments are encrypted end-to-end.' },
  { icon: RotateCcw, title: 'Easy returns', desc: '30-day no-questions-asked returns.' },
]

const Home = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await getProducts({ limit: 8 })
        const list = Array.isArray(data) ? data : data?.products || []
        setProducts(list.slice(0, 8))
      } catch {
        setProducts([])
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <div>
      <section className="relative overflow-hidden bg-ink-900 text-white">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-moss-600/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 left-1/3 h-80 w-80 rounded-full bg-moss-500/20 blur-3xl" />
        <div className="container-app relative grid gap-10 py-20 md:grid-cols-2 md:py-28">
          <div className="flex flex-col justify-center animate-fadeUp">
            <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-moss-300">
              <Leaf size={13} /> Low-impact, everyday goods
            </span>
            <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
              Shop things that last, from people who care where they came from.
            </h1>
            <p className="mt-5 max-w-md text-white/65">
              EcoBazer curates home, kitchen, and lifestyle products built to be used for years, not seasons.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/products" className="btn-primary px-7 py-3">
                Shop the collection <ArrowRight size={16} />
              </Link>
              <Link to="/register" className="btn-outline !bg-transparent !text-white/85 !border-white/20 px-7 py-3 hover:!border-moss-400 hover:!text-moss-300">
                Create an account
              </Link>
            </div>
          </div>
          <div className="relative hidden items-center justify-center md:flex">
            <img
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=700&q=70&auto=format&fit=crop"
              alt="Curated sustainable products"
              className="w-full max-w-md rounded-3xl object-cover shadow-2xl"
            />
          </div>
        </div>
      </section>

      <section className="container-app -mt-10 relative z-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {perks.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="card-surface flex items-start gap-3 p-5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-moss-50 text-moss-700">
              <Icon size={19} />
            </span>
            <div>
              <p className="text-sm font-semibold text-ink-900">{title}</p>
              <p className="mt-0.5 text-xs text-ink-900/55">{desc}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="container-app py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-ink-900">Featured products</h2>
            <p className="mt-1 text-sm text-ink-900/55">Fresh picks from the EcoBazer catalog.</p>
          </div>
          <Link to="/products" className="hidden text-sm font-medium text-moss-700 hover:text-moss-800 sm:flex items-center gap-1">
            View all <ArrowRight size={15} />
          </Link>
        </div>

        {loading ? (
          <Loader />
        ) : products.length === 0 ? (
          <div className="card-surface p-10 text-center text-sm text-ink-900/50">
            No products to show yet. Check back soon.
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {products.map((p) => (
              <ProductCard key={p._id || p.id} product={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default Home
