import { useEffect, useState } from "react";
import { Search, Trash2, Pencil } from "lucide-react";
import toast from "react-hot-toast";

import { getUsers, updateUser, deleteUser } from "../../services/userService";

import { getErrorMessage } from "../../utils/getErrorMessage";
import Loader from "../../components/Loader";
import Modal from "../../components/Modal";
import Input from "../../components/Input";
import Button from "../../components/Button";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    role: "user",
  });

  const loadUsers = async () => {
    try {
      setLoading(true);

      const { data } = await getUsers();

      setUsers(data?.users || data || []);
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to load users"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const openEdit = (user) => {
    setEditing(user);

    setForm({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      role: user.role || "user",
    });

    setModalOpen(true);
  };

  const updateHandler = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      await updateUser(editing._id, form);

      toast.success("User updated");

      setModalOpen(false);

      loadUsers();
    } catch (error) {
      toast.error(getErrorMessage(error, "Update failed"));
    } finally {
      setSaving(false);
    }
  };

  const removeUser = async (id) => {
    if (!confirm("Delete this user?")) return;

    try {
      await deleteUser(id);

      toast.success("User deleted");

      setUsers((prev) => prev.filter((user) => user._id !== id));
    } catch (error) {
      toast.error(getErrorMessage(error, "Delete failed"));
    }
  };

  const filteredUsers = users.filter((user) =>
    `${user.firstName} ${user.lastName} ${user.email}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Users</h1>

        <p className="text-gray-400">Manage customer accounts</p>
      </div>

      <div className="relative max-w-sm">
        <Search size={18} className="absolute left-3 top-3 text-gray-400" />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search users..."
          className="
w-full
bg-[#242529]
border
border-gray-800
rounded-xl
py-2.5
pl-10
text-white
outline-none
"
        />
      </div>

      {loading ? (
        <Loader full />
      ) : (
        <div
          className="
bg-[#242529]
rounded-2xl
border
border-gray-800
overflow-x-auto
"
        >
          <table className="w-full text-left">
            <thead className="border-b border-gray-800 text-gray-400 text-sm">
              <tr>
                <th className="p-4">Name</th>

                <th className="p-4">Email</th>

                <th className="p-4">Role</th>

                <th className="p-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user._id}
                  className="border-b border-gray-800 hover:bg-gray-800/30"
                >
                  <td className="p-4 text-white">
                    {user.firstName} {user.lastName}
                  </td>

                  <td className="p-4 text-gray-400">{user.email}</td>

                  <td className="p-4">
                    <span
                      className="
px-3
py-1
rounded-full
bg-purple-500/10
text-purple-400
text-xs
"
                    >
                      {user.role}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="flex gap-3">
                      <button
                        onClick={() => openEdit(user)}
                        className="text-blue-400"
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        onClick={() => removeUser(user._id)}
                        className="text-red-400"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Edit User"
      >
        <form onSubmit={updateHandler} className="space-y-4">
          <Input
            label="First Name"
            value={form.firstName}
            onChange={(e) =>
              setForm({
                ...form,
                firstName: e.target.value,
              })
            }
          />

          <Input
            label="Last Name"
            value={form.lastName}
            onChange={(e) =>
              setForm({
                ...form,
                lastName: e.target.value,
              })
            }
          />

          <select
            className="input-field"
            value={form.role}
            onChange={(e) =>
              setForm({
                ...form,
                role: e.target.value,
              })
            }
          >
            <option value="user">User</option>

            <option value="admin">Admin</option>
          </select>

          <Button loading={saving}>Save</Button>
        </form>
      </Modal>
    </div>
  );
};

export default AdminUsers;
