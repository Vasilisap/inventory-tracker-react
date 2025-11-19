import { Link } from "react-router-dom";
import { cn } from "../../lib/cn";

// To use Button for icons only -> example
{
  /* <Button
  type="button"
  variant="icon"
  size="icon"
  onClick={handleSomething}
  aria-label="Settings"
>
  <HiOutlineCog className="h-4 w-4" />
</Button> */
}

const baseStyles =
  "inline-flex items-center justify-center rounded-2xl font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#EE6338] disabled:opacity-60 disabled:cursor-not-allowed transition-colors cursor-pointer";

const variantStyles = {
  primary:
    "bg-[#EE6338] text-white hover:opacity-95 dark:bg-[#EE6338] dark:text-white",
  secondary:
    "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-100 dark:border-slate-700 dark:hover:bg-slate-800",
  ghost:
    "bg-transparent text-slate-600 hover:bg-slate-200/70 dark:text-slate-200 dark:hover:bg-slate-800/70 border border-transparent",
  outline:
    "bg-transparent text-slate-700 border border-slate-300 hover:bg-slate-50 dark:text-slate-100 dark:border-slate-600 dark:hover:bg-slate-800",
  link: "bg-transparent p-0 h-auto text-[#EE6338] dark:text-[#EE6338] underline-offset-2 hover:underline border-none hover:text-[#d83d27]",
  icon: "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-100 dark:border-slate-700 dark:hover:bg-slate-800",
};

const sizeStyles = {
  xs: "text-xs px-3 py-1.5",
  sm: "text-sm px-3 py-1.5",
  md: "text-md px-4 py-2",
  lg: "text-lg px-5 py-2.5",
  icon: "p-0 h-8 w-8 text-lg",
  link: "text-xs",
};

export default function Button({
  variant = "primary",
  size = "md",
  className,
  leftIcon,
  rightIcon,
  children,
  as = "button",
  isLoading = false,
  loadingText,
  ...props
}) {
  const Comp = as;

  const showSpinner = isLoading;
  const isDisabled = props.disabled || isLoading;

  return (
    <Comp
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      disabled={isDisabled}
      aria-busy={isLoading || undefined}
      {...props}
    >
      {/* Left icon or spinner */}

      {showSpinner ? (
        <span className="mr-2 inline-flex items-center justify-center">
          <span className="h-3.5 w-3.5 rounded-full border border-white border-t-transparent animate-spin" />
        </span>
      ) : (
        leftIcon && (
          <span className="mr-2 inline-flex items-center justify-center">
            {leftIcon}
          </span>
        )
      )}
      {/* Label */}
      {children && (
        <span className={cn(showSpinner && "opacity-90")}>
          {showSpinner && loadingText ? loadingText : children}
        </span>
      )}
      {/* Right icon if not loading */}
      {!showSpinner && rightIcon && (
        <span className="ml-2 inline-flex items-center justify-center">
          {rightIcon}
        </span>
      )}
    </Comp>
  );
}
