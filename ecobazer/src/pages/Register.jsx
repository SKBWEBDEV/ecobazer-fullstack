import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Leaf, MailCheck, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { registerUser } from "../services/authService";
import { getErrorMessage } from "../utils/getErrorMessage";
import Input from "../components/Input";
import Button from "../components/Button";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const password = watch("password");

  const onSubmit = async (values) => {
    setSubmitting(true);

    try {
      await registerUser({
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
        terms: values.terms ? true : false,
      });

      setDone(true);

      toast.success("Account created!");
    } catch (error) {
      toast.error(
        getErrorMessage(error, "Registration failed. Please try again."),
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className="container-app flex min-h-[80vh] items-center justify-center py-14">
        <div className="w-full max-w-md card-surface p-8 text-center animate-fadeUp">
          <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-moss-50 text-moss-600">
            <MailCheck size={26} />
          </span>
          <h1 className="text-xl font-semibold text-ink-900">
            Please verify your email
          </h1>
          <p className="mt-2 text-sm text-ink-900/55">
            We've sent a verification link to your inbox. Confirm it to activate
            your account.
          </p>
          <Button onClick={() => navigate("/login")} className="mt-6 w-full">
            Go to login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-app flex min-h-[80vh] items-center justify-center py-14">
      <div className="w-full max-w-md card-surface p-8 animate-fadeUp">
        <div className="mb-6 flex flex-col items-center text-center">
          <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-moss-600 text-white">
            <Leaf size={20} />
          </span>
          <h1 className="text-xl font-semibold text-ink-900">
            Create your account
          </h1>
          <p className="mt-1 text-sm text-ink-900/55">
            Join EcoBazer in seconds.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="First name"
              placeholder="Jane"
              error={errors.firstName?.message}
              {...register("firstName", { required: "Required" })}
            />
            <Input
              label="Last name"
              placeholder="Doe"
              error={errors.lastName?.message}
              {...register("lastName", { required: "Required" })}
            />
          </div>

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
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            error={errors.password?.message}
            rightIcon={
              showPassword ? (
                <EyeOff
                  size={20}
                  className="cursor-pointer"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <Eye
                  size={20}
                  className="cursor-pointer"
                  onClick={() => setShowPassword(true)}
                />
              )
            }
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "At least 6 characters" },
            })}
          />

          <Input
            label="Confirm password"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="••••••••"
            error={errors.confirmPassword?.message}
            rightIcon={
              showConfirmPassword ? (
                <EyeOff
                  size={20}
                  className="cursor-pointer"
                  onClick={() => setShowConfirmPassword(false)}
                />
              ) : (
                <Eye
                  size={20}
                  className="cursor-pointer"
                  onClick={() => setShowConfirmPassword(true)}
                />
              )
            }
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
          />

          <label className="flex items-start gap-2 text-sm text-ink-900/65 dark:text-white">
            <input
              type="checkbox"
              className="mt-0.5 h-4 w-4 rounded border-ink-900/20 text-moss-600 focus:ring-moss-500"
              {...register("terms", {
                required: "You must accept the terms to continue",
              })}
            />

            <span>I agree to the Terms of Service and Privacy Policy</span>
          </label>
          {errors.terms && (
            <p className="-mt-2 text-xs text-red-600">{errors.terms.message}</p>
          )}

          <Button type="submit" loading={submitting} className="w-full">
            Create account
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-ink-900/55 dark:text-white">
  Already have an account?{" "}
  <Link
    to="/login"
    className="font-medium text-moss-700 hover:text-moss-800 dark:text-moss-400">
    Log in
  </Link>
</p>
      </div>
    </div>
  );
};

export default Register;
