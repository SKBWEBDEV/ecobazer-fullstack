import { Leaf, Instagram, Twitter, Facebook } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="mt-20 border-t border-ink-900/8 bg-white">
      <div className="container-app grid gap-10 py-14 md:grid-cols-4">
        <div>
          <div className="mb-3 flex items-center gap-2 font-display text-lg font-semibold text-ink-900">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-moss-600 text-white">
              <Leaf size={18} />
            </span>
            EcoBazer
          </div>
          <p className="text-sm leading-relaxed text-ink-900/55">
            Everyday goods, sourced with a lighter footprint. Thoughtfully made, honestly priced.
          </p>
          <div className="mt-4 flex gap-3 text-ink-900/40">
            <a href="#" aria-label="Instagram" className="transition hover:text-moss-600"><Instagram size={18} /></a>
            <a href="#" aria-label="Twitter" className="transition hover:text-moss-600"><Twitter size={18} /></a>
            <a href="#" aria-label="Facebook" className="transition hover:text-moss-600"><Facebook size={18} /></a>
          </div>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold text-ink-900">Shop</h4>
          <ul className="space-y-2 text-sm text-ink-900/55">
            <li><a href="/products" className="transition hover:text-moss-700">All products</a></li>
            <li><a href="/products" className="transition hover:text-moss-700">New arrivals</a></li>
            <li><a href="/products" className="transition hover:text-moss-700">Best sellers</a></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold text-ink-900">Support</h4>
          <ul className="space-y-2 text-sm text-ink-900/55">
            <li><a href="/profile" className="transition hover:text-moss-700">My account</a></li>
            <li><a href="/cart" className="transition hover:text-moss-700">Cart</a></li>
            <li><a href="#" className="transition hover:text-moss-700">Shipping & returns</a></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold text-ink-900">Company</h4>
          <ul className="space-y-2 text-sm text-ink-900/55">
            <li><a href="#" className="transition hover:text-moss-700">About</a></li>
            <li><a href="#" className="transition hover:text-moss-700">Sustainability</a></li>
            <li><a href="#" className="transition hover:text-moss-700">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ink-900/8 py-5 text-center text-xs text-ink-900/40">
        © {new Date().getFullYear()} EcoBazer. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
