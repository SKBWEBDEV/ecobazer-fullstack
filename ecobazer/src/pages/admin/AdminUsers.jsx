import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Search, Trash2, Pencil } from 'lucide-react'
import { getUsers, updateUser, deleteUser } from '../../services/userService'
import { getErrorMessage } from '../../utils/getErrorMessage'
import Loader from '../../components/Loader'
import Modal from '../../components/Modal'
import Input from '../../components/Input'
import Button from '../../components/Button'

const AdminUsers = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const loadUsers = async () => {
    setLoading(true)
    try {
      const { data } = await getUsers()
      setUsers(Array.isArray(data) ? data : data?.users || [])
    } catch (error) {
      toast.error(getErrorMessage(error, 'Could not load users.'))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadUsers()
  }, [])

  const openEdit = (u) => {
    setEditing(u)
    reset({
      firstName: u.firstName || '',
      lastName: u.lastName || '',
      email: u.email || '',
      role: u.role || 'user',
    })
    setModalOpen(true)
  }

  const onSubmit = async (values) => {
    setSaving(true)
    try {
      await updateUser(editing._id || editing.id, values)
      toast.success('User updated')
      setModalOpen(false)
      loadUsers()
    } catch (error) {
      toast.error(getErrorMessage(error, 'Could not update user.'))
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this user account? This cannot be undone.')) return
    setDeletingId(id)
    try {
      await deleteUser(id)
      toast.success('User deleted')
      setUsers((prev) => prev.filter((u) => (u._id || u.id) !== id))
    } catch (error) {
      toast.error(getErrorMessage(error, 'Could not delete user.'))
    } finally {
      setDeletingId(null)
    }
  }

  const filtered = users.filter((u) =>
    `${u.firstName || ''} ${u.lastName || ''} ${u.email || ''}`.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-ink-900">Users</h1>
        <p className="mt-1 text-sm text-ink-900/55">{users.length} registered accounts</p>
      </div>

      <div className="relative mb-6 max-w-sm">
        <Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-900/35" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search users..."
          className="input-field pl-10"
        />
      </div>

      {loading ? (
        <Loader full />
      ) : (
        <div className="card-surface overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-ink-900/8 text-xs uppercase tracking-wide text-ink-900/45">
              <tr>
                <th className="px-5 py-3 font-medium">Name</th>
                <th className="px-5 py-3 font-medium">Email</th>
                <th className="px-5 py-3 font-medium">Role</th>
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-900/6">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-5 py-10 text-center text-ink-900/45">
                    No users found.
                  </td>
                </tr>
              ) : (
                filtered.map((u) => {
                  const id = u._id || u.id
                  return (
                    <tr key={id}>
                      <td className="px-5 py-3 font-medium text-ink-900">
                        {u.firstName} {u.lastName}
                      </td>
                      <td className="px-5 py-3 text-ink-900/65">{u.email}</td>
                      <td className="px-5 py-3">
                        <span className={`badge ${u.role === 'admin' ? 'bg-moss-50 text-moss-700' : 'bg-ink-900/5 text-ink-900/60'}`}>
                          {u.role || 'user'}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => openEdit(u)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-900/50 transition hover:bg-ink-900/5 hover:text-moss-700"
                            aria-label="Edit user"
                          >
                            <Pencil size={15} />
                          </button>
                          <button
                            onClick={() => handleDelete(id)}
                            disabled={deletingId === id}
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-900/50 transition hover:bg-red-50 hover:text-red-600"
                            aria-label="Delete user"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Edit user">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="First name" error={errors.firstName?.message} {...register('firstName')} />
            <Input label="Last name" error={errors.lastName?.message} {...register('lastName')} />
          </div>
          <Input label="Email address" type="email" {...register('email')} disabled className="opacity-60" />
          <div className="w-full">
            <label className="mb-1.5 block text-sm font-medium text-ink-900/80">Role</label>
            <select className="input-field" {...register('role')}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" loading={saving}>
              Save changes
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default AdminUsers
