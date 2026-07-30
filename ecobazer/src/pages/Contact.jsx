import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import api from "../services/axios";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.post("/api/contact", formData);

      alert("Message sent successfully!");

      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.log("Contact error:", error.response?.data || error.message);

      alert("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-app py-16">
      {/* Header */}

      <div className="text-center mb-12">
        <h1 className="text-4xl font-semibold text-ink-900 dark:text-white">
          Contact Us
        </h1>

        <p className="mt-3 text-ink-900/60 dark:text-white/60">
          Have questions? We would love to hear from you.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Contact Info */}

        <div className="card-surface p-8">
          <h2 className="text-2xl font-semibold text-ink-900 dark:text-white mb-6">
            Get in touch
          </h2>

          <div className="space-y-5">
            <div className="flex gap-4 items-center">
              <div className="h-10 w-10 rounded-xl bg-moss-50 flex items-center justify-center text-moss-700">
                <Mail size={20} />
              </div>

              <div>
                <p className="text-sm text-ink-900/50 dark:text-white/50">
                  Email
                </p>

                <p className="text-ink-900 dark:text-white">
                  support@ecobazer.com
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-center">
              <div className="h-10 w-10 rounded-xl bg-moss-50 flex items-center justify-center text-moss-700">
                <Phone size={20} />
              </div>

              <div>
                <p className="text-sm text-ink-900/50 dark:text-white/50">
                  Phone
                </p>

                <p className="text-ink-900 dark:text-white">+880 1234-567890</p>
              </div>
            </div>

            <div className="flex gap-4 items-center">
              <div className="h-10 w-10 rounded-xl bg-moss-50 flex items-center justify-center text-moss-700">
                <MapPin size={20} />
              </div>

              <div>
                <p className="text-sm text-ink-900/50 dark:text-white/50">
                  Address
                </p>

                <p className="text-ink-900 dark:text-white">
                  Dhaka, Bangladesh
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}

        <div className="card-surface p-8">
          <h2 className="text-2xl font-semibold text-ink-900 dark:text-white mb-6">
            Send Message
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              type="text"
              placeholder="Your Name"
              required
              className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-transparent px-4 py-3 text-ink-900 dark:text-white"
            />

            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              placeholder="Email Address"
              required
              className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-transparent px-4 py-3 text-ink-900 dark:text-white"
            />

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              placeholder="Your Message"
              required
              className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-transparent px-4 py-3 text-ink-900 dark:text-white"
            />

            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex items-center gap-2"
            >
              {loading ? "Sending..." : "Send Message"}

              <Send size={16} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
