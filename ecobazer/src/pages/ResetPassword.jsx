import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";
import { resetPassword } from "../services/authService";
import { getErrorMessage } from "../utils/getErrorMessage";
import Input from "../components/Input";
import Button from "../components/Button";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [submitting, setSubmitting] = useState(false);
  const password = watch("password");

  const onSubmit = async ({ password, confirmPassword }) => {
    setSubmitting(true);

    try {
      await resetPassword(token, {
        newPassword: password,
        confirmPassword,
      });

      toast.success("Password reset successfully");
      navigate("/login");
    } catch (error) {
      toast.error(getErrorMessage(error, "Reset link is invalid or expired."));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container-app flex min-h-[80vh] items-center justify-center py-14">
      <div className="w-full max-w-md card-surface p-8 animate-fadeUp">
        <div className="mb-6 flex flex-col items-center text-center">
          <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-moss-600 text-white">
            <ShieldCheck size={20} />
          </span>
          <h1 className="text-xl font-semibold text-ink-900">
            Set a new password
          </h1>
          <p className="mt-1 text-sm text-ink-900/55">
            Choose a strong password for your account.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="New password"
            type="password"
            placeholder="••••••••"
            error={errors.password?.message}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d).{8,}$/,
                message:
                  "Password must contain at least one letter and one number",
              },
            })}
          />
          <Input
            label="Confirm new password"
            type="password"
            placeholder="••••••••"
            error={errors.confirmPassword?.message}
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
          />
          <Button type="submit" loading={submitting} className="w-full">
            Reset password
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
