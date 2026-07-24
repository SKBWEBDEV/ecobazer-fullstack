import { Loader2 } from 'lucide-react'

const Loader = ({ full = false, label = 'Loading' }) => {
  if (full) {
    return (
      <div className="flex min-h-[50vh] w-full flex-col items-center justify-center gap-3 text-ink-900/60">
        <Loader2 className="animate-spin text-moss-600" size={32} />
        <p className="text-sm">{label}...</p>
      </div>
    )
  }
  return (
    <div className="flex items-center justify-center py-10 text-ink-900/50">
      <Loader2 className="animate-spin text-moss-600" size={22} />
    </div>
  )
}

export default Loader
