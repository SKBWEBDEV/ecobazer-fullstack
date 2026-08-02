import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Leaf } from "lucide-react";
import toast from "react-hot-toast";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import Input from "../components/Input";
import Button from "../components/Button";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { login } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = async (values) => {
    setSubmitting(true);
    const result = await login(values);
    setSubmitting(false);
    if (result.success) {
      toast.success("Welcome back!");
      const redirectTo = location.state?.from;
      if (result.user?.role === "admin") navigate("/admin");
      else navigate(redirectTo || "/");
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="container-app flex min-h-[80vh] items-center justify-center py-14">
      <div className="w-full max-w-md card-surface p-8 animate-fadeUp">
        <div className="mb-6 flex flex-col items-center text-center">
          <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-moss-600 text-white">
            <Leaf size={20} />
          </span>
          <h1 className="text-xl font-semibold text-ink-900">Welcome back</h1>
          <p className="mt-1 text-sm text-ink-900/55">
            Log in to continue to EcoBazer.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Email address"
            type="email"
            placeholder="you@example.com"
            error={errors.email?.message}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Enter a valid email",
              },
            })}
          />
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            error={errors.password?.message}
            {...register("password", { required: "Password is required" })}
          />

          <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className="text-sm font-medium text-moss-400 hover:text-moss-600"
            >
              Forgot password?
            </Link>
          </div>

          <Button type="submit" loading={submitting} className="w-full">
            Log in
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-ink-900/55 dark:text-white">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-moss-700 hover:text-moss-800 dark:text-moss-400">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
