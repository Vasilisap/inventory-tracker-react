import { Outlet, useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { HiOutlineLogout, HiOutlineMoon, HiOutlineSun } from "react-icons/hi";
import SidebarLink from "../ui/SidebarLink";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import Button from "../ui/Button";
import { getDisplayName } from "../../utils/helpers";

const AppLayout = () => {
  const { user, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const displayName = getDisplayName(user);

  async function handleLogout() {
    const { error } = await signOut();
    if (error) {
      toast.error(error.message || "Failed to log out");
      return;
    }
    toast.success("Logged out");
    navigate("/login", { replace: true });
  }

  return (
    <div className="min-h-screen bg-[#E8E8FD] dark:bg-slate-950 flex items-center justify-center px-4 py-6 sm:py-8">
      <div className="relative w-full max-w-7xl">
        {/* Orange background panel behind the card (desktop only) */}
        <div className="hidden md:block absolute -left-10 -top-10 -bottom-10 w-64 rounded-3xl bg-[#EE6338]" />

        {/* Main card */}
        <div className="relative bg-white dark:bg-slate-900 rounded-3xl shadow-xl flex flex-col md:flex-row overflow-hidden">
          {/* Sidebar */}
          <aside
            className="
          w-full md:w-56 lg:w-64 
          bg-[#F8F8FF] dark:bg-slate-900/90 
          border-b md:border-b-0 md:border-r 
          border-slate-100 dark:border-slate-800 
          px-5 py-5 sm:px-6 sm:py-6 
          flex flex-col gap-4
        "
          >
            {/* Profile / header */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-sm font-semibold text-slate-700 dark:text-slate-100">
                  D
                </div>

                <div className="leading-tight">
                  <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-50">
                    Inventory Tracker 📦
                  </p>
                  <p className="text-[11px] sm:text-xs text-[#62618F] dark:text-slate-400">
                    {displayName ? `@${displayName}` : ""}
                  </p>
                </div>
              </div>
            </div>

            {/* Nav items (kept for future, but space reserved) */}
            <nav className="flex-1 mt-2 space-y-1 text-sm">
              {/* Add nav items later if needed */}
            </nav>

            {/* Bottom: theme + logout */}
            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full cursor-pointer"
                onClick={toggleTheme}
                leftIcon={
                  theme === "dark" ? <HiOutlineSun /> : <HiOutlineMoon />
                }
              >
                <span className="hidden sm:inline">
                  {theme === "dark" ? "Light mode" : "Dark mode"}
                </span>
                <span className="sm:hidden">
                  {theme === "dark" ? "Light" : "Dark"}
                </span>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                aria-label="Log out"
              >
                <HiOutlineLogout />
              </Button>
            </div>
          </aside>

          {/* Main content (Dashboard / other pages) */}
          <main className="flex-1 min-w-0 px-4 py-6 sm:px-6 sm:py-7 md:px-8 md:py-8 lg:px-10 lg:py-10 bg-white dark:bg-slate-950/30">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
