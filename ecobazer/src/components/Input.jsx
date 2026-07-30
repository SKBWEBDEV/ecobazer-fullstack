import { forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const Input = forwardRef(
  (
    { label, error, className = "", id, rightIcon, type = "text", ...props },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const inputId = id || props.name;
    const isPassword = type === "password";

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="mb-1.5 block text-sm font-medium text-ink-900 dark:text-white"
          >
            {label}
          </label>
        )}

        <div className="relative">
          <input
            id={inputId}
            ref={ref}
            type={isPassword && showPassword ? "text" : type}
            className={`input-field ${isPassword || rightIcon ? "pr-12" : ""} ${
              error
                ? "border-red-400 focus:border-red-500 focus:ring-red-500/25"
                : ""
            } ${className}`}
            {...props}
          />

          {isPassword ? (
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="
                absolute right-3 top-1/2 -translate-y-1/2
                text-gray-500 dark:text-gray-300
                hover:text-moss-600
              "
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          ) : (
            rightIcon && (
              <button
                type="button"
                className="
                  absolute right-3 top-1/2 -translate-y-1/2
                  text-gray-500 dark:text-gray-300
                  hover:text-moss-600
                "
              >
                {rightIcon}
              </button>
            )
          )}
        </div>

        {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
