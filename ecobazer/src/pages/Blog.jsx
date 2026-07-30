import { Link } from "react-router-dom";
import { Leaf, ArrowRight } from "lucide-react";

const blogs = [
  {
    id: 1,
    title: "Why Sustainable Products Matter",
    desc: "Learn how eco-friendly products reduce waste and create a better future.",
    category: "Sustainability",
    date: "July 30, 2026",
  },
  {
    id: 2,
    title: "How To Choose Quality Everyday Products",
    desc: "Simple tips to choose products that last longer and save money.",
    category: "Lifestyle",
    date: "July 25, 2026",
  },
  {
    id: 3,
    title: "Eco Friendly Home Ideas",
    desc: "Transform your home with sustainable and responsible choices.",
    category: "Home",
    date: "July 20, 2026",
  },
];

const Blog = () => {
  return (
    <div className="container-app py-16">
      {/* Header */}

      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-moss-600 text-white">
            <Leaf size={22} />
          </span>
        </div>

        <h1 className="text-4xl font-semibold text-ink-900 dark:text-white">
          EcoBazer Blog
        </h1>

        <p className="mt-3 text-ink-900/60 dark:text-white/60">
          Tips, guides and stories about sustainable living.
        </p>
      </div>

      {/* Blog Cards */}

      <div className="grid gap-6 md:grid-cols-3">
        {blogs.map((blog) => (
          <article
            key={blog.id}
            className="card-surface p-6 hover:-translate-y-1 transition"
          >
            <span className="text-xs text-moss-600 dark:text-moss-400 font-medium">
              {blog.category}
            </span>

            <h2 className="mt-3 text-xl font-semibold text-ink-900 dark:text-white">
              {blog.title}
            </h2>

            <p className="mt-3 text-sm text-ink-900/60 dark:text-white/60">
              {blog.desc}
            </p>

            <p className="mt-4 text-xs text-ink-900/50 dark:text-white/40">
              {blog.date}
            </p>

            <Link
              to="#"
              className="mt-5 inline-flex items-center gap-2 text-sm text-moss-600"
            >
              Read more
              <ArrowRight size={15} />
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Blog;
