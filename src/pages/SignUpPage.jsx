// src/pages/SignUpPage.jsx
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import Button from "../components/ui/Button";

export default function SignUpPage() {
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit({ password, confirmPassword, email }) {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const { data, error } = await signUp(email, password);

    if (error) {
      toast.error(error.message || "Failed to sign up");
      return;
    }

    toast.success("Account created! Redirecting…");
    navigate("/dashboard", { replace: true });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E8E8FD] dark:bg-slate-950 px-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-8 space-y-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-[#EE6338] mb-1">
            Dad&apos;s Inventory
          </p>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
            Create account
          </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Set up an account to start tracking your equipment.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-3">
          {/* Email */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-600 dark:text-slate-300">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#EE6338]/60"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-xs font-medium text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-600 dark:text-slate-300">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#EE6338]/60"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "At least 6 characters",
                },
              })}
            />
            {errors.password && (
              <p className="text-xs font-medium text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm password */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-600 dark:text-slate-300">
              Confirm password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#EE6338]/60"
              {...register("confirmPassword", {
                required: "Please confirm your password",
              })}
            />
            {errors.confirmPassword && (
              <p className="text-xs font-medium text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <Button
            type="submit"
            variant="primary"
            size="md"
            className="w-full"
            isLoading={isSubmitting}
            loadingText="Creating account…"
          >
            Sign up
          </Button>
        </form>

        <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
          Already have an account?{" "}
          <Button as={Link} to="/login" variant="link" size="link">
            Log in
          </Button>
        </p>
      </div>
    </div>
  );
}
